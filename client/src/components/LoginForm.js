import React, { Component } from 'react';

class LoginForm extends Component {
  render() {
  	function handleSubmit(e) {
  		e.preventDefault()
  	}
    return (
      <div className="LoginForm">
		<form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input required="" className="form-control" type="text" name="username" id="username" />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input required="" className="form-control" type="password" name="password" id="password" />
            </div>
            <input className="form-control" type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default LoginForm;
