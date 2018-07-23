import React from 'react';

export default class ProfileTableList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editRow: '',
      firstName: '',
      lastName: '',
      gender: '',
      over18: ''
    };
  }

  toggleEditRecord = (index,firstName,lastName,gender,over18) => {

    this.setState({
      editRow: index,
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      over18: over18
    });
  };

  cancelEditRecord = index => {
    this.setState({
      editRow: '',
      firstName: '',
      lastName: '',
      gender: '',
      over18: ''
    });
  };

  handleOnChange = event => {
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

saveEditRecord = (index) => {
   
    this.setState({
      editRow: ''
    });
  

  this.props.updateRecord(index,this.state.firstName,this.state.lastName,this.state.gender,this.state.over18);
  
  };

  render() {
    var self = this;
    var thisEditRow = this.state.editRow;

    let profilesData = this.props.profiles.map(function(profile, index) {

      if (thisEditRow === index) {
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              <input className="form-control"
                type="text"
                name="firstName"
                defaultValue={profile.firstName}
                onChange={self.handleOnChange}
              />
            </td>
            <td>
              <input className="form-control"
                type="text"
                name="lastName"
                defaultValue={profile.lastName}
                onChange={self.handleOnChange}
              />
            </td>
            <td>
              <select className="form-control"
                name="gender"
                defaultValue={profile.gender}
                onChange={self.handleOnChange}
              >
                <option value="">Please Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </td>
            <td>
              {" "}
              <input className="form-control"
                type="checkbox"
                name="over18"
                defaultChecked={profile.over18}
                onChange={self.handleOnChange}
              />
              
            </td>
            <td>
              <button className="btn btn-secondary" onClick={() => self.cancelEditRecord(index)}>
                Cancel
              </button>
              <button className="btn btn-success" onClick={() => self.saveEditRecord(index)}>Save</button>
            </td>
          </tr>
        );
      } else {
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{profile.firstName}</td>
            <td>{profile.lastName}</td>
            <td>{profile.gender}</td>
            <td>{profile.over18 ? "Yes" : "No"}</td>
            <td>
              <button className="btn btn-danger" onClick={() => self.props.deleteRecord(index)}>
                Delete
              </button>
              <button className="btn btn-info" onClick={() => self.toggleEditRecord(index,profile.firstName,profile.lastName,profile.gender,profile.over18)}>Edit</button>
            </td>
          </tr>
        );
      }
    });

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender Name</th>
            <th>Over 18?</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{profilesData}</tbody>
      </table>
    );
  }
}
