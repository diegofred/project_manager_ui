import React from "react";
import $ from "jquery";
export default class SignUp extends React.Component {
  handleLogin = e => {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: 'http://192.168.0.98:3000/auth/sign_up',
        data: {
          email: this.email.value,
          password: this.password.value,
          password_confirmation: this.password.value
        }
      })
      .done((response, status, jqXHR) => {
        sessionStorage.setItem('user',
          JSON.stringify({
            'access-token': jqXHR.getResponseHeader('access-token'),
            client: jqXHR.getResponseHeader('client'),
            uid: response.data.uid
          }));
        //this.props.history.push('/');
      })
    }

  render() {
    return (
      <div>
        <h2>Sign up</h2>
        <form onSubmit={this.handleLogin}>
          <input name="email" ref={input => (this.email = input)} />
          <input
            name="password"
            type="password"
            ref={input => (this.password = input)}
          />
            <input
            name="password_confirmation"
            type="password_confirmation"
            ref={input => (this.password_confirmation = input)}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}
