--This document contains SQL statements relating to user functionality
--Get heat threshold for user's suburb
SELECT threshold
FROM District d,
    LGA l,
    Suburb s
WHERE d.state = l.state
    AND d.district_name = l.district
    AND l.council = s.council
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
WHERE l.council = s.council
    AND l.district = s.district
    AND l.state = s.state
    AND f.council = l.council
    AND f.district = l.district
    AND f.state = l.state
    AND s.suburb = ?;
--Get weather forecast for Melbourne (default if user has not selected location)
SELECT f.date,
    f.state,
    f.area,
    f.min,
    f.max,
    f.avg
FROM Forecast f,
    LGA l,
    Suburb s
WHERE l.council = s.council
    AND l.district = s.district
    AND l.state = s.state
    AND f.council = l.council
    AND f.district = l.district
    AND f.state = l.state
    AND s.surburb = 'Melbourne';
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
SELECT suburb
FROM Suburb;