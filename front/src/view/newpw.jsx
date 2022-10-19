import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";

import Grid from "@material-ui/core/Grid";

import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";

import axios from "axios";

import history from "./findpw";
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
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
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

class Newpw extends React.Component {
    constructor(...props) {
        super(...props);
        this.state.name = this.props.name;
        this.state = {
            category: [],
        };
    }

    state = {
        name: "",
        age: "",
        multiline: "Controlled",
        currency: "EUR",
        value: "a",
        value2: "a",
        user_type: "developer",
        selected_01: "AAA",
        selected_02: "BBB",
        sub: false,
    };
    state = {
        spacing: "16",
        typedId: "",
        isDuplicateUser: false,
    };

    handleChange = (name) => (event) => {
        this.setState({
            [name]: event.target.value,
        });
    };

    submmitButton5 = () => {
        var url = config.serverpoint + "/users/developer/findpw/id";

        // console.log("보낼 url = " + url);
        // console.log("보낼 pw = " + this.state.user_pw);

        if (!this.state.user_pw) {
            alert("비밀번호를 입력하세요");
            return;
        } else if (!this.state.user_pw_same) {
            alert("비밀번호를 확인해주세요");
            return;
        } else {
            axios
                .put(url, {
                    user_pw: this.state.user_pw,
                    user_pw_same: this.state.user_pw_same,
                })
                .then(function(response) {
                    // console.log("보낼 response = " + response.data);

                    alert(response.data);
                    window.location.reload();
                })
                .catch((response) => {
                    // console.log("response =" + response);
                });
        }
    };

    render() {
        const { classes, theme } = this.props;

        return (
            <main className="body_membership">
                <div className="logo">
                    <img src={require("../assets/images/membership_tit.png")} alt="UNIQ Cloud Platform"></img>
                </div>
                <div className="logo2">
                    <img src={require("../assets/images/footer_logo.png")} alt="nipa 정보통신산업진흥원"></img>
                </div>

                <CssBaseline />

                <Paper className="class_paper">
                    <form className="class_form">
                        <div className="signdiv">나의 새로운 비밀번호</div>

                        <section>
                            <strong>새로운 비밀번호</strong>
                            <Card className={classes.card}>
                                <CardContent className="cardcontent">
                                    <Grid container spacing={24}>
                                        <Grid item xs={12} sm={2}>
                                            <div className="h2">
                                                {" "}
                                                <br></br>
                                                비밀번호
                                            </div>
                                        </Grid>

                                        <Grid item xs={12} sm={9}>
                                            <TextField
                                                class="wrap_inputBtn"
                                                id="outlined-id"
                                                className={classes.textField}
                                                value={this.state.id}
                                                onChange={this.handleChange("user_pw")}
                                                margin="normal"
                                                fullWidth
                                                variant="filled"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={1}>
                                            {" "}
                                        </Grid>

                                        <Grid item xs={12} sm={2}>
                                            <div className="h2">
                                                {" "}
                                                <br></br>
                                                비밀번호 확인
                                            </div>
                                        </Grid>

                                        <Grid item xs={12} sm={9}>
                                            <TextField
                                                class="wrap_inputBtn"
                                                id="outlined-id"
                                                className={classes.textField}
                                                value={this.state.id}
                                                onChange={this.handleChange("user_pw_same")}
                                                margin="normal"
                                                fullWidth
                                                variant="filled"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={8}></Grid>
                                        <Button variant="outlined" class="subbmit_btn" onClick={this.submmitButton5}>
                                            확인
                                        </Button>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </section>
                        <Button variant="outlined" class="cancel_btns" href="../main">
                            <br></br>취소
                        </Button>
                    </form>
                </Paper>
            </main>
        );
    }
}

Newpw.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Newpw);
