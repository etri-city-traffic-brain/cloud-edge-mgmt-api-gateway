/* eslint no-eval: 0 */
import React from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
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

var mainType = [];
var subType = [];
var selected_subtype = [];

class Signin extends React.Component {
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
            if (subType[i].category_parents === type) {
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

                    if (tempdatapack.category_parents === null) {
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

        // console.log("보낼 url = " + url);
        // console.log("sub의 상태2 = " + this.state.sub);
        // console.log("카테고리 = " + this.state.category);

        if (!this.state.id) {
            alert("id를 입력하세요");
            return;
        } else if (!this.state.password) {
            alert("비밀번호를 입력하세요");
            return;
        } else if (this.state.password !== this.state.passwordsame) {
            alert("비밀번호 확인해주세요");
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
        } else if (!this.state.category || this.state.category === "") {
            alert("관심분야를 골라주세요");
            return;
        } else if (!this.state.provider_introduce) {
            alert("회사 소개를 입력하세요");
            return;
        } else if (!this.state.provider_phone) {
            alert("관리자 전화번호 입력하세요");
            return;
        } else if (!this.state.provider_mail) {
            alert("관리자 메일을 입력하세요");
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
        } else if (!this.state.auth_key) {
            alert("대표키를 입력하세요");
            return;
        } else if (this.state.sub === true) {
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
        } else if (this.state.sub === false) {
            alert("id가 중복 입니다.");
        } else {
            alert("id중복체크를 해주세요");
        }
    };

    submmitButton = () => {
        var url = config.serverpoint + "/users/developer";

        // console.log("보낼 url = " + url);
        // console.log("sub의 상태2 = " + this.state.sub);
        // console.log("카테고리 = " + this.state.category);

        if (!this.state.id) {
            alert("id를 입력하세요");
            return;
        } else if (!this.state.password) {
            alert("비밀번호를 입력하세요");
            return;
        } else if (this.state.password !== this.state.passwordsame) {
            alert("비밀번호 확인해주세요");
            return;
        } else if (!this.state.user_name) {
            alert("이름을 입력하세요");
            return;
        } else if (!this.state.user_job) {
            alert("직업을 입력하세요");
            return;
        } else if (!this.state.user_call) {
            alert("전화번호를 입력하세요");
            return;
        } else if (!this.state.user_mail) {
            alert("메일주소를 입력하세요");
            return;
        } else if (!this.state.introduce) {
            alert("자기소개를 적어주세요");
            return;
        } else if (!this.state.category || this.state.category === "") {
            alert("관심분야를 골라주세요");
            return;
        } else if (this.state.sub === true) {
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
                    user_name: this.state.user_name,
                    user_job: this.state.user_job,
                    user_call: this.state.user_call,
                    user_mail: this.state.user_mail,
                    company_name: this.state.company_name,
                    company_category: this.state.company_category,
                    company_type: this.state.company_type,
                    introduce: this.state.introduce,
                    category: this.state.category,
                })
                .then(function(response) {
                    // console.log("response = " + response);

                    alert("회원가입 축하드립니다");
                    history.push("/main");
                })
                .catch((response) => {
                    // console.log("response =" + response);
                });
        } else if (this.state.sub === false) {
            alert("id가 중복 입니다.");
        } else {
            alert("id중복체크를 해주세요");
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
                if (response.data === "id를 입력해주세요") {
                    // console.log("url response.data = " + response.data)
                    this.setState({ sub: false });
                    alert("id를 입력해주세요");
                    return;
                } else if (id.length < 4 || id.length > 10) {
                    alert("id는 4자리부터 10자리로 만들어주세요");
                    this.setState({ sub: false });
                    return;
                } else if (response.data === "id 사용 가능") {
                    // console.log("url response.data = " + response.data)
                    this.setState({ sub: true });
                    // console.log("sub의 상태 = " + this.state.sub);
                    alert("사용 가능한 아이디 입니다.");
                    return;
                } else if (response.data === "id가 있습니다.") {
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
        if (pw === pw2) {
            return <div />;
        } else {
            if (pw2 === undefined || pw2 === "") {
                return <div />;
            } else {
                return <div>패스워드를 확인해주세요.</div>;
            }
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
        return (
            <main className="body_membership">
                {/* <a href="/main" className="home">
                    <img src={require("../assets/images/header_logo_uniq.png")} alt="Cloudit" />
                </a>
                <div className="logo">
                    <img src={require("../assets/images/membership_tit.png")} alt="UNIQ Cloud Platform" />
                </div>
                <div className="logo2">
                    <img src={require("../assets/images/footer_logo.png")} alt="nipa 정보통신산업진흥원" />
                </div>
                <div className="logo3">
                    <img src={require("../assets/images/logo3.png")} alt="산업통상자원부" />
                </div> */}

                <CssBaseline />

                <Paper className="class_paper">
                    <form className="class_form">
                        <div className="signdiv">
                            포털 회원가입 <span className="sign">Register for portal</span>
                        </div>

                        <section>
                            <div class="membership_txt">
                                회원가입을 하시면 UNIQ Cloud Platform에서 제공하는 정보를 자유롭게 사용 가능합니다.
                                <br />
                                회원가입은 개발자 전용 가입과 제공처 전용 가입으로 나뉘어집니다. <br />
                                &nbsp; · 개발자 : 포털 서비스 이용, 오픈데이터 신청 및 이용 가능 <br />
                                &nbsp; · 제공처 : 오픈데이터 제공 및 등록 가능 <br />
                            </div>
                        </section>

                        <Grid container spacing={24}>
                            <CardContent className="cardcontents">
                                <strong className="tits">개발자</strong>
                                <Grid container spacing={12}>
                                    <Grid item xs={6} sm={2} />
                                    <img src={require("../assets/images/membership_developer.png")} alt="Cloudit" />
                                    <Grid item xs={6} sm={4} />
                                    <a href="signin_developer" class="btn_confirm">
                                        회원가입하기
                                    </a>
                                </Grid>
                            </CardContent>

                            <Grid item xs={6} sm={1} />
                            <CardContent className="cardcontents">
                                <strong className="tits">제공처</strong>
                                <Grid container spacing={12}>
                                    <Grid item xs={6} sm={2} />
                                    <img src={require("../assets/images/membership_provider.png")} alt="Cloudit" />
                                    <Grid item xs={6} sm={4} />
                                    <a href="signin_provider" class="btn_confirm2">
                                        회원가입하기
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

Signin.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signin);
