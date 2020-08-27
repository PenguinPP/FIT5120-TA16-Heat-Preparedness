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