import React from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

import CardContent from "@material-ui/core/CardContent";

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

class Login extends React.Component {
  state = {
    name: "Cat in the Hat",
    age: 0,
    multiline: "Controlled",
    currency: "NULL",
    value: "data",
  };
  componentDidMount = () => {
    this._getData();
  };

  _getData = async () => {
    this.setState({
      fetching: true, // requesting..
    });

    var urlstring_add = config.serverpoint + "/settings";

    // console.log('setting = ' + urlstring_add);

    await axios
      .get(urlstring_add)
      .then((response) => {
        var newRows = [];
        // console.log(response.data);

        for (var i = 0; i < response.data.length; i++) {
          var dataPack = {
            id: "id",
            value: "값",
          };

          var tempdatapack = eval("(" + JSON.stringify(dataPack) + ")");

          tempdatapack.id = response.data[i].id;
          tempdatapack.value = response.data[i].value;

          newRows.push(tempdatapack);
        }

        // console.log("information = " + newRows);

        this.state.row_add = newRows;

        this.setState({
          fetching: false,
        });
        // console.log("information = " + this.state.row_add[5].value);
      }) // SUCCESS
      .catch((response) => {
        // console.log(response);
      }); // ERROR
  };

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

    var urlstring = config.serverpoint + "/login";

    await axios
      .post(urlstring, {
        user_id: id,
        user_pw: new_passwd,
      })
      .then((response) => {
        // console.log(response.data);

        if (response.data == "로그인 성공") {
          sessionStorage.setItem("user", id);
          history.push("/");
        } else {
          history.push("/login");
          window.location.reload();
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

  onLogout() {
    cookie.remove("admin", { path: "/" });
    // console.log("aaa " + cookie.load('admin'))
  }

  render() {
    sessionStorage.clear();
    this.onLogout();

    return (
      <main className="body_membership" style={{ height: "100vh" }}>
        <a href="/main" className="home">
          <img
            src={require("../assets/images/header_logo_uniq.png")}
            alt="Cloudit"
          />
        </a>
        <div className="logo">
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
        </div>

        <CssBaseline />

        <Paper className="class_paper" style={{ height: "100vh" }}>
          <form className="class_form">
            <div className="signdiv">
              포털 로그인 <span className="sign">Portal Login</span>
            </div>

            <section>
              <div class="membership_txt">
                UNIQ Cloud Platform에 오신 것을 환영합니다.
                <br />
                일반(개인) 사용자 또는 개발자는 일반(개인) 로그인을 <br />
                기관회원 또는 제공처는 기관 로그인을 해주세요. <br />
              </div>
            </section>

            <Grid container spacing={24}>
              <CardContent className="cardcontents">
                <strong className="tits">일반(개인) 회원</strong>
                <Grid container spacing={12}>
                  <Grid item xs={6} sm={2} />
                  <img
                    src={require("../assets/images/membership_developer.png")}
                    alt="Cloudit"
                  />
                  <Grid item xs={6} sm={4} />
                  <a href="/login_developer" class="btn_confirm">
                    로그인하기
                  </a>
                </Grid>
              </CardContent>

              <Grid item xs={6} sm={1} />
              <CardContent className="cardcontents">
                <strong className="tits">기관(제공처) 회원</strong>
                <Grid container spacing={12}>
                  <Grid item xs={6} sm={2} />
                  <img
                    src={require("../assets/images/membership_provider.png")}
                    alt="Cloudit"
                  />
                  <Grid item xs={6} sm={4} />
                  <a href={"http://203.245.1.104:3001"} class="btn_confirm2">
                    로그인하기
                  </a>
                </Grid>
              </CardContent>
            </Grid>
          </form>
        </Paper>
      </main>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
