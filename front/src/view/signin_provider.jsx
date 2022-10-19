import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";

import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";

import { Checkbox, CheckboxGroup } from "react-checkbox-group";

import Grid from "@material-ui/core/Grid";

import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";

import axios from "axios";

import Select from "@material-ui/core/Select";

import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";

import FormLabel from "@material-ui/core/FormLabel";

import Tabs from "@material-ui/core/Tabs";

import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

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
        width: 800,
        marginLeft: "auto",
        marginRight: "auto",
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

var tileData = [];

var mainType = [];
var subType = [];
var selected_subtype = [];

class Signin_provider extends React.Component {
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
        this._getData();
    };

    _getSelectSubType = (type) => {
        selected_subtype.length = 0;
        for (var i = 0; i < subType.length; i++) {
            if (subType[i].category_parents == type) {
                selected_subtype.push(subType[i]);
            }
        }
    };

    _getData = async () => {
        this.setState({
            fetching: true, // requesting..
        });
        await axios
            .get("http://203.245.1.104:9000/category")
            .then((response) => {
                for (var i = 0; i < response.data.length; i++) {
                    var dataPack = {
                        category_no: "",
                        category_text: "",
                        category_parents: "",
                        category_use: "",
                        category_depth: "",
                    };
                    var tempdatapack = eval("(" + JSON.stringify(dataPack) + ")");

                    tempdatapack.category_no = response.data[i].category_no;
                    tempdatapack.category_text = response.data[i].category_text;
                    tempdatapack.category_parents = response.data[i].category_parents;
                    tempdatapack.category_use = response.data[i].category_use;
                    tempdatapack.category_depth = response.data[i].category_depth;

                    if (tempdatapack.category_parents == null) {
                        mainType.push(tempdatapack);
                    } else {
                        subType.push(tempdatapack);
                    }
                }

                this.state.rows = mainType;

                // console.log(mainType);

                this.setState({
                    fetching: false,
                });
            }) // SUCCESS
            .catch((response) => {
                // console.log(response);
            }); // ERROR
    };

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

    submmitButton2 = () => {
        var url = config.serverpoint + "/users/provider";
        var pattern1 = /[-]/;
        var pattern2 = /[0-9]/;
        var pattern3 = /[a-zA-Z]/;
        var pattern4 = /[~!@#$%^&*()_+|<>?:{}]/;
        var pattern5 = /[@]/;
        var pattern6 = /[.]/;
        var pattern7 = /[ㄱ-ㅎ가-힣]/;

        // console.log("보낼 url = " + url);
        // console.log("sub의 상태2 = " + this.state.sub);
        // console.log("카테고리 = " + this.state.category);

        if (!this.state.id) {
            alert("id를 입력하세요");
            return;
        } else if (!this.state.password) {
            alert("비밀번호를 입력하세요");
            return;
        } else if (this.state.password != this.state.passwordsame) {
            alert("비밀번호 확인해주세요");
            return;
        } else if (
            !pattern2.test(this.state.passwordsame) ||
            !pattern3.test(this.state.passwordsame) ||
            !pattern4.test(this.state.passwordsame) ||
            this.state.passwordsame.length < 8 ||
            this.state.passwordsame.length > 12
        ) {
            alert("비밀번호는 8~12자리 문자, 숫자, 특수문자로 구성하여야 합니다");
            return;
        } else if (!this.state.provider_person) {
            alert("담당자 이름을 입력하세요");
            return;
        } else if (!this.state.provider_name) {
            alert("제공처명을 입력하세요");
            return;
        } else if (!this.state.provider_type) {
            alert("제공처 종류를 골라주세요");
            return;
        } else if (!this.state.category || this.state.category == "") {
            alert("관심분야를 골라주세요");
            return;
        } else if (!this.state.provider_introduce) {
            alert("회사 소개를 입력하세요");
            return;
        } else if (!this.state.provider_phone) {
            alert("관리자 전화번호 입력하세요");
            return;
        } else if (pattern1.test(this.state.provider_phone)) {
            alert("전화번호에 -을 빼주세요");
            return;
        } else if (
            pattern3.test(this.state.provider_phone) ||
            pattern4.test(this.state.provider_phone) ||
            pattern7.test(this.state.provider_phone)
        ) {
            alert("전화번호에 문자를 빼주세요");
            return;
        } else if (this.state.provider_phone.length < 11) {
            alert("올바른 전화번호를 입력해주세요");
            return;
        } else if (!this.state.provider_mail) {
            alert("관리자 메일을 입력하세요");
            return;
        } else if (!pattern5.test(this.state.provider_mail) || !pattern6.test(this.state.provider_mail)) {
            alert("올바른 메일 주소를 입력해주세요. ex)abcd@abcd.com");
            return;
        } else if (!this.state.provider_class) {
            alert("관리자 직급을 입력하세요");
            return;
        } else if (!this.state.provider_department) {
            alert("제공처 부서를 입력하세요");
            return;
        } else if (!this.state.provider_url) {
            alert("제공처 주소를 입력하세요");
            return;
        } else if (!this.state.provider_term) {
            alert("승인 기간을 입력하세요");
            return;
        } else if (!this.state.provider_deliberate) {
            alert("승인 종류를 입력하세요");
            return;
        } else if (!this.state.provider_status) {
            alert("승인 상태를 입력하세요");
            return;
        } else if (!this.state.provider_traffic) {
            alert("트래픽 제한을 입력하세요");
            return;
        } else if (this.state.sub == true) {
            var hashPassword = crypto
                .createHash("sha256")
                .update(this.state.password)
                .digest("hex");

            var new_passwd = Buffer.from(hashPassword).toString("base64");

            axios
                .post(url, {
                    user_id: this.state.id,
                    user_pw: new_passwd,
                    passwordsame: this.state.passwordsame,
                    provider_person: this.state.provider_person,
                    provider_name: this.state.provider_name,
                    provider_type: this.state.provider_type,
                    category: this.state.category,

                    provider_introduce: this.state.provider_introduce,
                    provider_phone: this.state.provider_phone,
                    provider_mail: this.state.provider_mail,
                    provider_class: this.state.provider_class,
                    provider_department: this.state.provider_department,
                    provider_url: this.state.provider_url,
                    provider_term: this.state.provider_term,
                    provider_deliberate: this.state.provider_deliberate,
                    provider_status: this.state.provider_status,
                    provider_traffic: this.state.provider_traffic,
                })
                .then(function(response) {
                    // console.log("response = " + response);

                    alert("회원가입 축하드립니다");
                    history.push("/main");
                })
                .catch((response) => {
                    // console.log("response =" + response);
                });
        } else if (this.state.sub == false) {
            alert("id가 중복 입니다.");
        } else {
            alert("id중복체크를 해주세요");
        }
    };

    handleSame() {
        var id = this.state.id;
        var url = config.serverpoint + "/users/provider/id/";
        if (this.state.id !== null) {
            url += id;
        }
        // console.log("url = " + url);
        // console.log("id = " + id);

        axios.get(url).then((response) => {
            for (var i = 0; i < response.data.length; i++) {
                if (response.data == "id를 입력해주세요") {
                    // console.log("url response.data = " + response.data)
                    this.setState({ sub: false });
                    alert("id를 입력해주세요");
                    return;
                } else if (id.length < 4 || id.length > 10) {
                    alert("id는 4자리부터 10자리로 만들어주세요");
                    this.setState({ sub: false });
                    return;
                } else if (response.data == "id 사용 가능") {
                    // console.log("url response.data = " + response.data)
                    this.setState({ sub: true });
                    // console.log("sub의 상태 = " + this.state.sub);
                    alert("사용 가능한 아이디 입니다.");
                    return;
                } else if (response.data == "id가 있습니다.") {
                    // console.log("url response.data = " + response.data)
                    this.setState({ sub: false });
                    alert("이미 등록되어 있는 아이디 입니다.");
                    return;
                }
            }
        }); // SUCCESS
    }

    handlePassword() {
        var pw = this.state.password;
        var pw2 = this.state.passwordsame;
        // console.log("url pw = " + pw);
        // console.log("url pw2 = " + pw2);
        if (pw == pw2) {
            return <div></div>;
        } else {
            if (pw2 == undefined || pw2 == "") {
                return <div></div>;
            } else {
                return <div>패스워드를 확인해주세요.</div>;
            }
        }
    }

    handleCall() {
        var call = this.state.provider_phone;
        var pattern1 = /[-]/;
        // console.log("aaa call = " + call);
        if (pattern1.test(call)) {
            return <div>-을 빼주세요</div>;
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
        const { spacing, user_type, items, text } = this.state;

        return (
            <main className="body_membership">
                <a href="/main" className="home">
                    <img src={require("../assets/images/header_logo_uniq.png")} alt="Cloudit" />
                </a>
                <div className="logo">
                    <img src={require("../assets/images/membership_tit.png")} alt="UNIQ Cloud Platform"></img>
                </div>
                <div className="logo2">
                    <img src={require("../assets/images/footer_logo.png")} alt="nipa 정보통신산업진흥원"></img>
                </div>
                <div className="logo3">
                    <img src={require("../assets/images/logo3.png")} alt="산업통상자원부"></img>
                </div>
                <CssBaseline />

                <Paper className="class_paper">
                    <form className="class_form">
                        <div className="signdiv">
                            {" "}
                            제공처 회원가입 <span className="sign">UNIQ Cloud Platform</span>
                        </div>
                        <section></section>

                        <Card className={classes.card}>
                            <CardContent className="cardcontent">
                                <Grid container spacing={24}>
                                    <Grid item xs={12} sm={2}>
                                        <div className="h2">
                                            {" "}
                                            <br></br>
                                            아이디<span className="h3">*</span>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            class="wrap_inputBtn"
                                            id="outlined-id"
                                            className={classes.textField}
                                            value={this.state.id}
                                            placeholder="id는 4~10자리로 만들어주세요"
                                            onChange={this.handleChange("id")}
                                            margin="normal"
                                            fullWidth
                                            variant="filled"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Button variant="outlined" class="password_btn" onClick={this.handleSame}>
                                            중복검사
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} sm={2}></Grid>

                                    <Grid item xs={12} sm={2}>
                                        <div className="h2">
                                            {" "}
                                            <br></br>
                                            패스워드<span className="h3">*</span>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            class="wrap_inputBtn"
                                            id="outlined-password"
                                            type="password"
                                            className={classes.textField}
                                            placeholder="비밀번호는 8~12자리로 만들어주세요"
                                            value={this.state.password}
                                            onChange={this.handleChange("password")}
                                            fullWidth
                                            //handleChange('~~~~')안의 값으로 this.state.~~~~ 할 수 있다.
                                            margin="normal"
                                            variant="filled"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}></Grid>

                                    <Grid item xs={12} sm={2}>
                                        <div className="h2">
                                            {" "}
                                            <br></br>
                                            패스워드 확인<span className="h3">*</span>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            class="wrap_inputBtn"
                                            id="outlined-passwordsame"
                                            type="password"
                                            className={classes.textField}
                                            value={this.state.name}
                                            onChange={this.handleChange("passwordsame")}
                                            fullWidth
                                            margin="normal"
                                            variant="filled"
                                        />
                                        {this.handlePassword()}
                                    </Grid>
                                    <Grid item xs={12} sm={4}></Grid>
                                    <Grid item xs={12} sm={2}>
                                        <div className="h2">
                                            {" "}
                                            <br></br>
                                            관리자 이름<span className="h3">*</span>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            class="wrap_inputBtn"
                                            id="outlined-provider_person"
                                            className={classes.textField}
                                            value={this.state.name}
                                            onChange={this.handleChange("provider_person")}
                                            fullWidth
                                            margin="normal"
                                            variant="filled"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={4}></Grid>

                                    <Grid item xs={12} sm={2}>
                                        <div className="h2">
                                            {" "}
                                            <br></br>
                                            기관 이름<span className="h3">*</span>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            class="wrap_inputBtn"
                                            id="outlined-provider_name"
                                            className={classes.textField}
                                            value={this.state.name}
                                            onChange={this.handleChange("provider_name")}
                                            fullWidth
                                            margin="normal"
                                            variant="filled"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}></Grid>

                                    <Grid item xs={12} sm={2}>
                                        <div className="h2">
                                            {" "}
                                            <br></br>
                                            기관 종류<span className="h3">*</span>
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
                                                value="공공기관"
                                                control={<Radio color="primary" />}
                                                onChange={this.handleChange("provider_type")}
                                                label="공공기관"
                                                labelPlacement="end"
                                            />
                                            <FormControlLabel
                                                value="지자체"
                                                control={<Radio color="primary" />}
                                                onChange={this.handleChange("provider_type")}
                                                label="지자체"
                                                labelPlacement="end"
                                            />
                                            <FormControlLabel
                                                value="기업"
                                                control={<Radio color="primary" />}
                                                onChange={this.handleChange("provider_type")}
                                                label="기업"
                                                labelPlacement="end"
                                            />
                                        </RadioGroup>
                                    </Grid>
                                    <Grid item xs={12} sm={3}></Grid>
                                    <Grid item xs={12} sm={2}>
                                        <div className="h2">
                                            카테고리<span className="h3">*</span>
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
                                            보건의료
                                            <Checkbox value="0" />
                                            &nbsp;&nbsp;경제
                                            <Checkbox value="1" />
                                            &nbsp;&nbsp;문화관광
                                            <Checkbox value="2" />
                                            &nbsp;&nbsp;교육
                                            <Checkbox value="3" />
                                            &nbsp;&nbsp;환경
                                            <Checkbox value="4" />
                                            &nbsp;&nbsp;공간정보
                                            <Checkbox value="5" />
                                            &nbsp;&nbsp;복지
                                            <Checkbox value="6" />
                                            &nbsp;&nbsp;행정
                                            <Checkbox value="7" />
                                            &nbsp;&nbsp;식품
                                            <Checkbox value="8" />
                                            &nbsp;&nbsp;농축수산
                                            <Checkbox value="9" />
                                        </CheckboxGroup>
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <div className="h2">
                                            {" "}
                                            <br></br>
                                            회사 소개<span className="h3">*</span>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={10}>
                                        <TextField
                                            class="wrap_inputBtn"
                                            id="outlined-introduce"
                                            className={classes.textField}
                                            value={this.state.name}
                                            onChange={this.handleChange("provider_introduce")}
                                            multiline
                                            fullWidth
                                            placeholder="회사 소개는 100자 이내로 써주세요"
                                            margin="normal"
                                            variant="filled"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={2}>
                                        <div className="h2">
                                            {" "}
                                            <br></br>
                                            관리자 연락처<span className="h3">*</span>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            class="wrap_inputBtn"
                                            id="outlined-provider_phone"
                                            className={classes.textField}
                                            value={this.state.name}
                                            onChange={this.handleChange("provider_phone")}
                                            placeholder="-을 빼고 입력하세요 ex) 01012345678"
                                            fullWidth
                                            margin="normal"
                                            variant="filled"
                                        />
                                        {this.handleCall()}
                                    </Grid>
                                    <Grid item xs={12} sm={4}></Grid>
                                    <Grid item xs={12} sm={2}>
                                        <div className="h2">
                                            {" "}
                                            <br></br>
                                            관리자 메일 주소<span className="h3">*</span>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            class="wrap_inputBtn"
                                            id="outlined-provider_mail"
                                            className={classes.textField}
                                            value={this.state.name}
                                            onChange={this.handleChange("provider_mail")}
                                            placeholder="abcd@abcd.com"
                                            fullWidth
                                            margin="normal"
                                            variant="filled"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}></Grid>

                                    <Grid item xs={12} sm={2}>
                                        <div className="h2">
                                            {" "}
                                            <br></br>
                                            관리자 직급<span className="h3">*</span>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            class="wrap_inputBtn"
                                            id="outlined-provider_class"
                                            className={classes.textField}
                                            value={this.state.name}
                                            onChange={this.handleChange("provider_class")}
                                            fullWidth
                                            margin="normal"
                                            variant="filled"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}></Grid>

                                    <Grid item xs={12} sm={2}>
                                        <div className="h2">
                                            {" "}
                                            <br></br>
                                            관리자 부서<span className="h3">*</span>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            class="wrap_inputBtn"
                                            id="outlined-provider_department"
                                            className={classes.textField}
                                            value={this.state.name}
                                            onChange={this.handleChange("provider_department")}
                                            fullWidth
                                            margin="normal"
                                            variant="filled"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}></Grid>

                                    <Grid item xs={12} sm={2}>
                                        <div className="h2">
                                            {" "}
                                            <br></br>
                                            기관 주소<span className="h3">*</span>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            class="wrap_inputBtn"
                                            id="outlined-provider_url"
                                            className={classes.textField}
                                            value={this.state.name}
                                            onChange={this.handleChange("provider_url")}
                                            placeholder="기관의 주소를 넣어주세요"
                                            fullWidth
                                            margin="normal"
                                            variant="filled"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}></Grid>

                                    <Grid item xs={12} sm={2}>
                                        <div className="h2">
                                            {" "}
                                            <br></br>
                                            승인 기간<span className="h3">*</span>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            class="wrap_inputBtn"
                                            id="outlined-provider_term"
                                            className={classes.textField}
                                            value={this.state.name}
                                            onChange={this.handleChange("provider_term")}
                                            placeholder="승인일로부터 00개월"
                                            fullWidth
                                            margin="normal"
                                            variant="filled"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={4}></Grid>

                                    <Grid item xs={12} sm={2}>
                                        <div className="h2">
                                            {" "}
                                            <br></br>
                                            승인 종류<span className="h3">*</span>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            class="wrap_inputBtn"
                                            id="outlined-provider_deliberate"
                                            className={classes.textField}
                                            value={this.state.name}
                                            onChange={this.handleChange("provider_deliberate")}
                                            placeholder="ex) 자동 승인"
                                            fullWidth
                                            margin="normal"
                                            variant="filled"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={4}></Grid>

                                    <Grid item xs={12} sm={2}>
                                        <div className="h2">
                                            {" "}
                                            <br></br>
                                            승인 상태<span className="h3">*</span>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            class="wrap_inputBtn"
                                            id="outlined-provider_status"
                                            className={classes.textField}
                                            value={this.state.name}
                                            onChange={this.handleChange("provider_status")}
                                            placeholder="ex) 신청"
                                            fullWidth
                                            margin="normal"
                                            variant="filled"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={4}></Grid>

                                    <Grid item xs={12} sm={2}>
                                        <div className="h2">
                                            {" "}
                                            <br></br>
                                            트래픽 제한<span className="h3">*</span>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            class="wrap_inputBtn"
                                            id="outlined-provider_traffic"
                                            className={classes.textField}
                                            value={this.state.name}
                                            onChange={this.handleChange("provider_traffic")}
                                            placeholder="ex) 1000회"
                                            fullWidth
                                            margin="normal"
                                            variant="filled"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={4}></Grid>

                                    <Grid item xs={12} sm={8}></Grid>
                                    <Grid item xs={12} sm={4}>
                                        <div className="h4">'*'가표시된 항목은 필수 입력사항 입니다.</div>
                                    </Grid>
                                    <Grid item xs={12} sm={3}></Grid>
                                    <Button variant="outlined" class="subbmit_btn" onClick={this.submmitButton2}>
                                        회원가입
                                    </Button>

                                    <Grid item xs={12} sm={1}></Grid>
                                    <Button variant="outlined" class="cancel_btn" href="../main">
                                        <br></br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;취소
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

Signin_provider.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signin_provider);
