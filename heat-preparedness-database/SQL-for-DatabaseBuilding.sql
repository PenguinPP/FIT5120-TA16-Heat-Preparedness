-- Create Advice table
CREATE TABLE `VictoriaHeat`.`Advice` (
  `advice_id` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(500) NOT NULL,
  `category` VARCHAR(45) NULL,
  PRIMARY KEY (`advice_id`),
  UNIQUE INDEX `content_UNIQUE` (`content` ASC) VISIBLE);

-- Create preparation Advice table
CREATE TABLE `VictoriaHeat`.`Advice_pre` (
  `advice_id` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(500) NOT NULL,
  `category` VARCHAR(45) NULL,
  PRIMARY KEY (`advice_id`),
  UNIQUE INDEX `content_UNIQUE` (`content` ASC) VISIBLE);

-- Create District table
CREATE TABLE `VictoriaHeat`.`District` (
  `state` VARCHAR(45) NOT NULL,
  `district_name` VARCHAR(45) NOT NULL,
  `threshold` DECIMAL(5,3) NULL,
  PRIMARY KEY (`state`, `district_name`));

-- Create LGA table
CREATE TABLE `VictoriaHeat`.`LGA` (
  `state` VARCHAR(45) NOT NULL,
  `district` VARCHAR(45) NOT NULL,
  `council` VARCHAR(100) NOT NULL,
  `latitude` DECIMAL(20,17) NULL,
  `longitude` DECIMAL(20,17) NULL,
  PRIMARY KEY (`state`, `district`, `council`),
  CONSTRAINT `district_lga_fk`
    FOREIGN KEY (`state` , `district`)
    REFERENCES `VictoriaHeat`.`District` (`state` , `district_name`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT);

-- Create Suburb table
CREATE TABLE `VictoriaHeat`.`Suburb` (
  `state` VARCHAR(45) NOT NULL,
  `district` VARCHAR(45) NOT NULL,
  `council` VARCHAR(100) NOT NULL,
  `suburb` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`state`, `district`, `council`, `suburb`),
  CONSTRAINT `lga_suburb_fk`
    FOREIGN KEY (`state` , `district` , `council`)
    REFERENCES `VictoriaHeat`.`LGA` (`state` , `district` , `council`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT);

-- Create Forcast table
CREATE TABLE `VictoriaHeat`.`Forcast` (
  `state` VARCHAR(45) NOT NULL,
  `district` VARCHAR(45) NOT NULL,
  `council` VARCHAR(100) NOT NULL,
  `date` DATETIME NOT NULL,
  `min` DECIMAL(5,3) NULL,
  `max` DECIMAL(5,3) NULL,
  `avg` DECIMAL(10,8) NULL,
  PRIMARY KEY (`state`, `district`, `council`, `date`),
  CONSTRAINT `lga_forcast_fk`
    FOREIGN KEY (`state` , `district` , `council`)
    REFERENCES `VictoriaHeat`.`LGA` (`state` , `district` , `council`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT);

-- Create Weather table
CREATE TABLE `VictoriaHeat`.`Weather` (
  `state` VARCHAR(45) NOT NULL,
  `district` VARCHAR(45) NOT NULL,
  `council` VARCHAR(100) NOT NULL,
  `date` DATETIME NOT NULL,
  `min` DECIMAL(5,3) NULL,
  `max` DECIMAL(5,3) NULL,
  `avg` DECIMAL(10,8) NULL,
  PRIMARY KEY (`state`, `district`, `council`, `date`),
  CONSTRAINT `lga_weather_fk`
    FOREIGN KEY (`state` , `district` , `council`)
    REFERENCES `VictoriaHeat`.`LGA` (`state` , `district` , `council`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT);


-- Every midnight, the database will autoly remove all the data in Forecast table which before the next day at 23:59:55
-- and the data rows will be moved into Weather table at the same time.

-- Add trigger for Forecast table when delete data and add new one in Weather table
DROP TRIGGER IF EXISTS `VictoriaHeat`.`Forecast_AFTER_DELETE`;

DELIMITER $$
USE `VictoriaHeat`$$
CREATE DEFINER=`victoria_heat`@`%` TRIGGER `Forecast_AFTER_DELETE` AFTER DELETE ON `Forecast` FOR EACH ROW BEGIN
	insert into Weather (state, district, council, date, min, max, avg)
                         VALUES (OLD.state, OLD.district, OLD.council, OLD.date, OLD.min, OLD.max, OLD.avg) ON DUPLICATE KEY
                         UPDATE min = VALUES(min),
                                max = values(max),
                                avg = values(avg); 
END$$
DELIMITER ;

-- Create schedule to delete data everyday night
create event remove_test
on schedule
every 1 day
STARTS '2020-08-29 23:59:55'
do 
	delete from Forecast where date < NOW();


-- Add a new attribute for Forecast to record latest update time which will also show to users
ALTER TABLE `VictoriaHeat`.`Forecast` 
ADD COLUMN `update_time` DATETIME NULL AFTER `avg`;



-- add surrogate key for several tables
ALTER TABLE `VictoriaHeat`.`LGA` 
DROP FOREIGN KEY `district_lga_fk`;

ALTER TABLE `VictoriaHeat`.`District` 
ADD COLUMN `district_id` INT NOT NULL AUTO_INCREMENT FIRST,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`district_id`),
ADD UNIQUE INDEX `unique_district` (`state` ASC, `district_name` ASC) VISIBLE;
;

ALTER TABLE `VictoriaHeat`.`Suburb` 
DROP FOREIGN KEY `lga_suburb_fk`;

ALTER TABLE `VictoriaHeat`.`Forecast` 
DROP FOREIGN KEY `lga_forcast_fk`;

ALTER TABLE `VictoriaHeat`.`Weather` 
DROP FOREIGN KEY `lga_weather_fk`;

ALTER TABLE `VictoriaHeat`.`LGA` 
CHANGE COLUMN `state` `council_id` INT NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `district` `district` INT NOT NULL ,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`council_id`),
ADD UNIQUE INDEX `unique_council` (`district` ASC, `council` ASC) INVISIBLE;
;

ALTER TABLE `VictoriaHeat`.`LGA` 
ADD CONSTRAINT `district_lga_fk`
  FOREIGN KEY (`district`)
  REFERENCES `VictoriaHeat`.`District` (`district_id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `VictoriaHeat`.`Suburb` 
DROP COLUMN `district`,
DROP COLUMN `state`,
ADD COLUMN `suburb_id` INT NOT NULL AUTO_INCREMENT FIRST,
ADD COLUMN `postcode` INT NULL AFTER `suburb`,
CHANGE COLUMN `council` `council` INT NOT NULL ,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`suburb_id`),
ADD UNIQUE INDEX `unique_suburb` (`council` ASC, `suburb` ASC) VISIBLE;
;

ALTER TABLE `VictoriaHeat`.`Suburb` 
ADD INDEX `lga_suburb_fk_idx` (`council` ASC) INVISIBLE;
ALTER TABLE `VictoriaHeat`.`Suburb` ALTER INDEX `unique_suburb` VISIBLE;
ALTER TABLE `VictoriaHeat`.`Suburb` 
ADD CONSTRAINT `lga_suburb_fk`
  FOREIGN KEY (`council`)
  REFERENCES `VictoriaHeat`.`LGA` (`council_id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;


ALTER TABLE `VictoriaHeat`.`Weather` 
DROP COLUMN `district`,
DROP COLUMN `state`,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`council`, `date`);
;

ALTER TABLE `VictoriaHeat`.`Forecast` 
DROP COLUMN `district`,
DROP COLUMN `state`,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`council`, `date`);
;

ALTER TABLE `VictoriaHeat`.`Forecast` 
CHANGE COLUMN `council` `council_id` INT NOT NULL ;
ALTER TABLE `VictoriaHeat`.`Forecast` 
ADD CONSTRAINT `lga_forecast`
  FOREIGN KEY (`council_id`)
  REFERENCES `VictoriaHeat`.`LGA` (`council_id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;


ALTER TABLE `VictoriaHeat`.`Weather` 
CHANGE COLUMN `council` `council_id` INT NOT NULL ;
ALTER TABLE `VictoriaHeat`.`Weather` 
ADD CONSTRAINT `lga_weather_fk`
  FOREIGN KEY (`council_id`)
  REFERENCES `VictoriaHeat`.`LGA` (`council_id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

DROP TRIGGER IF EXISTS `VictoriaHeat`.`Forecast_AFTER_DELETE`;

DELIMITER $$
USE `VictoriaHeat`$$
CREATE DEFINER = CURRENT_USER TRIGGER `VictoriaHeat`.`Forecast_AFTER_DELETE` AFTER DELETE ON `Forecast` FOR EACH ROW
BEGIN
insert into Weather (council_id, date, min, max, avg)
                         VALUES (OLD.council_id, OLD.date, OLD.min, OLD.max, OLD.avg) ON DUPLICATE KEY
                         UPDATE min = VALUES(min),
                                max = values(max),
                                avg = values(avg); 
END$$
DELIMITER ;

ALTER TABLE `VictoriaHeat`.`LGA` 
RENAME TO  `VictoriaHeat`.`Council` ;
