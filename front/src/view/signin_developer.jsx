import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Checkbox, CheckboxGroup } from "react-checkbox-group";
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
        height: 800,
    },
    formControl: {
        minWidth: 200,
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

    textField: {
        marginTop: 0,
        marginRight: theme.spacing.unit,
    },

    button: {
        height: 50,
        width: 200,
    },

    card: {
        maxWidth: 800,
    },
});

var subType = [];
var selected_subtype = [];

class Signin_developer extends React.Component {
    constructor(...props) {
        super(...props);
        this.handleSame = this.handleSame.bind(this);
        this.state.name = this.props.name;
        this.state = {
            category: [],
        };
    }
    categoryChanged = (categoryss) => {
        this.setState({
            category: categoryss,
        });
    };
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

    handleChangeTem = (key) => (event, value) => {
        this.setState({
            [key]: value,
        });
    };

    componentDidMount = () => {
        // this._getData();
    };

    _getSelectSubType = (type) => {
        selected_subtype.length = 0;
        for (var i = 0; i < subType.length; i++) {
            if (subType[i].category_parents == type) {
                selected_subtype.push(subType[i]);
            }
        }
    };

    // _getData = async () => {
    //     this.setState({
    //         fetching: true, // requesting..
    //     });
    //     await axios
    //         .get("http://203.245.1.104:9000/category")
    //         .then((response) => {
    //             for (var i = 0; i < response.data.length; i++) {
    //                 var dataPack = {
    //                     category_no: "",
    //                     category_text: "",
    //                     category_parents: "",
    //                     category_use: "",
    //                     category_depth: "",
    //                 };
    //                 var tempdatapack = eval("(" + JSON.stringify(dataPack) + ")");

    //                 tempdatapack.category_no = response.data[i].category_no;
    //                 tempdatapack.category_text = response.data[i].category_text;
    //                 tempdatapack.category_parents = response.data[i].category_parents;
    //                 tempdatapack.category_use = response.data[i].category_use;
    //                 tempdatapack.category_depth = response.data[i].category_depth;

    //                 if (tempdatapack.category_parents == null) {
    //                     mainType.push(tempdatapack);
    //                 } else {
    //                     subType.push(tempdatapack);
    //                 }
    //             }

    //             this.state.rows = mainType;

    //             // console.log(mainType);

    //             this.setState({
    //                 fetching: false,
    //             });
    //         }) // SUCCESS
    //         .catch((response) => {
    //             // console.log(response);
    //         }); // ERROR
    // };

    handleChangeRedio = (event) => {
        this.setState({ user_type: event.target.value });
    };

    handleChangeRedio_type_develop = (event) => {
        this.setState({ value2: event.target.value2 });
        // console.log(this.state.value2);
    };

    handleChange_select_01 = (event) => {
        this.setState({ selected_01: event.target.value });
        this._getSelectSubType(event.target.value);
    };
    handleChange_select_02 = (event) => {
        this.setState({ selected_02: event.target.value });
    };

    handleChange = (name) => (event) => {
        this.setState({
            [name]: event.target.value,
        });
    };

    submmitButton = () => {
        var url = config.serverpoint + "/users/developer";
        var pattern1 = /[-]/;
        var pattern2 = /[0-9]/;
        var pattern3 = /[a-zA-Z]/;
        var pattern4 = /[~!@#$%^&*()_+|<>?:{}]/;
        var pattern5 = /[@]/;
        var pattern6 = /[.com]/;
        var pattern7 = /[???-??????-???]/;

        if (!this.state.id) {
            alert("id??? ???????????????");
            return;
        } else if (pattern7.test(this.state.id)) {
            alert("id??? ????????? ??????????????????");
            return;
        } else if (!this.state.password) {
            alert("??????????????? ???????????????");
            return;
        } else if (this.state.password != this.state.passwordsame) {
            alert("???????????? ??????????????????");
            return;
        } else if (!this.state.user_name) {
            alert("????????? ???????????????");
            return;
        } else if (!this.state.user_job) {
            alert("????????? ???????????????");
            return;
        } else if (!this.state.user_call) {
            alert("??????????????? ???????????????");
            return;
        } else if (
            !pattern2.test(this.state.passwordsame) ||
            !pattern3.test(this.state.passwordsame) ||
            !pattern4.test(this.state.passwordsame) ||
            this.state.passwordsame.length < 8 ||
            this.state.passwordsame.length > 12
        ) {
            alert("??????????????? 8~12?????? ??????, ??????, ??????????????? ??????????????? ?????????");
            return;
        } else if (pattern1.test(this.state.user_call)) {
            alert("??????????????? -??? ????????????");
            return;
        } else if (pattern3.test(this.state.user_call) || pattern4.test(this.state.user_call) || pattern7.test(this.state.user_call)) {
            alert("??????????????? ????????? ????????????");
            return;
        } else if (this.state.user_call.length < 11) {
            alert("????????? ??????????????? ??????????????????");
            return;
        } else if (!this.state.user_mail) {
            alert("??????????????? ???????????????");
            return;
        } else if (!this.state.gender) {
            alert("????????? ???????????????");
            return;
        } else if (!this.state.company_type) {
            alert("???????????? ?????? ????????? ??????????????????");
            return;
        } else if (!pattern5.test(this.state.user_mail) || !pattern6.test(this.state.user_mail)) {
            alert("????????? ?????? ????????? ??????????????????. ex)abcd@abcd.com");
            return;
        } else if (this.state.sub == true) {
            var hashPassword = crypto.createHash("sha256").update(this.state.password).digest("hex");

            var new_passwd = Buffer.from(hashPassword).toString("base64");

            axios
                .post(url, {
                    user_id: this.state.id,
                    user_pw: new_passwd,
                    passwordsame: this.state.passwordsame,
                    user_name: this.state.user_name,
                    user_job: this.state.user_job,
                    user_call: this.state.user_call,
                    user_mail: this.state.user_mail,
                    gender: this.state.gender,
                    company_name: this.state.company_name,
                    // company_category : this.state.company_category,
                    company_type: this.state.company_type,
                    category: this.state.category,
                })
                .then(function (response) {
                    // console.log("response = " + response);

                    alert("???????????? ??????????????????");
                    history.push("/main");
                })
                .catch((response) => {
                    // console.log("response =" + response);
                });
        } else if (this.state.sub == false) {
            alert("id??? ?????? ?????????.");
        } else {
            alert("id??????????????? ????????????");
        }
    };

    handleSame() {
        var id = this.state.id;
        var url = config.serverpoint + "/users/developer/id/";
        if (this.state.id !== null) {
            url += id;
        }
        // console.log("url = " + url);
        // console.log("id = " + id);

        axios.get(url).then((response) => {
            for (var i = 0; i < response.data.length; i++) {
                if (response.data == "id??? ??????????????????") {
                    // console.log("url response.data = " + response.data)
                    this.setState({ sub: false });
                    alert("id??? ??????????????????");
                    return;
                } else if (id.length < 4 || id.length > 10) {
                    alert("id??? 4???????????? 10????????? ??????????????????");
                    this.setState({ sub: false });
                    return;
                } else if (response.data == "id ?????? ??????") {
                    // console.log("url response.data = " + response.data)
                    this.setState({ sub: true });
                    // console.log("sub??? ?????? = " + this.state.sub);
                    alert("?????? ????????? ????????? ?????????.");
                    return;
                } else if (response.data == "id??? ????????????.") {
                    // console.log("url response.data = " + response.data)
                    this.setState({ sub: false });
                    alert("?????? ???????????? ?????? ????????? ?????????.");
                    return;
                }
            }
        }); // SUCCESS
    }

    handlePassword() {
        var pw = this.state.password;
        var pw2 = this.state.passwordsame;
        var pattern1 = /[0-9]/; // ??????
        var pattern2 = /[a-zA-Z]/; // ??????
        var pattern3 = /[~!@#$%^&*()_+|<>?:{}]/; // ????????????
        // console.log("url pw = " + pw);
        // console.log("url pw2 = " + pw2);
        if (pw == pw2) {
            return <div />;
        } else if (!pattern1.test(pw) || !pattern2.test(pw) || !pattern3.test(pw) || pw.length < 8 || pw.length > 12) {
            return <div>??????????????? 8~12?????? ??????, ??????, ??????????????? ??????????????? ?????????</div>;
        } else {
            if (pw2 == undefined || pw2 == "") {
                return <div />;
            } else {
                return <div>??????????????? ??????????????????.</div>;
            }
        }
    }

    handleCall() {
        var call = this.state.user_call;
        var pattern1 = /[-]/;
        // console.log("aaa call = " + call);
        if (pattern1.test(call)) {
            return <div>-??? ????????????</div>;
        }
    }

    handleLoginButtonClick = (event) => {
        //localStorage.session = true;
        sessionStorage.setItem("mysession", "true");
        history.push("/Main");
    };

    handleLogoutButtonClick = (event) => {
        //localStorage.clear();
        sessionStorage.clear();
        history.push("/");
    };

    render() {
        const { classes } = this.props;

        return (
            <main className="body_membership">

                <CssBaseline />

                <Paper className="class_paper">
                    <form className="class_form">
                        <div className="signdiv">????????????</div>

                        <Card className={classes.card}>
                            <CardContent className="cardcontent">
                                <Grid container spacing={24}>
                                    <Grid item xs={12} sm={2}>
                                        <div className="h2">
                                            <br />
                                            ?????????<span className="h3">*</span>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            class="wrap_inputBtn"
                                            id="outlined-id"
                                            className={classes.textField}
                                            placeholder="id??? 4~10????????? ??????????????????"
                                            value={this.state.id}
                                            onChange={this.handleChange("id")}
                                            margin="normal"
                                            fullWidth
                                            variant="filled"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Button
                                            type="button"
                                            variant="contained"
                                            color="primary"
                                            class="password_btn"
                                            onClick={this.handleSame}
                                        >
                                            ????????????
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} sm={2} />

                                    <Grid item xs={12} sm={2}>
                                        <div className="h2" style={{ fontSize: "1.1rem" }}>
                                            <br />
                                            ????????????<span className="h3">*</span>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            class="wrap_inputBtn"
                                            id="outlined-password"
                                            type="password"
                                            className={classes.textField}
                                            placeholder="??????????????? 8~12????????? ??????????????????"
                                            value={this.state.password}
                                            onChange={this.handleChange("password")}
                                            fullWidth
                                            //handleChange('~~~~')?????? ????????? this.state.~~~~ ??? ??? ??????.
                                            margin="normal"
                                            variant="filled"
                                        />
                                        {this.handlePassword()}
                                    </Grid>
                                    <Grid item xs={12} sm={4} />

                                    <Grid item xs={12} sm={2}>
                                        <div className="h2" style={{ fontSize: "1.1rem" }}>
                                            <br />
                                            ???????????? ??????<span className="h3">*</span>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            class="wrap_inputBtn"
                                            id="outlined-passwordsame"
                                            type="password"
                                            placeholder="??????????????? 8~12????????? ??????????????????"
                                            className={classes.textField}
                                            value={this.state.name}
                                            onChange={this.handleChange("passwordsame")}
                                            fullWidth
                                            margin="normal"
                                            variant="filled"
                                        />
                                        {this.handlePassword()}
                                    </Grid>
                                    <Grid item xs={12} sm={4} />
                                    <Grid item xs={12} sm={2}>
                                        <div className="h2" style={{ fontSize: "1.1rem" }}>
                                            <br />
                                            ??????<span className="h3">*</span>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            class="wrap_inputBtn"
                                            className={classes.textField}
                                            value={this.state.name}
                                            placeholder="ex) ?????????"
                                            onChange={this.handleChange("user_name")}
                                            fullWidth
                                            margin="normal"
                                            variant="filled"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={4} />

                                    <Grid item xs={12} sm={2}>
                                        <div className="h2" style={{ fontSize: "1.1rem" }}>
                                            <br />
                                            ??????<span className="h3">*</span>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            class="wrap_inputBtn"
                                            id="outlined-user_job"
                                            className={classes.textField}
                                            value={this.state.name}
                                            placeholder="ex) ?????????, ?????????, ?????????"
                                            onChange={this.handleChange("user_job")}
                                            fullWidth
                                            margin="normal"
                                            variant="filled"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={4} />

                                    <Grid item xs={12} sm={2}>
                                        <div className="h2" style={{ fontSize: "1.1rem" }}>
                                            <br />
                                            ?????????<span className="h3">*</span>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            class="wrap_inputBtn"
                                            id="outlined-user_call"
                                            className={classes.textField}
                                            value={this.state.name}
                                            placeholder="-??? ?????? ??????????????? ex) 01012345678"
                                            onChange={this.handleChange("user_call")}
                                            fullWidth
                                            margin="normal"
                                            variant="filled"
                                        />
                                        {this.handleCall()}
                                    </Grid>

                                    <Grid item xs={12} sm={4} />

                                    <Grid item xs={12} sm={2}>
                                        <div className="h2" style={{ fontSize: "1.1rem" }}>
                                            <br />
                                            ????????????<span className="h3">*</span>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            class="wrap_inputBtn"
                                            id="outlined-user_mail"
                                            className={classes.textField}
                                            value={this.state.name}
                                            placeholder="abcd@abcd.com"
                                            onChange={this.handleChange("user_mail")}
                                            fullWidth
                                            margin="normal"
                                            variant="filled"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={4} />

                                    <Grid item xs={12} sm={2}>
                                        <div className="h2" style={{ fontSize: "1.1rem" }}>
                                            <br />
                                            ??????<span className="h3">*</span>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <RadioGroup
                                            aria-label="position"
                                            name="position"
                                            value2={this.state.value2}
                                            onChange={this.handleChangeRedio_type_develop}
                                            row
                                        >
                                            <FormControlLabel
                                                value="??????"
                                                control={<Radio color="primary" />}
                                                onChange={this.handleChange("gender")}
                                                label="??????"
                                                labelPlacement="end"
                                            />
                                            <FormControlLabel
                                                value="??????"
                                                control={<Radio color="primary" />}
                                                onChange={this.handleChange("gender")}
                                                label="??????"
                                                labelPlacement="end"
                                            />
                                        </RadioGroup>
                                    </Grid>

                                    <Grid item xs={12} sm={4} />

                                    <Grid item xs={12} sm={2}>
                                        <div className="h2" style={{ fontSize: "1.05rem", letterSpacing: -1 }}>
                                            <br />
                                            ???????????? ?????? ??????<span className="h3">*</span>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} sm={10}>
                                        <RadioGroup
                                            aria-label="position"
                                            name="position"
                                            value2={this.state.value2}
                                            onChange={this.handleChangeRedio_type_develop}
                                            row
                                        >
                                            <FormControlLabel
                                                value="????????????"
                                                control={<Radio color="primary" />}
                                                onChange={this.handleChange("company_type")}
                                                label="????????????"
                                                labelPlacement="end"
                                            />
                                            <FormControlLabel
                                                value="?????????"
                                                control={<Radio color="primary" />}
                                                onChange={this.handleChange("company_type")}
                                                label="?????????"
                                                labelPlacement="end"
                                            />
                                            <FormControlLabel
                                                value="??????"
                                                control={<Radio color="primary" />}
                                                onChange={this.handleChange("company_type")}
                                                label="??????"
                                                labelPlacement="end"
                                            />
                                            <FormControlLabel
                                                value="null"
                                                control={<Radio color="primary" />}
                                                onChange={this.handleChange("company_type")}
                                                label="??????(????????? ????????? ??????)"
                                                labelPlacement="end"
                                            />
                                        </RadioGroup>
                                    </Grid>

                                    <Grid item xs={12} sm={2}>
                                        <div className="h2" style={{ fontSize: "1.05rem", letterSpacing: -1 }}>
                                            <br />
                                            ???????????? ?????? ??????
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            class="wrap_inputBtn"
                                            id="outlined-company_name"
                                            className={classes.textField}
                                            value={this.state.name}
                                            onChange={this.handleChange("company_name")}
                                            fullWidth
                                            margin="normal"
                                            variant="filled"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={4} />

                                    {/* <Grid item xs={12} sm={2}>
                          <div className="h2"> <br></br>
                            ???????????? ?????? ????????????</div>
                            </Grid>

                          <Grid item xs={12} sm={6}>
                            <TextField class="wrap_inputBtn"
                              id="outlined-company_category"
                              className={classes.textField}
                              value={this.state.name}
                              onChange={this.handleChange('company_category')}
                              fullWidth
                              margin="normal"
                              variant="filled"

                            />
                          </Grid>

                          <Grid item xs={12} sm={4}></Grid> */}

                                    <Grid item xs={12} sm={3}>
                                        <div className="h2">
                                            ?????? ????????????<span className="h3">*</span>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} sm={9}>
                                        <CheckboxGroup
                                            aria-label="position"
                                            name="position"
                                            value={this.state.category}
                                            onChange={this.categoryChanged}
                                            row
                                        >
                                            <Checkbox value="0" />
                                            &nbsp;&nbsp;????????????
                                            <Checkbox value="1" />
                                            &nbsp;&nbsp;??????
                                            <Checkbox value="2" />
                                            &nbsp;&nbsp;????????????
                                            <Checkbox value="3" />
                                            &nbsp;&nbsp;??????
                                            <Checkbox value="4" />
                                            &nbsp;&nbsp;????????????
                                            <Checkbox value="5" />
                                            &nbsp;&nbsp;????????????
                                            <Checkbox value="6" />
                                            &nbsp;&nbsp;??????
                                            <Checkbox value="7" />
                                            &nbsp;&nbsp;??????
                                        </CheckboxGroup>
                                    </Grid>

                                    <Grid item xs={12} sm={8} />
                                    <Grid item xs={12} sm={4}>
                                        <div className="h4">'*'???????????? ????????? ?????? ???????????? ?????????.</div>
                                    </Grid>
                                    <Grid item xs={12} sm={8} />

                                    <Grid item xs={12} sm={2} />
                                    <Grid item xs={12} sm={3} />
                                    <Button
                                        style={{ textAlign: "center" }}
                                        variant="outlined"
                                        class="subbmit_btn"
                                        onClick={this.submmitButton}
                                    >
                                        ????????????
                                    </Button>

                                    <Grid item xs={12} sm={1} />
                                    <Button style={{ textAlign: "center" }} variant="outlined" class="cancel_btn" href="../main">
                                        <br /> ??????
                                    </Button>
                                </Grid>
                            </CardContent>
                        </Card>
                    </form>
                </Paper>
            </main>
        );
    }
}

Signin_developer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signin_developer);
