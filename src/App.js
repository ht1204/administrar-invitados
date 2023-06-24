import React, { Component } from 'react';

class App extends Component {
  regex_input = /^[a-zA-Z\s]+$/;

  constructor(props) {
    super(props);
    this.state = {
      guests: [],
      firstName: '',
      lastName: '',
      firstNameError: false,
      lastNameError: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
  }

  handleFirstNameChange(event) {
    const { value } = event.target;
    this.setState({
      firstName: value,
      firstNameError: !this.validateInput(value),
    });
  }

  handleLastNameChange(event) {
    const { value } = event.target;
    this.setState({
      lastName: value,
      lastNameError: !this.validateInput(value),
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const firstNameError = !this.validateInput(this.state.firstName);
    const lastNameError = !this.validateInput(this.state.lastName);

    if (!firstNameError && !lastNameError) {
      const newGuest = {
        firstName: this.state.firstName.trim(),
        lastName: this.state.lastName.trim(),
      };

      this.setState((prevState) => ({
        guests: [...prevState.guests, newGuest],
        firstName: '',
        lastName: '',
        firstNameError: false,
        lastNameError: false,
      }));
    } else {
      this.setState({
        firstNameError,
        lastNameError,
      });
    }
  }

  validateInput(value) {
    return value.trim() !== '' && this.regex_input.test(value);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="first-name">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="first-name"
                  value={this.state.firstName}
                  onChange={this.handleFirstNameChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="last-name">Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  name="last-name"
                  value={this.state.lastName}
                  onChange={this.handleLastNameChange}
                />
              </div>

              <div className="action">
                <button type="submit" className="btn btn-primary">
                  Agregar Invitado
                </button>
              </div>
            </form>

            <table className="table bordered-table table-striped">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                </tr>
              </thead>
              <tbody>
                {this.state.guests.map((guest, index) => (
                  <tr key={index}>
                    <td>{guest.firstName}</td>
                    <td>{guest.lastName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App


