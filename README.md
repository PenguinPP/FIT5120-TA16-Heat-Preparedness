# FIT5120-TA16-Heat-Preparedness

This project was completed as part of the Industry Experience Studio Project for final semester postgraduate IT students from Monash University

We are a highly motivated team with a diverse range of skills and educational backgrounds. As a team we hoped to develop a project that will have a positive impact on the lives of others. Upon receiving our topic, we recognised that high temperatures are a growing public health concern in Australia, and we are determined to provide vulnerable individuals with the knowledge and resources they will need to safeguard their health.

The final of the web app be accessed from <a href="https://victoria-heat.ga">www.victoria-heat.ga</a>

 
# Features

### Heat Wave Notifications
The app will provide users web-push notifications for their chosen suburb, notifying them of heat waves in advance to give them ample time to prepare.

### Heat Wave forecast
The app provides a temperature forecast for the next week for government district. Users are able to search for their suburbs to receive localised weather information. The forecast will highlight future heat waves.

### Heat Readiness Quiz
The quiz asks users three questions to test their knowledge of heat waves and recommends them different sections of the website depending on their results.

### Heat Wave Information
The site has two informative sections. The "Be Prepared" section contains advice for users to prepare for future heatwaves. The "On the Day" section contains advice that users need on the day of a heatwave.

# Technology / Frameworks
We have constructed a web-app that targeted specifically at the elderly, to provide them with the crucial information they need to safeguard their own health during periods of extreme heat. We have utilised a three tier architecture, using Nodejs for the front-end and application server, and mySQL for the backend database. Specifically for the front-end we used ReactJS and for the application server we used ExpressJS.

Our front-end and application server are both hosted on an Amazon EC2 instance. We use an Nginx web server to deliver our site to users and to act as a reverse proxy for API calls. The application server only responds to a set of pre-defined requests, and upon receiving these requests, queries the database to obtain the required data, and return it to the user through the front-end. The mySQL database is hosted on the AWS RDS platform.

## List of Libraries/Packages Used

### <a href="https://reactjs.org/">React</a>
JavaScript library for building user interfaces.

### <a href="https://material-ui.com/">Material-UI</a>
React components based on Material Design.

### <a href="https://www.npmjs.com/package/axios" >Axios </a>
HTTP client for browser and NodeJS. Used for making API calls from the front-end  to the application server.

### <a href="https://www.npmjs.com/package/react-player" >React Player</a>
React component for streaming URLs. Used to display informative videos.

### <a href="https://www.npmjs.com/package/react-scroll" >React Scroll</a>
Animated scroll component for React. Used to implement realistic scrolling when navigating the page.

### <a href="https://expressjs.com/" >Express</a>
A web framework for Node.js. used to create the application server which receives and responds to specific requests with data from the database.

### <a href="https://www.nginx.com/">Nginx</a>
Web Server/Reverse Proxy. Set up on the AWS EC2 server to act as a reverse-proxy. Nginx verifies authentication details, handles ssl configuration and also redirects HTTP requests to HTTPS. As a reverse proxy, it is also able to redirect specific API calls to the application server which can then respond to the front-end with results from the database. The Nginx server also handles which iteration of the website a user is shown depending the on url that is used.

### <a href="https://www.npmjs.com/package/echarts-for-react">Echarts-for-react</a>
An <a href="https://www.echartsjs.com/">echarts</a> wrapper for React. 


### <a href="https://www.npmjs.com/package/dotenv">Dotenv</a>
Node framework for dealing with environment variables securely.

### <a href="https://www.npmjs.com/package/web-push">Web-push</a>
Node framework for sending web push notifications.

### <a href="https://www.npmjs.com/package/node-schedule">Node Schedule</a>
Node framework for scheduling tasks.

### <a href="https://www.npmjs.com/package/mysql">mysql</a>
NodeJS driver for mysql, used to connect to the database and run queries



# Credits
The weather information we use is provided by <a href="https://openweathermap.org/" >OpenWeather</a> under a Creative Commons Attribution-ShareAlike 4.0 International licence.

The definition of heat waves, preparations and other pieces of advice provided are all sourced from the Victorian State Government. You can access their extreme heat resources through the links provided below.

<a href="https://www2.health.vic.gov.au/public-health/environmental-health/climate-weather-and-public-health/heatwaves-and-extreme-heat/.">Health Victoria, Extreme Heat and Heatwaves</a>

<a href="https://www.betterhealth.vic.gov.au/campaigns/Survive-the-heat">Better Health Channel, Survive the Heat </a>
 
Advice on improving your home's cooling efficiency was sourced from <a href="https://www.sustainability.vic.gov.au/You-and-your-home/Save-energy/Cooling/Cool-your-home-in-summer">Sustainability Victoria</a>
   
Vector silhouettes for heat wave deaths were obtained from <ahref="https://www.freevector.com/elderly-people-silhouettes">freevector.com</a> and <a href="https://www.vecteezy.com/free-vector/human-silhouette-vector-free">Vecteezy</a>.
 
Statistics regarding deaths from heat waves were acquired from a study by <a href="https://www.sciencedirect.com/science/article/pii/S1462901114000999">Coates el al., 2014.</a>

Weather icons were acquired from <a href="http://www.flaticon.com">flaticon</a>.

          
