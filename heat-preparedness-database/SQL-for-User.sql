--Do not include the ; in the api call
--This document contains SQL statements relating to user functionality
--Get heat threshold for user's suburb
SELECT threshold
FROM District d,
    LGA l,
    Suburb s
WHERE d.state = l.state
    AND d.district = l.district
    AND l.lga_council_name = s.area
    AND s.suburb = ?;
--Get Weather Forecast for user's Suburb
SELECT f.date,
    f.state,
    f.area,
    f.min,
    f.max,
    f.avg
FROM Forecast f,
    LGA l,
    Suburb s
WHERE l.LGA.co;
--Get weather forecast for Melbourne (default if user has not selected location)
SELECT f.date,
    f.state,
    f.area,
    f.min,
    f.max,
    f.avg
FROM Forecast
WHERE area = 'Melbourne';
--Get threshold for Melbourne (default)
SELECT threshold
FROM District
WHERE district_name = 'Melbourne';
--Get heatwave preparation advice
SELECT *
FROM advice_preparation;
--Get heatwave advice
SELECT *
FROM Advice;
--Get all suburbs (to display list to user)
SELECT *
FROM Suburb;