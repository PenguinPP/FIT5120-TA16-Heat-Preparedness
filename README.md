# FIT5120-TA16-Heat-Preparedness

We are a highly motivated team with a diverse range of skills and educational backgrounds. As a team we hope to develop a project that will have a positive impact on the lives of others. Upon receiving our topic, we recognised that high temperatures are a growing public health concern in Australia, and we are determined to provide vulnerable individuals with the knowledge and resources they will need to safeguard their health.

The second iteration can be accessed from <a href="https://victoria-heat.ml">www.victoria-heat.ml</a>

The first iteration can be accessed from <a href="https://victoria-heat.tk">victoria-heat.tk</a>
 
# Features

## Heat Wave forecast
The app provides a temperature forecast for the next week for government district. Users are able to search for their suburbs to receive localised weather information. They forecast will highlight future heat waves.

## Heat Readiness Quiz
The quiz asks users three questions to test their knowledge of heat waves and recommends them different sections of the website depending on the answers they got wrong.

## Heat Wave Information
The site has two informative sections. The "Be Prepared" section contains advice for users to prepare for future heatwaves. The "On the Day" section contains advice that users need on the day of a heatwave.

# Technology / Frameworks
We have constructed a web-app that targeted specifically at the elderly, to provide them with the crucial information they need to safeguard their own health during periods of extreme heat. We have utilised a three tier architecture, using Nodejs for the front-end and application server, and mySQL for the backend database. Specifically for the front-end we used ReactJS and for the application server we used ExpressJS.

Our front-end and application server are both hosted on an Amazon EC2 instance. We use an Nginx web server to deliver our site to users. The Nginx server handles access credentials, ssl, redirects HTTP requests to HTTPS, and also redirects api requests to the api server without exposing the api server's active port. The application server only responds to a set of pre-defined requests, and upon receiving these requests, queries the database to obtain the required data, and return it to the user through the front-end. The mySQL database is hosted on the AWS RDS platform.

## List of Libraries/Packages Used

### <a href="https://reactjs.org/">React</a>
JavaScript library for building user interfaces.

### <a href="https://material-ui.com/">Material-UI</a>
React components based on Materian Design.

### <a href="https://www.npmjs.com/package/axios" >Axios </a>
HTTP client for browser and NodeJS

### <a href="https://www.npmjs.com/package/react-player" >React Player</a>
React component for streaming URLs

### <a href="https://www.npmjs.com/package/react-scroll" >React Scroll</a>
Animated scroll component for React

### <a href="https://expressjs.com/" >Express</a>
A web framework for Node.js.

# Credits
The weather information we use is provided by <a href="https://openweathermap.org/" >OpenWeather</a> under a Creative Commons Attribution-ShareAlike 4.0 International licence.

The definition of heat waves, preparations and other pieces of advice provided are all sourced from the Victorian State Government. You can access their extreme heat resources through the links provided below.

<a href="https://www2.health.vic.gov.au/public-health/environmental-health/climate-weather-and-public-health/heatwaves-and-extreme-heat/.">Health Victoria, Extreme Heat and Heatwaves</a>

 <a href="https://www.betterhealth.vic.gov.au/campaigns/Survive-the-heat">Better Health Channel, Survive the Heat </a>
