import React, { createContext, Component } from "react";

export const QuizContext = createContext();

class QuizContextProvider extends Component {
  state = {
    prepActiveCategory: "Heat Short Term",
    adviceActiveCategory: "General",
  };

  setPrepCategory = (category) => {
    this.setState({ prepActiveCategory: category });
  };

  setAdviceCategory = (category) => {
    this.setState({ adviceActiveCategory: category });
  };
  render() {
    return (
      <QuizContext.Provider
        value={{
          ...this.state,
          setAdviceCategory: this.setAdviceCategory,
          setPrepCategory: this.setPrepCategory,
        }}
      >
        {this.props.children}
      </QuizContext.Provider>
    );
  }
}

export default QuizContextProvider;
