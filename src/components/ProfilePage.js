import React from "react";
import ProfileTableList from "./ProfileTableList";

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      gender: "",
      over18: "",
      profiles: [],
      editRow: ""
    };
  }

  onChangeHandle = event => {
    // const target = event.target;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  };

  formSubmit = () => {
    let newId;

    if (this.state.profiles.length != 0) {
      newId = this.state.profiles[this.state.profiles.length - 1].id + 1;
    } else {
      newId = 1;
    }

    var newObj = {
      id: newId,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      gender: this.state.gender,
      over18: this.state.over18
    };

    let newProfiles = this.state.profiles;

    newProfiles.push(newObj);


    this.setState({
      id: "",
      firstName: "",
      lastName: "",
      gender: "",
      over18: "",
      profiles: newProfiles
    });
  };

  deleteRecord = index => {

    let newProfiles = this.state.profiles;

    newProfiles.splice(index, 1);

    this.setState({
      profiles: newProfiles
    });
  };

  updateRecord = (index, firstName, lastName, gender, over18) => {
    this.state.profiles[index].firstName = firstName;
    this.state.profiles[index].lastName = lastName;
    this.state.profiles[index].gender = gender;
    this.state.profiles[index].over18 = over18;

    this.setState({
      profiles: this.state.profiles
    });
  };

  render() {
    let displayOver18 = "No";

    if (this.state.over18 === true) {
      displayOver18 = "Yes";
    } else {
      displayOver18 = "No";
    }

    return (
      <div className="form-horizontal">
        <div className="form-group">
          <label>First Name</label>
          <input
            className="form-control"
            type="text"
            name="firstName"
            value={this.state.firstName}
            onChange={this.onChangeHandle}
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            className="form-control"
            type="text"
            name="lastName"
            value={this.state.lastName}
            onChange={this.onChangeHandle}
          />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <select
            className="form-control"
            name="gender"
            value={this.state.gender}
            onChange={this.onChangeHandle}
          >
            <option value="">Please Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className="form-group">
          <label className="checkbox-lg">
            Over 18?{" "}
            <input
              type="checkbox"
              id="over18"
              name="over18"
              checked={this.state.over18}
              onChange={this.onChangeHandle}
            />
          </label>
        </div>
        <button className="btn btn-primary btn-block" onClick={this.formSubmit}>
          {" "}
          Submit{" "}
        </button>
        <br />
        <br />
        <br />

        <ProfileTableList
          profiles={this.state.profiles}
          deleteRecord={this.deleteRecord}
          updateRecord={this.updateRecord}
        />
      </div>
    );
  }
}
