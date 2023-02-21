import React, { Component } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class PatternTypeTextInputWidget extends Component {
  constructor(props) {
    super(props);
    var startDate = new Date();
    var startDateTime = new Date();
    startDateTime = startDateTime.setHours(
      startDateTime.setMinutes(new Date(), 30),
      16
    );
    this.state = {
      value: "",
      dateTimeValue: "",
      date: "",
      dateTime: "",
      startDate: startDate,
      setStartDate: startDate,
      startDateTime: startDateTime,
      setStartDateTime: startDateTime,
      showDatepicker: props.schema.field_type
    };
  }

  componentDidMount() {
    if (this.state.showDatepicker === "date") {
      this.setStartDate(new Date());
    }
    if (this.state.showDatepicker === "datetime-local") {
      this.setStartDate(new Date());
    }
  }

  setStartDate(date) {
    this.setState({
      startDate: date
    });

    var mm = date.getMonth() + 1;
    var dd = date.getDate();
    var yy = date.getFullYear();
    dd = dd.toString();
    mm = mm.toString();

    if (dd.length === 1) {
      dd = "0" + dd;
    }

    if (mm.length === 1) {
      mm = "0" + mm;
    }

    var date_value = yy + "-" + mm + "-" + dd;

    this.setState({
      value: date_value
    });

    return date;
  }

  setStartDateTime(dateTime) {
    this.setState({
      startDateTime: dateTime
    });

    var mm = dateTime.getMonth() + 1;
    var dd = dateTime.getDate();
    var yy = dateTime.getFullYear();
    var hours = dateTime.getHours();
    var minutes = dateTime.getMinutes();
    dd = dd.toString();
    mm = mm.toString();

    if (dd.length === 1) {
      dd = "0" + dd;
    }

    if (mm.length === 1) {
      mm = "0" + mm;
    }

    var date_value = yy + "-" + mm + "-" + dd + " " + hours + ":" + minutes;

    this.setState({
      dateTimeValue: date_value
    });

    return dateTime;
  }

  render() {
    const props = this.props;
    const own_this = this;
    props.onChange(this.state.value === "" ? "" : this.state.value);
    if (this.state.showDatepicker === "date") {
      return (
        <div>
          <DatePicker
            className="form-control"
            dateFormat="dd.MM.yyyy"
            selected={this.state.startDate}
            onChange={date => this.setStartDate(date)}
            showMonthDropdown
            showYearDropdown
          />
        </div>
      );
    } else if (this.state.showDatepicker === "datetime-local") {
      return (
        <div>
          <DatePicker
            className="form-control"
            dateFormat="dd.MM.yyyy h:mm"
            selected={this.state.startDateTime}
            onChange={date => this.setStartDateTime(date)}
            showTimeSelect
            showMonthDropdown
            showYearDropdown
          />
        </div>
      );
    } else {
      return (
        <div>
          <input
            placeholder={props.placeholder}
            className="form-control"
            value={own_this.state.value}
            onChange={e => {
              own_this.setState({ value: e.target.value });
            }}
            id={props.id}
            pattern={props.schema.pattern ? props.schema.pattern : false}
            type={props.schema.field_type ? props.schema.field_type : "text"}
          />
        </div>
      );
    }
  }
}

export default PatternTypeTextInputWidget;
