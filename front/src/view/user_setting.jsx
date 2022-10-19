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

var myrows2 = [];

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

class user_setting extends React.Component {
    constructor(...props) {
        super(...props);
        this.handleSame = this.handleSame.bind(this);
        this.state.name = this.props.name;
        this.state = {
            category: [],
        };
        this.state.popupType = 0;
        this.handlePopupCancle = this.handlePopupCancle.bind(this);
    }

    handlePopupCancle() {
        // console.log("Cancle");
        this.setState({ popupType: 0 });
    }

    deleterequest = () => {
        this.setState({
            popupType: 2,
        });
    };

    categoryChanged = (categoryss) => {
        this.setState({
            category: categoryss,
        });
        // console.log('cate = ' + categoryss)
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
        rows2: myrows2,
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

        var urlstring = config.serverpoint + "/users/developer/" + sessionStorage.getItem("user");

        await axios
            .get(urlstring)
            .then((response) => {
                var newRows = [];
                // console.log(response.data);

                for (var i = 0; i < response.data.length; i++) {
                    var dataPack = {
                        user_id: "null",
                        user_name: "100",
                        user_job: "제목",
                        user_call: "운영자",
                        user_mail: "2019.01.21",
                        // company_name : "66",
                        // company_type : "null",
                        // company_category : "null",
                        introduce: "null",
                        category: "null",
                    };

                    var tempdatapack = eval("(" + JSON.stringify(dataPack) + ")");

                    tempdatapack.user_id = response.data[i].user_id;
                    tempdatapack.user_name = response.data[i].user_name;
                    tempdatapack.user_job = response.data[i].user_job;
                    tempdatapack.user_call = response.data[i].user_call;
                    tempdatapack.user_mail = response.data[i].user_mail;
                    // tempdatapack.company_name = response.data[i].company_name;
                    // tempdatapack.company_type = response.data[i].company_type;
                    // tempdatapack.company_category = response.data[i].company_category;
                    tempdatapack.introduce = response.data[i].introduce;
                    tempdatapack.category = response.data[i].category;

                    newRows.push(tempdatapack);
                }

                this.state.rows2 = newRows;
                this.setState({
                    fetching: false, // done!
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

    submmitButton = () => {
        var url = config.serverpoint + "/users/developer/" + sessionStorage.getItem("user");

        // console.log("보낼 url = " + url);
        // console.log("sub의 상태2 = " + this.state.sub);
        // console.log("카테고리 = " + this.state.category);

        if (!document.getElementById("password").value) {
            alert("비밀번호를 입력하세요");
            return;
        } else if (document.getElementById("password").value != document.getElementById("passwordsame").value) {
            alert("비밀번호 확인해주세요");
            return;
        } else if (!document.getElementById("user_name").value) {
            alert("이름을 입력하세요");
            return;
        } else if (!document.getElementById("user_job").value) {
            alert("직업을 입력하세요");
            return;
        } else if (!document.getElementById("user_call").value) {
            alert("전화번호를 입력하세요");
            return;
        } else if (!document.getElementById("user_mail").value) {
            alert("메일주소를 입력하세요");
            return;
        }

        // else if(!document.getElementById("company_type").value){
        //   alert("재직중인 회사 종류를 선택해주세요")
        //   return;
        // }
        else if (!document.getElementById("introduce").value) {
            alert("자기소개를 적어주세요");
            return;
        } else if (!this.state.category || this.state.category == "") {
            alert("관심 카테고리를 골라주세요");
            return;
        } else {
            var hashPassword = crypto
                .createHash("sha256")
                .update(document.getElementById("password").value)
                .digest("hex");

            var new_passwd = Buffer.from(hashPassword).toString("base64");

            axios
                .put(url, {
                    user_pw: new_passwd,
                    // passwordsame : document.getElementById("passwordsame").value,
                    user_name: document.getElementById("user_name").value,
                    user_job: document.getElementById("user_job").value,
                    user_call: document.getElementById("user_call").value,
                    user_mail: document.getElementById("user_mail").value,
                    // company_name : document.getElementById("company_name").value,
                    // company_category : document.getElementById("company_category").value,
                    // company_type : document.getElementById("company_type").value,
                    introduce: document.getElementById("introduce").value,
                    category: this.state.category,
                })
                .then(function(response) {
                    // console.log("response = " + response);

                    alert("회원수정이 완료되었습니다");
                    history.push("/main");
                })
                .catch((response) => {
                    // console.log("response =" + response);
                });
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
    }

    deleterequest = () => {
        this.setState({
            popupType: 2,
        });
    };

    handleDeletePopup() {
        this.deleterequest();
    }

    deleteuser = async () => {
        var urlstring = config.serverpoint + "/users/developer/" + sessionStorage.getItem("user");

        await axios
            .delete(urlstring)
            .then((response) => {
                this.state.rows3 = response.data;

                this.setState({
                    fetching: false, // done!
                });
            }) // SUCCESS
            .catch((response) => {
                // console.log(response);
            }); // ERROR
        alert("탈퇴가 정상 처리 되었습니다.");

        sessionStorage.clear();
        history.push("/main");
    };

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

        if (!!document.getElementById("user_name") && this.state.fetching == false) {
            document.getElementById("user_name").value = this.state.rows2[0].user_name;
        }
        if (!!document.getElementById("user_job") && this.state.fetching == false) {
            document.getElementById("user_job").value = this.state.rows2[0].user_job;
        }
        if (!!document.getElementById("user_call") && this.state.fetching == false) {
            document.getElementById("user_call").value = this.state.rows2[0].user_call;
        }
        if (!!document.getElementById("user_mail") && this.state.fetching == false) {
            document.getElementById("user_mail").value = this.state.rows2[0].user_mail;
        }
        // if(!!document.getElementById("company_name") && this.state.fetching == false){
        //   document.getElementById("company_name").value = this.state.rows2[0].company_name;
        // }
        // if(!!document.getElementById("company_category") && this.state.fetching == false){
        //   document.getElementById("company_category").value = this.state.rows2[0].company_category;
        // }
        if (!!document.getElementById("introduce") && this.state.fetching == false) {
            document.getElementById("introduce").value = this.state.rows2[0].introduce;
        }
        // if(!!document.getElementById("company_type") && this.state.fetching == false){
        //   document.getElementById("company_type").value = this.state.rows2[0].company_type;
        // }
        if (!!document.getElementById("password") && this.state.fetching == false) {
            document.getElementById("password").value = "";
        }
        if (!!document.getElementById("passwordsame") && this.state.fetching == false) {
            document.getElementById("passwordsame").value = "";
        }

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
                <CssBaseline />

                <Paper className="class_paper">
                    <form className="class_form">
                        <div className="signdiv">
                            {" "}
                            개발자 회원 수정 <span className="sign">UNIQ Cloud Platform</span>
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
                                            id="user_id"
                                            className={classes.textField}
                                            value={this.state.fetching == false && this.state.rows2[0].user_id}
                                            onChange={this.handleChange("id")}
                                            margin="normal"
                                            fullWidth
                                            variant="filled"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}></Grid>

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
                                            id="password"
                                            type="password"
                                            className={classes.textField}
                                            value={this.state.password}
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
                                            id="passwordsame"
                                            type="password"
                                            className={classes.textField}
                                            value={this.state.name}
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
                                            사용자 이름<span className="h3">*</span>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            class="wrap_inputBtn"
                                            id="user_name"
                                            className={classes.textField}
                                            value={this.state.name}
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
                                            사용자 직업<span className="h3">*</span>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            class="wrap_inputBtn"
                                            id="user_job"
                                            className={classes.textField}
                                            value={this.state.name}
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
                                            연락처<span className="h3">*</span>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            class="wrap_inputBtn"
                                            id="user_call"
                                            className={classes.textField}
                                            value={this.state.name}
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
                                            메일주소<span className="h3">*</span>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            class="wrap_inputBtn"
                                            id="user_mail"
                                            className={classes.textField}
                                            value={this.state.name}
                                            fullWidth
                                            margin="normal"
                                            variant="filled"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={4}></Grid>

                                    {/* <Grid item xs={12} sm={2}>
                          <div className="h2"> <br></br>
                            재직중인 회사 종류<span className="h3">*</span></div>
                             
                          </Grid>



                          <Grid item xs={12} sm={10}>

                            <RadioGroup
                              aria-label="position"
                              name="position"
                              id="company_type"
                              value2={this.state.value2}
                             // onChange={this.handleChangeRedio_type_develop}
                              row
                            >
                              <FormControlLabel
                                value="공공기관"
                                control={<Radio color="primary" />}
                               
                                label="공공기관"
                                labelPlacement="end"
                                
                              />
                              <FormControlLabel
                                value="지자체"
                                control={<Radio color="primary" />}
                               
                                label="지자체"
                                labelPlacement="end"
                              />
                              <FormControlLabel
                                value="기업"
                                control={<Radio color="primary" />}
                               
                                label="기업"
                                labelPlacement="end"
                              />
                              <FormControlLabel
                                value="null"
                                control={<Radio color="primary" />}
                            
                                label="기타(회사에 다니지 않음)"
                                labelPlacement="end"
                              />
                              
                            </RadioGroup>

                          </Grid> */}

                                    {/* <Grid item xs={12} sm={2}>
                          <div className="h2"> <br></br>
                            재직중인 회사 이름</div>
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <TextField class="wrap_inputBtn"
                              id="company_name"
                              className={classes.textField}
                              value={this.state.name}
                        
                              fullWidth
                              margin="normal"
                              variant="filled"

                            />
                          </Grid>

                          <Grid item xs={12} sm={4}></Grid> */}

                                    {/* <Grid item xs={12} sm={2}>
                          <div className="h2"> <br></br>
                            재직중인 회사 카테고리</div>
                            </Grid>

                          <Grid item xs={12} sm={6}>
                            <TextField class="wrap_inputBtn"
                              id="company_category"
                              className={classes.textField}
                              value={this.state.name}
                         
                              fullWidth
                              margin="normal"
                              variant="filled"

                            />
                          </Grid>

                          <Grid item xs={12} sm={4}></Grid> */}

                                    <Grid item xs={12} sm={2}>
                                        <div className="h2">
                                            {" "}
                                            <br></br>
                                            자기 소개<span className="h3">*</span>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={10}>
                                        <TextField
                                            class="wrap_inputBtn"
                                            id="introduce"
                                            className={classes.textField}
                                            //value={this.state.name}
                                            fullWidth
                                            margin="normal"
                                            variant="filled"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <div className="h2">
                                            관심 카테고리<span className="h3">*</span>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} sm={9}>
                                        <CheckboxGroup
                                            aria-label="position"
                                            name="position"
                                            value={this.state.category}
                                            id="category"
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

                                    <Grid item xs={12} sm={8}></Grid>
                                    <Grid item xs={12} sm={4}>
                                        <div className="h4">'*'가표시된 항목은 필수 입력사항 입니다.</div>
                                    </Grid>

                                    <Grid item xs={12} sm={1}></Grid>
                                    <Button variant="outlined" class="subbmit_btn" onClick={this.submmitButton}>
                                        회원수정
                                    </Button>

                                    <Grid item xs={12} sm={1}></Grid>
                                    <Button variant="outlined" class="cancel_btn" href="../main">
                                        <br></br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;취소
                                    </Button>

                                    <Grid item xs={12} sm={1}></Grid>
                                    <Button variant="outlined" class="cancel_btn" onClick={() => this.handleDeletePopup()}>
                                        회원 탈퇴
                                    </Button>
                                </Grid>
                            </CardContent>
                        </Card>
                    </form>
                </Paper>

                {this.state.popupType == 2 && (
                    <div class="pop_commons2">
                        <h4 class="pop_tit">알림</h4>
                        <div class="pop_cont_wrap">
                            <div class="pop_cont">
                                <div class="pop_cont_select">
                                    <p>탈퇴하시겠습니까?</p>
                                </div>
                            </div>
                            <div class="pop_btns">
                                <button type="submit" class="pop_btn_submit" onClick={this.deleteuser}>
                                    확인
                                </button>
                                <button type="button" class="pop_btn_cancel" onClick={this.handlePopupCancle}>
                                    취소
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        );
    }
}

export default withStyles(styles)(user_setting);
