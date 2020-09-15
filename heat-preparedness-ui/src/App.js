import React from "react";
import Grid from "@material-ui/core/Grid";
import { Card, CardContent } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Advice from "./Advice/Advice";
import Preparation from "./Preparation/Preparation";
import HeatWaves from "./HeatWaves";
import Weather from "./Weather";
import LandingPage from "./LandingPage";
import Acknowledgements from "./Acknowledgments";
import MenuDrawer from "./MenuDrawer/MenuDrawer";
import QuizContextProvider from "./Contexts/QuizContext";

const axios = require("axios").default;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suburbList: [],
      preparationsList: [],
      adviceList: [],
      weatherForecast: [],
    };
  }

  async getPreparationData() {
    let preparationData = [];
    let dataLink = "https://www.victoria-heat.tk/api/Advice_pre";

    await axios
      .get(dataLink)
      .then(function (response) {
        //console.log(response.data)
        preparationData = response.data;
      })
      .catch(function (error) {
        //handle error
        console.log(error);
      });
    this.setState({ preparationsList: preparationData });
  }

  async getSuburbList() {
    let suburbs = [];
    let dataLink = "https://www.victoria-heat.tk/api/SuburbList";

    await axios
      .get(dataLink)
      .then(function (response) {
        // console.log("suburbs")
        //console.log(response.data)
        suburbs = response.data;
      })
      .catch(function (error) {
        //handle error
        console.log(error);
      });
    this.setState({ suburbList: suburbs });
  }

  async getAdviceData() {
    let advice = [];
    let dataLink = "https://www.victoria-heat.tk/api/Advice";

    await axios
      .get(dataLink)
      .then(function (response) {
        //console.log(response.data)
        advice = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    this.setState({ adviceList: advice });
  }

  async getWeatherData() {
    let weatherData = [];
    let dataLink = "https://www.victoria-heat.tk/api/MelbourneForecast";

    await axios
      .get(dataLink)
      .then(function (response) {
        weatherData = response.data.filter(
          (item) => item.council === "Melbourne City"
        );
        //console.log(weatherData)
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState({ weatherForecast: weatherData });
  }

  componentDidMount() {
    this.getPreparationData();
    this.getSuburbList();
    this.getAdviceData();
    this.getWeatherData();
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <MenuDrawer />
        <Grid container spacing={2} wrap="wrap">
          <Grid item xs={12}>
            <LandingPage />
          </Grid>
          <Grid item xs={12} lg={12}>
            <Card raised={true} variant="outlined" id="HeatWaves">
              <CardContent>
                <HeatWaves />
              </CardContent>
            </Card>
          </Grid>
          <QuizContextProvider>
            <Grid item sm={12} lg={12}>
              <Card raised={true} variant="outlined">
                <CardContent id="Alerts">
                  <Weather
                    suburbList={this.state.suburbList}
                    weatherInformation={this.state.weatherForecast}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item sm={12} lg={12}>
              <Card raised={true} variant="outlined">
                <CardContent id="Prep">
                  <Preparation preparationData={this.state.preparationsList} />
                </CardContent>
              </Card>
            </Grid>
            <Grid item sm={12} lg={12}>
              <Card raised={true} variant="outlined">
                <CardContent id="Advice">
                  <Advice adviceData={this.state.adviceList} />
                </CardContent>
              </Card>
            </Grid>
          </QuizContextProvider>
        </Grid>
        <Acknowledgements />
      </React.Fragment>
    );
  }
}

export default App;
