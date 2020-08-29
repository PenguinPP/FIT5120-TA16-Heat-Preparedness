--This document contains SQL statements relating to server functionality
--Get all LGA information (to pull temperature data from API)
SELECT *
FROM LGA;
--Insert new forecast data (from API)
INSERT INTO Forecast (date, state, council_name, min_temp, max_temp, avg_temp)
VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY
UPDATE min_temp =
VALUES(min_temp),
    max_temp =
values(max_temp),
    avg_temp =
values(avg_temp)



delete from Forecast 
where date = "yesterday" 
AND  council IN (SELECT DISTINCT council FROM LGA)
AND state IN (SELECT DISTINCT state FROM DISTRICT)
AND 