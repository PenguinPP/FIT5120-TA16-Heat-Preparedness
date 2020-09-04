# FIT5120-TA16-Heat-Preparedness

We are a highly motivated team with a diverse range of skills and educational backgrounds. As a team we hope to develop a project that will have a positive impact on the lives of others. Upon receiving our topic, we recognised that high temperatures are a growing public health concern in Australia, and we are determined to provide vulnerable individuals with the knowledge and resources they will need to safeguard their health.

The live website can be accessed from <a href="http://victoria-heat.tk">victoria-heat.tk<a/>

# Technology / Frameworks
We have constructed a web-app that targeted specifically at the elderly, to provide them with the crucial information they need to safeguard their own health during periods of extreme heat. We have utilised a three tier architecture, using Nodejs for the front-end and application server, and mySQL for the backend database. Specifically for the front-end we used ReactJS and for the application server we used ExpressJS.

We are currently using an AWS S3 bucket to serve the front-end as a static website. The front-end does not communicate directly with our database, instead it sends all requests to the application server which is hosted on AWS EC2. The application server only responds to a set of pre-defined requests, and upon receiving these requests, queries the database to obtain the required data, and return it to the user through the front-end. The mySQL database is hosted on the AWS RDS platform.

# Credits
The weather information we use is provided by <a href="https://openweathermap.org/" >OpenWeather</a> under a Creative Commons Attribution-ShareAlike 4.0 International licence.

The definition of heat waves, preparations and other pieces of advice provided are all sourced from the Victorian State Government. You can access their extreme heat resources through the links provided below.

<a href="https://www2.health.vic.gov.au/public-health/environmental-health/climate-weather-and-public-health/heatwaves-and-extreme-heat/.">Health Victoria, Extreme Heat and Heatwaves</a>

 <a href="https://www.betterhealth.vic.gov.au/campaigns/Survive-the-heat">Better Health Channel, Survive the Heat </a>
