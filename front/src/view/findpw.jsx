import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
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

class Findpx extends React.Component {
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
        show: false,
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

    submmitButton3 = () => {
        var url = config.serverpoint + "/users/developer/findid/id";

        // console.log("보낼 url = " + url);
        // console.log("보낼 이름 = " + this.state.user_name);
        // console.log("보낼 메일 = " + this.state.user_mail);

        if (!this.state.user_name) {
            alert("이름 입력하세요");
            return;
        } else if (!this.state.user_call) {
            alert("전화번호를 입력하세요");
            return;
        } else if (!this.state.user_mail) {
            alert("이메일를 입력하세요");
            return;
        } else {
            axios
                .post(url, {
                    user_name: this.state.user_name,
                    user_call: this.state.user_call,
                    user_mail: this.state.user_mail,
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

    submmitButton4 = () => {
        var url = config.serverpoint + "/users/developer/findpw/id";

        // console.log("보낼 url = " + url);
        // console.log("보낼 id = " + this.state.user_id);
        // console.log("보낼 이름 = " + this.state.user_name);
        // console.log("보낼 메일 = " + this.state.user_mail);

        if (!this.state.user_id) {
            alert("아이디를 입력하세요");
            return;
        } else if (!this.state.user_name) {
            alert("이름 입력하세요");
            return;
        } else if (!this.state.user_mail) {
            alert("이메일를 입력하세요");
            return;
        } else {
            axios
                .post(url, {
                    user_id: this.state.user_id,
                    user_name: this.state.user_name,
                    user_mail: this.state.user_mail,
                })
                .then((response) => {
                    // console.log("보낼 response = " + response.data);

                    if (response.data == "아이디, 이름 또는 메일을 확인해주세요.") {
                        alert(response.data);
                        window.location.reload();
                    } else if (response.data == "인증이 완료되었습니다") {
                        this.setState({
                            sub: true,
                            show: true,
                        });
                        alert(response.data);
                    }
                })
                .catch((response) => {
                    // console.log("response =" + response);
                });
        }
    };

    submmitButton5 = () => {
        var url = config.serverpoint + "/users/developer/findpw/id";

        // console.log("보낼 url = " + url);
        // console.log("보낼 pw = " + this.state.user_pw);
        // console.log("보낼 sub의 상태 = " + this.state.sub);

        if (this.state.sub == undefined) {
            alert("인증을 해주세요");
        } else if (!this.state.user_pw) {
            alert("비밀번호를 입력하세요");
            return;
        } else if (!this.state.user_pw_same) {
            alert("비밀번호를 확인해주세요");
            return;
        } else if (this.state.user_pw != this.state.user_pw_same) {
            alert("비밀번호가 맞지 않습니다");
            return;
        } else if (this.state.sub == true) {
            var hashPassword = crypto
                .createHash("sha256")
                .update(this.state.user_pw)
                .digest("hex");

            var new_passwd = Buffer.from(hashPassword).toString("base64");

            axios
                .put(url, {
                    user_name: this.state.user_name,
                    user_id: this.state.user_id,
                    user_mail: this.state.user_mail,
                    user_pw: new_passwd,
                    user_pw_same: this.state.user_pw_same,
                })
                .then(function(response) {
                    // console.log("보낼 response = " + response.data);

                    alert(response.data);
                    history.push("/main");
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
                {/* <a href="/main" className="home">
                    <img src={require("../assets/images/header_logo_uniq.png")} alt="Cloudit" />
                </a>
                <div className="logo">
                    <img src={require("../assets/images/membership_tit.png")} alt="UNIQ Cloud Platform" />
                </div> */}

                <CssBaseline />

                <Paper className="class_paper">
                    <form className="class_form">
                        <div className="signdiv">아이디/비밀번호 찾기</div>

                        <section>
                            <strong>아이디 찾기</strong>
                            <Card className={classes.card}>
                                <CardContent className="cardcontent">
                                    <Grid container spacing={24}>
                                        <Grid item xs={12} sm={2}>
                                            <div className="h2">
                                                <br />
                                                이름
                                            </div>
                                        </Grid>

                                        <Grid item xs={12} sm={9}>
                                            <TextField
                                                class="wrap_inputBtn"
                                                id="outlined-id"
                                                className={classes.textField}
                                                value={this.state.id}
                                                onChange={this.handleChange("user_name")}
                                                margin="normal"
                                                fullWidth
                                                variant="filled"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={1} />

                                        <Grid item xs={12} sm={2}>
                                            <div className="h2">
                                                <br />
                                                전화 번호
                                            </div>
                                        </Grid>

                                        <Grid item xs={12} sm={9}>
                                            <TextField
                                                class="wrap_inputBtn"
                                                id="outlined-id"
                                                className={classes.textField}
                                                value={this.state.id}
                                                onChange={this.handleChange("user_call")}
                                                margin="normal"
                                                fullWidth
                                                variant="filled"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={1} />

                                        <Grid item xs={12} sm={2}>
                                            <div className="h2">
                                                <br />
                                                이메일
                                            </div>
                                        </Grid>

                                        <Grid item xs={12} sm={9}>
                                            <TextField
                                                class="wrap_inputBtn"
                                                id="outlined-id"
                                                className={classes.textField}
                                                value={this.state.id}
                                                onChange={this.handleChange("user_mail")}
                                                margin="normal"
                                                fullWidth
                                                variant="filled"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={8} />
                                        <Button variant="outlined" class="subbmit_btn" onClick={this.submmitButton3}>
                                            찾기
                                        </Button>
                                    </Grid>
                                </CardContent>
                            </Card>
                            <br />
                            <br />
                            <br />
                            <strong>비밀번호 찾기</strong>
                            <Card className={classes.card}>
                                <CardContent className="cardcontent">
                                    <Grid container spacing={24}>
                                        <Grid item xs={12} sm={2}>
                                            <div className="h2">
                                                <br />
                                                아이디
                                            </div>
                                        </Grid>

                                        <Grid item xs={12} sm={9}>
                                            <TextField
                                                class="wrap_inputBtn"
                                                id="outlined-id"
                                                className={classes.textField}
                                                value={this.state.id}
                                                onChange={this.handleChange("user_id")}
                                                margin="normal"
                                                fullWidth
                                                variant="filled"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={1} />

                                        <Grid item xs={12} sm={2}>
                                            <div className="h2">
                                                <br />
                                                이름
                                            </div>
                                        </Grid>

                                        <Grid item xs={12} sm={9}>
                                            <TextField
                                                class="wrap_inputBtn"
                                                id="outlined-id"
                                                className={classes.textField}
                                                value={this.state.id}
                                                onChange={this.handleChange("user_name")}
                                                margin="normal"
                                                fullWidth
                                                variant="filled"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={1} />

                                        <Grid item xs={12} sm={2}>
                                            <div className="h2">
                                                <br />
                                                이메일
                                            </div>
                                        </Grid>

                                        <Grid item xs={12} sm={9}>
                                            <TextField
                                                class="wrap_inputBtn"
                                                id="outlined-id"
                                                className={classes.textField}
                                                value={this.state.id}
                                                onChange={this.handleChange("user_mail")}
                                                margin="normal"
                                                fullWidth
                                                variant="filled"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={8} />
                                        <Button value="Submit" variant="outlined" class="subbmit_btn" onClick={this.submmitButton4}>
                                            인증
                                        </Button>

                                        <Grid item xs={12} sm={2}>
                                            <div className="h2">
                                                <br />
                                                새로운
                                                <br />
                                                비밀번호
                                            </div>
                                        </Grid>

                                        <Grid item xs={12} sm={9}>
                                            <TextField
                                                class="wrap_inputBtn"
                                                id="outlined-id"
                                                type="password"
                                                placeholder="새로운 비밀번호를 입력하세요"
                                                className={classes.textField}
                                                value={this.state.id}
                                                onChange={this.handleChange("user_pw")}
                                                margin="normal"
                                                fullWidth
                                                variant="filled"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={1} />

                                        <Grid item xs={12} sm={2}>
                                            <div className="h2">
                                                <br />
                                                비밀번호 확인
                                            </div>
                                        </Grid>

                                        <Grid item xs={12} sm={9}>
                                            <TextField
                                                class="wrap_inputBtn"
                                                id="outlined-id"
                                                type="password"
                                                className={classes.textField}
                                                value={this.state.id}
                                                onChange={this.handleChange("user_pw_same")}
                                                margin="normal"
                                                fullWidth
                                                variant="filled"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={8} />
                                        <Button variant="outlined" class="subbmit_btn" onClick={this.submmitButton5}>
                                            확인
                                        </Button>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </section>
                        <Button variant="outlined" class="cancel_btns" href="../main">
                            <br />
                            취소
                        </Button>
                    </form>
                </Paper>
            </main>
        );
    }
}

Findpx.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Findpx);
