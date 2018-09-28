import React, { Component } from "react";
import './Photo.css';

export class Photo extends Component {
    _onError = (src) => {
        document.getElementById(src).style.display = 'none';
    }

    render() {
        return (
            <img id={this.props.image} src={this.props.image} className="image" onError={() => this._onError(this.props.image)} alt="not-avilable" />
        )
    }
};
