-- Create Advice table
CREATE TABLE `VictoriaHeat`.`Advice` (
  `advice_id` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(500) NOT NULL,
  `category` VARCHAR(45) NULL,
  `lga` VARCHAR(45) NULL,
  PRIMARY KEY (`advice_id`),
  UNIQUE INDEX `content_UNIQUE` (`content` ASC) VISIBLE);

-- Create preparation Advice table
CREATE TABLE `VictoriaHeat`.`Advice_pre` (
  `advice_id` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(500) NOT NULL,
  `category` VARCHAR(45) NULL,
  `lga` VARCHAR(45) NULL,
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
  `Weathercol` VARCHAR(45) NULL,
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
