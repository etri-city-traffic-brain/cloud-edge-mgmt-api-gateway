import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import cookie from "react-cookies";
import axios from "axios";
import history from "../js/history";
import config from "../js/config.js";

var crypto = require("crypto");

const styles = (theme) => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit,
    width: "auto",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 2,
    marginRight: 2,
  },
});

class Login_developer extends React.Component {
  handleLoginButtonClick = async () => {
    var id = document.getElementById("email").value;
    var passwd = document.getElementById("password").value;

    var new_passwd = null;

    if (passwd !== null) {
      var hashPassword = crypto
        .createHash("sha256")
        .update(passwd)
        .digest("hex");

      new_passwd = Buffer.from(hashPassword).toString("base64");

      // console.log(new_passwd);
    }

    var urlstring = config.serverpoint + "/login"
    // var urlstring = "http://127.0.0.1:9000/login";

    await axios
      .post(urlstring, {
        user_id: id,
        user_pw: new_passwd,
      })
      .then((response) => {
        // console.log(response.data);

        if (response.data == "로그인 성공") {
          sessionStorage.setItem("user", id);
          cookie.save("user", id, { path: "/" });
          // console.log("se" + sessionStorage.getItem("user"))
          history.push("/");
        } else {
          history.push("/login_developer");
          window.location.reload();
          alert("ID나 Password를 확인해주세요");
          // console.log("로그인 실패 = ");
        }
      }) // SUCCESS
      .catch((response) => {
        // console.log(response);
      }); // ERROR
  };

  enterCheck = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      this.handleLoginButtonClick();
    }
  };

  handleLogoutButtonClick = (event) => {
    sessionStorage.clear();
    history.push("/");
  };

  render() {
    sessionStorage.clear();

    return (
      <main className="body_membership">
        <a href="/main" className="home">
          <img
            src={require("../assets/images/header_logo_uniq.png")}
            alt="Cloudit"
          />
        </a>
        {/* <div className="logo">
          <img
            src={require("../assets/images/smartoceanlogo.png")}
            alt="SmartOcean"
          />
        </div>
        <div className="logo3">
          <img
            src={require("../assets/images/logo_motie.png")}
            alt="산업통상자원부"
          />
        </div> */}

        <CssBaseline />

        <Paper className="class_paper">
          <form className="class_form">
            <div className="signdiv">
              포털 로그인 <span className="sign">Portal Login</span>
            </div>

            <section>
              <div class="membership_login">
                <FormControl margin="normal" required fullWidth>
                  <Input
                    id="email"
                    name="email"
                    autoComplete="email"
                    placeholder="UserName"
                    autoFocus
                    onKeyDown={this.enterCheck}
                  />
                </FormControl>

                <FormControl margin="normal" required fullWidth>
                  <Input
                    name="password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    placeholder="Password"
                    onKeyDown={this.enterCheck}
                  />
                </FormControl>

                <div>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="btn_login"
                    onClick={this.handleLoginButtonClick}
                  >
                    Login
                  </Button>
                </div>
              </div>
              <div class="membership_login_btns">
                <a href="/signin">SIGN UP</a>
                <a href="/findpw">Forgot Password</a>
              </div>
            </section>
          </form>
        </Paper>
      </main>
    );
  }
}

Login_developer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login_developer);
