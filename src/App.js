import React from "react";
import "./App.css";
import axios from "axios";

class App extends React.Component {
  state = {
    advice: "",
    itemID: "",
  };

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    var title = this.title;
    console.log(title.value);
    const { value } = title;
    this.setState({ itemID: value });
  }

  componentDidMount() {
    this.fetchAdvice();
  }

  fetchAdvice = () => {
    axios
      .get("https://api.adviceslip.com/advice")
      .then((response) => {
        const { advice } = response.data.slip;
        this.setState({ advice: advice });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { advice } = this.state;
    const { itemID } = this.state;
    return (
      <div className="app">
        <div className="card">
          <h1 className="heading">{advice}</h1>
          <button className="button" onClick={this.fetchAdvice}>
            <span>GIVE ME ADVICE!</span>
          </button>
        </div>
        <form className="form-horizontal">
          <input
            type="text"
            className="form-control"
            ref={(c) => (this.title = c)}
            name="title"
          />
        </form>
        <button type="button" onClick={this.onSubmit} className="btn">
          Set ID
        </button>
        <a href={`avakinlife://shop/item/"${itemID}`}>{itemID}</a>
      </div>
    );
  }
}

export default App;
