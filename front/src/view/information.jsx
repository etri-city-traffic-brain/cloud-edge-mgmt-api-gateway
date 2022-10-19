import React from "react";

import axios from "axios";
import classNames from "classnames";

import { withStyles } from "@material-ui/core/styles";
import history from "../js/history.js";
import TextField from "@material-ui/core/TextField";
import Clock from "./clock";
import MenuItem from "@material-ui/core/MenuItem";

import informationList from "../view/templates/temp_information";
import Sub_file_carddetail from "../view/templates/temp_sub_file_carddetail";
import Sub_Oda_carddetail from "../view/templates/temp_sub_Oda_carddetail";

import CustomPaginationActionsTable from "./main_templates/coupon_table.jsx";
import { Divider } from "@material-ui/core";

import normalize from "../assets/css/normalize.css";
import font from "../assets/css/font.css";
import swiper_min from "../assets/css/swiper.min.css";

import styles from "../assets/css/style.css";

import config from "../js/config.js";

import session_nav from "./layout/session_nav";

import { findDOMNode } from "react-dom";
import $ from "jquery";
window.$ = $;
class information extends React.Component {
    state = {
        name: "Cat in the Hat",
        age: 0,
        multiline: "Controlled",
        currency: "NULL",
        word: "NULL",
        category: "NULL",
        value: "cate",
    };

    constructor(...props) {
        super(...props);

        this.handleClickTabTypes = this.handleClickTabTypes.bind(this);
        this.handleClickTabClose = this.handleClickTabClose.bind(this);

        this.handlePopupOpen = this.handlePopupOpen.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePopupCancle = this.handlePopupCancle.bind(this);
        this.handlePopupAccept = this.handlePopupAccept.bind(this);

        this.state = { date: new Date() };
        this.child = React.createRef();
        this.state.age = 1000;
        this.state.textFieldValue_value = 1000;
        this.state.bookmark_name = "";

        this.state.TabTypes = 0;

        this.state.openapi_no = null;

        this.state.popupType = 0;

        this.state.word = null;

        this.state.category = this.props.category;

        this.state.dataType = this.props.dataType;
    }

    search = (event) => {
        var urlParams = new URLSearchParams(window.location.search);

        var searchWord = urlParams.get("name");
        var category = urlParams.get("category");

        // console.log("aaa searchWord = " + searchWord);

        this.state.word = searchWord;
        this.state.category = category;

        if (!!document.getElementById("search_keyword")) {
            document.getElementById("search_keyword").value = searchWord;
        }
    };

    enterCheck = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            e.stopPropagation();
            this.onClickButton();
        }
    };

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

    categorys = () => {
        var urlParams = new URLSearchParams(window.location.search);

        var categoryWord = urlParams.get("category");

        // console.log("aaa categoryWord = " + categoryWord);

        this.state.category = categoryWord;
    };

    handleCategory = (event) => {
        // console.log("cate1 = " + event.target.value);
        this.setState({ values: event.target.value });
    };

    onClickButton = (event) => {
        if (this.state.dataType == "data" && this.state.values == this.state.values) {
            this.props.history.push({
                pathname: "/src/data.html",
                search: "?name=" + document.getElementById("search_keyword").value + "&category=" + this.state.values,
            });
            // console.log("검색 : " + this.state.values);
            window.location.reload();
        } else if (this.state.dataType == "data_oda" && this.state.values == this.state.values) {
            this.props.history.push({
                pathname: "/src/data_oda.html",
                search: "?name=" + document.getElementById("search_keyword").value + "&category=" + this.state.values,
            });

            window.location.reload();
        } else if (this.state.dataType == "data_file" && this.state.values == this.state.values) {
            this.props.history.push({
                pathname: "/src/data_file.html",
                search: "?name=" + document.getElementById("search_keyword").value + "&category=" + this.state.values,
            });

            window.location.reload();
        } else if (this.state.dataType == "data_recommend" && this.state.values == this.state.values) {
            this.props.history.push({
                pathname: "/src/data_recommend.html",
                search: "?name=" + document.getElementById("search_keyword").value + "&category=" + this.state.values,
            });

            window.location.reload();
        }
    };

    handleReady() {
        alert("준비중 입니다.");
    }

    componentDidMount = () => {
        this._getData();
    };

    handleChange(event) {
        // console.log(event.target.value);
    }

    handleClickTabTypes(types, activity_type) {
        // console.log(types + "/ " + activity_type);
        if (activity_type == "download") {
            this.setState({
                TabTypes: 1,
                openapi_no: types,
            });
        } else {
            this.setState({
                TabTypes: 2,
                openapi_no: types,
            });
        }
    }

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

    handlePopupOpen() {
        this.setState({
            popupType: 1,
            bookmark_name: "",
        });
    }

    handleClickTabClose() {
        // console.log("1123123");
        this.setState({
            TabTypes: 0,
            openapi_no: "",
        });
    }

    handlePopupCancle() {
        // console.log("Cancle");
        this.setState({ popupType: 0 });
    }

    handleChange(event) {
        this.setState({
            openapi_no: event.target.value,
        });
    }

    handlePopupAccept(event) {
        // console.log("handlePopupAccept");
        var id = "song";
        var openapi_no = this.state.openapi_no;
        var urlstring = config.serverpoint + "/bookmark/" + id + "/" + openapi_no;

        // console.log(urlstring);
        axios
            .post(urlstring, {
                openapi_no: this.state.openapi_no,
            })
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

        this.setState({ popupType: 0 });
    }

    _handleTextFieldChange_item_type = (e) => {
        this.setState({
            textFieldValue_item_type: e.target.value,
            currency: e.target.value,
        });
        //console.log(e.target.value);
    };

    _handleTextFieldChange_value = (e) => {
        this.setState({
            textFieldValue_value: e.target.value,
            age: e.target.value,
        });
        //console.log(this.state.textFieldValue_value);
    };

    _handleTextFieldChange_message = (e) => {
        this.setState({
            textFieldValue_message: e.target.value,
        });
        //console.log(this.state.textFieldValue_message);
    };

    _handleTextFieldChange_received_type = (e) => {
        this.setState({
            textFieldValue_received_type: e.target.value,
        });
        //console.log(this.state.textFieldValue_received_type);
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <header className="header_common">
                    <div className="layout_inner">
                        <div className="header_top layout_clearfix">
                            <h1 className="header_top_logo">
                                <a href="/">
                                    <img src={require("../assets/images/header_logo_uniq.png")} alt="Cloudit" />
                                </a>
                            </h1>
                            {session_nav()}
                        </div>
                    </div>
                    <nav className="header_nav">
                        <div className="layout_inner layout_clearfix">
                            <button type="button" onClick={this.handleToggle} class="header_nav_btn js_arr_toggle js_nav_btn">
                                전체메뉴
                            </button>
                            <ul className="header_nav_menu">
                                <li class="header_nav_menu2">
                                    <a href="../src/guide.html">이용안내</a>
                                    <div class="header_nav_menu_sub js_nav_menu">
                                        <a href="../src/guide.html">개요</a>
                                        {/* <a href="../src/data_file.html">API 사용 가이드</a>
                          <a href="../src/data_recommend.html">FILE 다운로드 가이드</a> */}
                                    </div>
                                </li>
                                <li>
                                    <a href="../src/data.html">오픈데이터</a>
                                    <div className="header_nav_menu_sub js_nav_menu " ref="toggle">
                                        <a href="../src/data_oda.html">오픈데이터 API</a>
                                        <a href="../src/data_file.html">파일데이터</a>
                                        <a href="../src/data_recommend.html">추천 데이터</a>
                                    </div>
                                </li>
                                <li>
                                    <a href="/notice">정보공유</a>
                                    <div className="header_nav_menu_sub js_nav_menu" ref="toggle2">
                                        <a href="/notice">공지사항</a>
                                        <a href="/board">자유게시판</a>
                                        <a href="/request">API 요청 게시판</a>
                                    </div>
                                </li>
                                {sessionStorage.getItem("user") && (
                                    <li>
                                        <a href="../src/mypage.html">마이페이지</a>
                                        <div className="header_nav_menu_sub js_nav_menu" ref="toggle3">
                                            <a href="../src/mypage.html">나의 오픈 API</a>
                                            <a href="../src/mypage_history.html">나의 사용이력</a>
                                            <a href="../src/mypage_favorites.html"> 즐겨찾기</a>
                                        </div>
                                    </li>
                                )}
                            </ul>
                        </div>
                        {}
                    </nav>
                </header>

                <div>
                    <section className="sub_nav" style={{ marginTop: "100px", marginBottom: "0px" }}>
                        <h2>정보공유</h2>
                        <div className="sub_nav_menu">
                            <a href="/notice" className="on">
                                공지사항
                            </a>
                            <a href="/board">자유게시판</a>
                            <a href="/request">API 요청 게시판</a>

                            {/* {this.state.dataType == "data_file" && <a href="/src/data_file.html" className="on">API 요청 게시판</a>} */}
                            {/* {this.state.dataType !== "data_file" && <a href="/src/data_file.html">API 요청 게시판</a>} */}
                        </div>
                    </section>
                </div>

                <main className="main_sub">
                    <div className="layout_inner layout_clearfix">
                        <div class="layout_sub_side">
                            <h2>정보공유</h2>
                            <div className="sub_nav_menu">
                                <a href="/notice">공지사항</a>
                                <a href="/board">자유게시판</a>
                                <a href="/request">API 요청 게시판</a>

                                {/* {this.state.dataType == "data_file" && <a href="/src/data_file.html" className="on">API 요청 게시판</a>} */}
                                {/* {this.state.dataType !== "data_file" && <a href="/src/data_file.html">API 요청 게시판</a>} */}
                            </div>
                        </div>
                        <div className="layout_sub_cont">
                            {this.state.TabTypes == 0 && (
                                <div>
                                    {this.categorys()}

                                    <informationList category={this.state.category} />
                                </div>
                            )}

                            {this.state.TabTypes == 1 && (
                                <informationList
                                    openapi_no={this.state.openapi_no}
                                    returnPopupOpen={this.handlePopupOpen}
                                    returnTabClose={this.handleClickTabClose}
                                />
                            )}
                            {this.state.TabTypes == 2 && (
                                <Sub_Oda_carddetail
                                    openapi_no={this.state.openapi_no}
                                    returnPopupOpen={this.handlePopupOpen}
                                    returnTabClose={this.handleClickTabClose}
                                />
                            )}
                        </div>
                        {}
                    </div>
                    {this.state.popupType == 1 && (
                        <div class="pop_common">
                            <h4 class="pop_tit">알림</h4>
                            <div class="pop_cont_wrap">
                                <div class="pop_cont">
                                    <div class="pop_cont_select">
                                        <p>선택된 openAPI를 보관할 분류를 선택해주세요.</p>
                                        <div>
                                            <select value={this.state.bookmark_name} onChange={this.handleChange}>
                                                {this.state.rows.map((row) => {
                                                    return <option value={row.bookmark_no}>{row.bookmark_name}</option>;
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="pop_btns">
                                    <button type="button" class="pop_btn_cancel" onClick={this.handlePopupCancle}>
                                        취소
                                    </button>
                                    <button type="submit" class="pop_btn_submit" onClick={this.handlePopupAccept}>
                                        확인
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
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
export default withStyles(styles)(information);
