import React, { Component } from 'react';

class LoginForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.login(e.target.username.value, e.target.password.value)
    }
    render() {
        return (
        <div className="LoginForm">
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input required="required" className="form-control" type="text" name="username" id="username" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input required="required" className="form-control" type="password" name="password" id="password" />
                </div>
                <input className="btn btn-default" type="submit" value="Login" />
            </form>
        </div>
    );
    }
}

export default LoginForm;
