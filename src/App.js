import React, { Component } from "react";
import "./App.css";
import { Gallery } from "./gallery/Gallery.component";
import { Input } from "./input/Input.component";


class App extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.state = {
      input: "",
      value: "",
      nextPage: 0,
      newSearch: true
    };
  }
  handleChange(event) {
    this.setState({
      input: event.target.value.toLowerCase()
    });
  }

  handleSubmit() {
    this.setState({
      value: this.state.input,
      newSearch: true
    });
  }
  handleKeyPress(event) {
    if (event.key === "Enter") {
      this.setState({
        value: this.state.input,
        newSearch: true
      });
    }
  }

  handleScroll() {
    let height = document.body.offsetHeight;
    let scrollY = window.pageYOffset;
    if (height - scrollY - 1000 < 0) {
      this.setState({ nextPage: this.state.nextPage + 1, newSearch: false })
    }
  }
  handleReset() {
    this.setState({ nextPage: 0, newSearch: true })
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    return (
      <div id="App">
        <div className='background'></div>
        <div className='content-container'>
          <h1> Photo finder </h1>
          <Input
            handleClick={this.handleSubmit}
            handleChange={this.handleChange}
            handleKeyPress={this.handleKeyPress}
          />
          <Gallery category={this.state.value} nextPage={this.state.nextPage} newSearch={this.state.newSearch} reset={this.handleReset} />
        </div>
      </div>
    );
  }
}

export default App;
