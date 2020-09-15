import React, { createContext, Component } from "react";

export const QuizContext = createContext();

class QuizContextProvider extends Component {
  state = {
    prepActiveCategory: "Symptoms",
    adviceActiveCategory: "Essentials Guide",
    q1Correct: false,
    q2Correct: false,
    q3Correct: false,
    q1Answered: false,
    q2Answered: false,
    q3Answered: false,
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
  setQ1Answered = (result) => {
    this.setState({ q1Answered: result });
  };
  setQ2Answered = (result) => {
    this.setState({ q2Answered: result });
  };
  setQ3Answered = (result) => {
    this.setState({ q3Answered: result });
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
          setQ1Answered: this.setQ1Answered,
          setQ2Answered: this.setQ2Answered,
          setQ3Answered: this.setQ3Answered,
        }}
      >
        {this.props.children}
      </QuizContext.Provider>
    );
  }
}

export default QuizContextProvider;
