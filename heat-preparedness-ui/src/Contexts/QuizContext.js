import React, { createContext, Component } from "react";

export const QuizContext = createContext();

class QuizContextProvider extends Component {
  state = {
    prepActiveCategory: "Heat Short Term",
    adviceActiveCategory: "General",
    q1Correct: false,
    q2Correct: false,
    q3Correct: false,
    q4Correct: false,
    q5Correct: false,
  };

  setPrepCategory = (category) => {
    this.setState({ prepActiveCategory: category });
  };

  setAdviceCategory = (category) => {
    this.setState({ adviceActiveCategory: category });
  };
  setQ1Result = (result) => {
    this.setState({ q1Correct: result });
  };
  setQ2Result = (result) => {
    this.setState({ q2Correct: result });
  };
  setQ3Result = (result) => {
    this.setState({ q3Correct: result });
  };
  setQ4Result = (result) => {
    this.setState({ q4Correct: result });
  };
  setQ5Result = (result) => {
    this.setState({ q5Correct: result });
  };
  render() {
    return (
      <QuizContext.Provider
        value={{
          ...this.state,
          setAdviceCategory: this.setAdviceCategory,
          setPrepCategory: this.setPrepCategory,
          setQ1Result: this.setQ1Result,
          setQ2Result: this.setQ2Result,
          setQ3Result: this.setQ3Result,
          setQ4Result: this.setQ4Result,
          setQ5Result: this.setQ5Result,
        }}
      >
        {this.props.children}
      </QuizContext.Provider>
    );
  }
}

export default QuizContextProvider;
