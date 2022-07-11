import React, { Component } from "react";
import classNames from "classnames";

import "./AnswerWidget.css";

class AnswerWidget extends Component {
  constructor(props) {
    super(props);
    this.set = this.set.bind(this);
    this.state = {
      answers: this.props.schema.items.enum,
      current: ""
    };
  }

  set(event) {
    this.props.onChange(event.target.value);
    console.log(event.target.name);
    this.setState({
      current: event.target.name
    });
  }

  activeClassName(id) {
    return classNames("answer-widget__button", "btn", {
      "btn-primary": this.state.current === id,
      "btn-secondary": this.state.current !== id
    });
  }

  render() {
    return (
      <div>
        {this.state.answers.map(item => (
          <div key={item.id}>
            <label className={this.activeClassName(item.id)}>
              {item.name}
              <input
                className="sr-only"
                type="radio"
                name={item.id}
                value={item.next_slide}
                onClick={this.set}
              />
            </label>
          </div>
        ))}
      </div>
    );
  }
}

export default AnswerWidget;
