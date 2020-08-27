-- Create Advice table
CREATE TABLE `VictoriaHeat`.`Advice` (
  `advice_id` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(500) NOT NULL,
  `category` VARCHAR(45) NULL,
  `lga` VARCHAR(45) NULL,
  PRIMARY KEY (`advice_id`, `content`));