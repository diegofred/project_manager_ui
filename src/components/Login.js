import React from "react";
import $ from "jquery";
export default class Login extends React.Component {
  state = {
    logged: false,
    sign_up: false
  };


  componentWillMount(){
    console.log('Call ComponenWillMOunt on login');
     if(sessionStorage.getItem('user')){
       this.setState( {
        logged: true,
        sign_up: false
      });
      this.setUserAsLogged(true);
     }
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


  setUserAsLogged = (user_logged) =>{
    this.props.user_logged(user_logged)
  }


  createUser = e => {
    e.preventDefault();
    console.log("A");
    console.log("B" + this.email.value);
    console.log("C" + this.password.value);
    console.log("D" + this.password_confirmation.value);
    $.ajax({
      type: "POST",
      url: "http://192.168.0.98:3000/auth/",
      data: {
        email: this.email.value,
        password: this.password.value,
        password_confirmation: this.password_confirmation.value,
        confirm_success_url: "localhost:3000"
      }
    }).done((response, status, jqXHR) => {
      console.log("E " + status);
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          "access-token": jqXHR.getResponseHeader("access-token"),
          'client': jqXHR.getResponseHeader("client"),
          'uid': response.data.uid
        })
      );
      this.setUserAsLogged(true);
      //this.props.history.push('/');
      this.setState({
        logged: true,
        sign_up: false
      });
    }).fail(function(httpObj, textStatus) {
      if (httpObj.status === 200) console.log("200: " + textStatus);
      else if(httpObj.status === 422){
        alert("Please provide a valid values for email, password and password confirmation ")
        console.log(httpObj.status + ": "+textStatus);
      }
 
    });
  };

  handleLogin = e => {
    e.preventDefault();
    
    $.ajax({
      type: "POST",
      url: "http://192.168.0.98:3000/auth/sign_in",
      data: {
        email: this.email.value,
        password: this.password.value
      }
    }).done((response, status, jqXHR) => {
        console.log("E " + status);
     //   debugger
        sessionStorage.setItem(
          "user",

          JSON.stringify({

            'access-token': jqXHR.getResponseHeader("access-token"),
            'client': jqXHR.getResponseHeader("client"),
            'uid': response.data.uid
          })
        );
        this.setUserAsLogged(true);
        this.setState({
          logged: true,
          sign_up: false
        });
      })
      .fail(function(httpObj, textStatus) {
        if (httpObj.status === 200) console.log("200: " + textStatus);
        else if(httpObj.status === 401){
          alert("Invalid Credentials")
          console.log(httpObj.status + ": "+textStatus);
        }
        debugger
       
      });
  };

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
    console.log('Call render on Login');
    if (!this.state.logged) {
      return (
        <div>
          <h2>{!this.state.sign_up ? "Sign in" : "Sign up" } </h2>
          <form onSubmit={this.handleLogin}>
            <input name="email" placeholder="email" ref={input => (this.email = input)} />
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
                onClick={this.createUser}
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
