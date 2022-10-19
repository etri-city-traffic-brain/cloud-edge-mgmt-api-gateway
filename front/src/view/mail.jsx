import React from "react";

import axios from "axios";
import classNames from "classnames";

import { DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown, NavLink } from "reactstrap";

import { withStyles } from "@material-ui/core/styles";
import history from "../js/history.js";
import TextField from "@material-ui/core/TextField";
import Clock from "./clock";
import MenuItem from "@material-ui/core/MenuItem";

import CardList from "../view/templates/temp_information";
import Sub_information from "../view/templates/temp_sub_information";
import Sub_Oda_carddetail from "../view/templates/temp_sub_Oda_carddetail";

import CustomPaginationActionsTable from "./main_templates/coupon_table.jsx";
import { Divider } from "@material-ui/core";

import normalize from "../assets/css/normalize.css";
import font from "../assets/css/font.css";
import swiper_min from "../assets/css/swiper.min.css";

import styles from "../assets/css/style.css";

import config from "../js/config.js";
import sub_informationList from "../view/templates/temp_information";

import ImageUploader from "react-images-upload";

import session_nav from "./layout/session_nav";

import { findDOMNode } from "react-dom";
import $ from "jquery";
window.$ = $;
class mail extends React.Component {
    state = {
        name: "Cat in the Hat",
        age: 0,
        multiline: "Controlled",
        value: "a",
        currency: "NULL",
        word: "NULL",
        category: "NULL",
        value: "cate",
        notice_no: 0,
    };

    constructor(...props) {
        super(...props);

        this.handleChange = this.handleChange.bind(this);

        this.state = { date: new Date() };

        this.state = { pictures: [] };
        this.onDrop = this.onDrop.bind(this);

        this.child = React.createRef();
        this.state.age = 1000;
        this.state.textFieldValue_value = 1000;
        this.state.bookmark_name = "";
        this.handleReturnCardList = this.handleReturnCardList.bind(this);

        this.state.TabTypes = 0;
        this.state.openapi_no = null;

        this.state.popupType = 0;

        this.state.word = null;

        this.state.category = this.props.category;
        this.state.name = this.props.name;
        this.state.dataType = this.props.dataType;
        this.state.returnTabClose = this.props.returnTabClose;
    }

    onDrop(pictureFiles, pictureDataURLs) {
        this.setState({
            pictures: this.state.pictures.concat(pictureFiles),
        });
    }

    handleReturnCardList() {
        history.push("/main");
    }

    handleToggle = () => {
        const el = findDOMNode(this.refs.toggle);
        $(el).slideToggle();
        const el2 = findDOMNode(this.refs.toggle2);
        $(el2).slideToggle();
        const el3 = findDOMNode(this.refs.toggle3);
        $(el3).slideToggle();
        const el4 = findDOMNode(this.refs.toggle4);
        $(el4).slideToggle();
    };

    componentDidMount = () => {
        this._getData();

        $(document).ready(function() {
            $(".header_nav_menu2").hover(function() {
                $(".header_nav_menu_sub")
                    .stop()
                    .slideDown(300);
            });
            $(".on").hover(function() {
                $(".header_nav_menu_sub")
                    .stop()
                    .slideDown(300);
            });
            $(".header_nav_menu_sub").mouseover(function() {
                $(".header_nav_menu_sub").stop();
            });
            $(".header_nav_menu2").mouseout(function() {
                $(".header_nav_menu_sub").slideUp(300);
            });
            $(".on").mouseout(function() {
                $(".header_nav_menu_sub").slideUp(300);
            });
        });
    };

    handleChange = (name) => (event) => {
        this.setState({
            [name]: event.target.value,
        });
    };

    writeButton = () => {
        var url = config.serverpoint + "/mail";
        var pattern1 = /[@]/;
        var pattern2 = /[.]/;

        // console.log("보낼 url = " + url);
        // console.log("보낼 이름 = " + this.state.user_name);
        // console.log("보낼 이메일 = " + this.state.email);
        // console.log("보낼 제목 = " + this.state.mail_title);
        // console.log("보낼 내용 = " + this.state.mail_contents);

        if (!this.state.user_name) {
            alert("이름을 입력하세요");
            return;
        } else if (!this.state.email) {
            alert("메일 주소를 입력하세요");
            return;
        } else if (!this.state.mail_title) {
            alert("문의 제목을 입력하세요");
            return;
        } else if (!this.state.mail_contents) {
            alert("문의 내용을 입력하세요");
            return;
        } else if (!pattern1.test(this.state.email) || !pattern2.test(this.state.email)) {
            alert("올바른 메일 주소를 입력해주세요. ex)abcd@abcd.com");
            return;
        } else {
            axios
                .post(url, {
                    user_name: this.state.user_name,
                    email: this.state.email,
                    mail_title: this.state.mail_title,
                    mail_contents: this.state.mail_contents,
                })
                .then(function(response) {
                    // console.log("response = " + response);
                    alert("문의 완료");
                    history.push("/main");
                })
                .catch((response) => {
                    // console.log("response =" + response);
                });
        }
    };

    _getData = async () => {
        this.setState({
            fetching: true, // requesting..
        });

        var urlstring = config.serverpoint + "/bookmark/hong";

        await axios
            .get(urlstring)
            .then((response) => {
                this.state.rows = response.data;

                // console.log(this.state.rows);

                this.setState({
                    fetching: false, // done!
                });
            }) // SUCCESS
            .catch((response) => {
                // console.log(response);
            }); // ERROR
    };

    render() {
        const { classes } = this.props;
        const { rows, rowsPerPage, page } = this.state;
        return (
            <div>
                <header className="header_common">
                    <div class="layout_inner">
                        <h1 class="header_top_logo">
                            <a href="/">
                                <img src={require("../assets/images/header_logo_uniq.png")} alt="Cloudit" />
                            </a>
                        </h1>
                        <nav class="header_nav">
                            <ul class="header_nav_menu">
                                <li class="on">
                                    <a href="../src/guide.html">이용안내</a>
                                    <div class="header_nav_menu_sub js_nav_menu">
                                        <a href="../src/guide.html">개요</a>
                                        {/* <a href="../src/data_file.html">API 사용 가이드</a>
                          <a href="../src/data_recommend.html">FILE 다운로드 가이드</a> */}
                                    </div>
                                </li>

                                <li class="header_nav_menu2">
                                    <a href="../src/data.html">오픈데이터</a>
                                    <div class="header_nav_menu_sub js_nav_menu">
                                        <a href="../src/data_oda.html">오픈데이터 API</a>
                                        <a href="../src/data_file.html">파일데이터</a>
                                        <a href="../src/data_recommend.html">추천 데이터</a>
                                    </div>
                                </li>

                                <li class="header_nav_menu2">
                                    <a href="/notice">정보공유</a>
                                    <div class="header_nav_menu_sub js_nav_menu">
                                        <a href="/notice">공지사항</a>
                                        <a href="/board">자유게시판</a>
                                        <a href="/request">API 요청 게시판</a>
                                    </div>
                                </li>
                                {sessionStorage.getItem("user") && (
                                    <li class="header_nav_menu2">
                                        <a href="../src/mypage.html">마이페이지</a>
                                        <div class="header_nav_menu_sub js_nav_menu">
                                            <a href="../src/mypage.html">나의 오픈 API</a>
                                            <a href="../src/mypage_history.html">나의 사용이력</a>
                                            <a href="../src/mypage_favorites.html">즐겨찾기</a>
                                        </div>
                                    </li>
                                )}
                            </ul>

                            <div class="header_top_user">{session_nav()}</div>
                        </nav>
                    </div>
                </header>

                <div style={{ marginTop: "80px" }}>
                    <section class="sub_nav" style={{ marginBottom: "0px" }}>
                        <h2>문의하기</h2>
                    </section>
                </div>

                <main className="main_sub">
                    <div className="layout_inner layout_clearfix">
                        <div class="layout_sub_side">
                            <h2>문의하기</h2>
                            <div className="sub_nav_menu">
                                무엇이든 물어보세요.
                                <br />
                                친절하고 정확하게 답변드리겠습니다.
                            </div>
                        </div>

                        <div class="layout_sub_cont">
                            <table class="tb_board_write">
                                <tr>
                                    <th>이름</th>
                                    <td>
                                        <input
                                            type="text"
                                            id=""
                                            placeholder="이름을 입력해 주세요"
                                            className={classes.textField}
                                            value={this.state.name}
                                            onChange={this.handleChange("user_name")}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>이메일</th>
                                    <td>
                                        <input
                                            type="text"
                                            id=""
                                            placeholder="답변받을 이메일을 입력해 주세요 ex) smartocean@gmail.com"
                                            className={classes.textField}
                                            value={this.state.name}
                                            onChange={this.handleChange("email")}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>제목</th>
                                    <td>
                                        <input
                                            type="text"
                                            id=""
                                            placeholder="제목을 입력해 주세요"
                                            className={classes.textField}
                                            value={this.state.name}
                                            onChange={this.handleChange("mail_title")}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>내용</th>
                                    <td>
                                        <div className="cont_board_textarea">
                                            <textarea
                                                type="text"
                                                id=""
                                                placeholder="문의 내용을 입력해 주세요"
                                                className={classes.textField}
                                                value={this.state.name}
                                                onChange={this.handleChange("mail_contents")}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <div class="cont_data_btns">
                                <button type="submit" class="btn_btm_submit" onClick={this.writeButton}>
                                    문의하기
                                </button>
                                <button type="button" class="btn_btm_cancel" onClick={this.handleReturnCardList}>
                                    취소
                                </button>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="footer_common">
                    <div className="footer_cont">
                        <div className="layout_inner layout_clearfix">
                            <div className="footer_cont_logo">
                                <a href="http://www.msit.go.kr" target="_blank">
                                    <img src={require("../assets/images/logo4.png")} alt="산업통상자원부" />
                                </a>
                            </div>
                            <div className="footer_cont_logo">
                                <a href="https://www.innogrid.com/" target="_blank">
                                    <img src={require("../assets/images/footer_logo_inno.png")} alt="이노그리드" />
                                </a>
                            </div>
                            <div className="footer_cont_menu">
                                <a href="/src/clause.html">이용약관</a>
                                <a href="/src/privacy.html">개인정보처리방침</a>
                                <a href="/src/mail.html">문의사항</a>
                            </div>
                        </div>
                    </div>
                    {}
                    <div className="footer_address">
                        <div className="layout_inner layout_clearfix">
                            <div className="footer_address_company">
                                <p className="footer_address_company_address">
                                    우편번호: 06633 <br />
                                    주소: 서울시 서초구 서초대로 314, 10층(서초동, 정보통신공제조합빌딩)
                                </p>
                                <p>Tel : 02. 516. 5990 Fax : 02. 516. 5997 E-MAIL : help@cloud.or.kr.</p>
                            </div>
                            <p className="footer_address_copyright">COPYRIGHT 2021 innogrid. All right reserved.</p>
                        </div>
                        {}
                    </div>
                    {}
                </footer>
            </div>
        );
    }
}
export default withStyles(styles)(mail);
