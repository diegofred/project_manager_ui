import React from "react";
import { loginUser, createUser } from "./api/LoginApi";

export default class Login extends React.Component {
  state = {
    logged: false,
    sign_up: false
  };

  componentWillMount() {

  }
  email = React.createRef();
  password = React.createRef();
  password_confirmation = React.createRef();

  clearForm = () => {
    this.email.value = "";
    this.password.value = "";
    if (this.state.sign_up) {
      this.password_confirmation.value = "";
    }
  };

  backToLogin = e => {
    e.preventDefault();
    this.setState({
      sign_up: false
    });
    this.clearForm();
  };

  setUserAsLogged = user_logged => {
    this.props.user_logged(user_logged);
  };

  createNewUser = e => {
    e.preventDefault();
    const formData = {
      email: this.email.value,
      password: this.password.value,
      password_confirmation: this.password_confirmation.value,
      confirm_success_url: "localhost:3000"
    };

    createUser(formData)
      .then(response => {

        // sessionStorage.setItem(
        //   "user",
        //   JSON.stringify({
        //     "access-token": jqXHR.getResponseHeader("access-token"),
        //     client: jqXHR.getResponseHeader("client"),
        //     uid: response.data.uid
        //   })
        // );

        this.setUserAsLogged(true);
        this.setState({
          logged: true,
          sign_up: false
        });
      })
      .catch(error => {
        // if (httpObj.status === 200) console.log("200: " + textStatus);
        // else if (httpObj.status === 422) {
        //   alert(
        //     "Please provide a valid values for email, password and password confirmation "
        //   );
        //   console.log(httpObj.status + ": " + textStatus);
        // }
      });
  };

  handleLogin = e => {
    e.preventDefault();
    const formData = {
      email: this.email.value,
      password: this.password.value
    }

    loginUser(formData).then(response=>
      this.signinSuccessful(response)
    ).catch(error=>{
      // if (httpObj.status === 200) console.log("200: " + textStatus);
      // else if (httpObj.status === 401) {
      //   alert("Invalid Credentials");
      //   console.log(httpObj.status + ": " + textStatus);
      // }
    });

  };


  signinSuccessful =  (response) => {
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        "access-token": response.headers['access-token'],
        client: response.headers['client'],
        uid:response.headers['uid']
        })
    );
 
    this.setUserAsLogged(true);
    this.setState({
      logged: true,
      sign_up: false
    });
    // this.$router.replace('/records')
  }





  handleLogout = e => {
    e.preventDefault();
    sessionStorage.removeItem("user");
    //It should SESSION FROM RAILS API
    this.setState({
      logged: false,
      sign_up: false
    });
  };

  changeToSignUp = e => {
    e.preventDefault();
    sessionStorage.removeItem("user");
    this.setState({
      sign_up: true
    });
    this.clearForm();
  };

  render() {
    if (!this.state.logged) {
      return (
        <div>
          <h2>{!this.state.sign_up ? "Sign in" : "Sign up"} </h2>
          <form onSubmit={this.handleLogin}>
            <input
              name="email"
              placeholder="email"
              ref={input => (this.email = input)}
            />
            <input
              name="password"
              type="password"
              placeholder="password"
              ref={input => (this.password = input)}
            />

            {this.state.sign_up ? (
              <input
                name="password_confirmation"
                type="password"
                placeholder="password_confirmation"
                ref={input => (this.password_confirmation = input)}
              />
            ) : (
              ""
            )}

            {!this.state.sign_up ? (
              <button type="submit" className="btn btn-success w-15">
                Sign in
              </button>
            ) : (
              ""
            )}

            {!this.state.sign_up ? (
              <button
                onClick={this.changeToSignUp}
                className="btn btn-success w-15"
              >
                Sign up
              </button>
            ) : (
              ""
            )}

            {this.state.sign_up ? (
              <button
                onClick={this.createNewUser}
                className="btn btn-success w-15"
              >
                Create User
              </button>
            ) : (
              ""
            )}

            {this.state.sign_up ? (
              <button
                onClick={this.backToLogin}
                className="btn btn-success w-15"
              >
                Back
              </button>
            ) : (
              ""
            )}
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <form onSubmit={this.handleLogout}>
            <button type="submit" className="btn btn-success w-15">
              Log out
            </button>
          </form>
        </div>
      );
    }
  }
}
