import React from "react";

import axios from "axios";
import classNames from "classnames";

import { withStyles } from "@material-ui/core/styles";
import history from "../js/history.js";
import TextField from "@material-ui/core/TextField";
import Clock from "./clock";
import MenuItem from "@material-ui/core/MenuItem";
import CardList from "../view/templates/temp_mypage_favorites";
import Sub_file_carddetail from "../view/templates/temp_sub_file_carddetail";

import CustomPaginationActionsTable from "./main_templates/coupon_table.jsx";
import { Divider } from "@material-ui/core";

import normalize from "../assets/css/normalize.css";
import font from "../assets/css/font.css";
import swiper_min from "../assets/css/swiper.min.css";

//import stylesheet from 'https://fonts.googleapis.com/css?family=Montserrat:600,700';
import styles from "../assets/css/style.css";

//import style_bak from '../assets/css/style_bak.css';
import { CopyToClipboard } from "react-copy-to-clipboard";
import config from "../js/config";
import Swiper from "react-id-swiper";

import session_nav from "./layout/session_nav";

import { findDOMNode } from "react-dom";
import $ from "jquery";
window.$ = $;

var myrows = [];

var myrows2 = [];

myrows.sort((a, b) => (a.calories < b.calories ? -1 : 1));
const currencies = [
    {
        value: "NULL",
        label: "NULL",
    },
    {
        value: "RUBY",
        label: "RUBY",
    },
    {
        value: "ITEM",
        label: "ITEM",
    },
];

class Clickable extends React.Component {
    constructor(...props) {
        super(...props);
        this.handleClickChild = this.handleClickChild.bind(this);
    }

    handleClickChild() {
        this.props.onClick(this.props.id);
    }

    render() {
        return (
            <a href="#" onClick={this.handleClickChild}>
                {this.props.text}
            </a>
        );
    }
}

class view_mypage_favorites extends React.Component {
    state = {
        age: 0,
        multiline: "Controlled",
        currency: "NULL",
        page: 0,
        rowsPerPage: 10,
        pagemax: 0,
        rows: myrows,
        rows2: myrows2,
        // bookmark_name: 'NULL',
    };

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handlePopupOpen = this.handlePopupOpen.bind(this);
        this.handleDeletePopup = this.handleDeletePopup.bind(this);

        this.handleClickTabTypes = this.handleClickTabTypes.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePopupCancle = this.handlePopupCancle.bind(this);
        this.handleCardClick = this.handleCardClick.bind(this);

        // this.state.bookmark_no = 0;
        this.state.bookmark_no = this.state.bookmark_no;
        this.state.bookmark_name = this.state.bookmark_name;

        this.child = React.createRef();
        this.state.age = 1000;
        this.state.textFieldValue_value = 1000;
        this.state.TabTypes = 0;
        this.state.popupType = 0;
    }
    setstates = async () => {
        this.setState({
            TabTypes: ((this.state.TabTypes + 1) % 3) + 1,
        });
    };

    handleChange(event) {
        this.setState({
            bookmark_name: event.target.value,
        });
    }

    handleCardClick = (bookmark_no) => {
        // console.log('information TapTypes = ' + this.state.TabTypes)
        this.setstates();
        this.state.bookmark_no = bookmark_no;

        // console.log(bookmark_no);

        // console.log('information TapTypes = ' + this.state.TabTypes)
        // console.log('information bookmark_nono2 = ' + this.state.bookmark_no)
    };

    handleClickTabTypes(bookmark_no) {
        // console.log("information bookmark_no " + bookmark_no)

        //   if(bookmark_no == bookmark_no){

        //     this.setState(
        //       {
        //         TabTypes : 1,
        //         bookmark_no : bookmark_no,

        //       }
        //     );

        // }

        //this.state.TabTypes = 1;
        this.state.bookmark_no = bookmark_no;
    }

    handlePopupCancle() {
        // console.log("1123123");
        this.setState({
            popupType: 0,
            bookmark_no: "",
        });
    }

    handlePopupOpen() {
        this.setState({
            popupType: 1,
            bookmark_name: "",
        });
    }

    deletebookmark = () => {
        this.setState({
            popupType: 2,
        });
    };

    handleDeletePopup(bookmark_no) {
        this.deletebookmark();
        this.state.bookmark_no = bookmark_no;

        // console.log('보낼 삭제 = ' +  bookmark_no);
    }

    handleAddButton = async () => {
        // console.log("handlePopupAccept");
        var id = sessionStorage.getItem("user");
        var urlstring = config.serverpoint + "/bookmark/" + id;

        // console.log(urlstring);
        axios
            .post(urlstring, {
                bookmark_name: document.getElementById("favorites_text").value,
            })
            .then((response) => {
                this.state.rows5 = response.data;

                // console.log(this.state.rows5);

                this.setState({
                    fetchings: false, // done!
                });
                alert("분류함 생성 완료");
                window.location.reload();
            }) // SUCCESS
            .catch((response) => {
                // console.log(response);
            }); // ERROR

        this.setState({ popupType: 0 });
    };

    handleDeleteButton = async () => {
        // console.log("handlePopupAccept");
        var id = sessionStorage.getItem("user");
        var urlstring = config.serverpoint + "/bookmark/" + this.state.bookmark_no;

        // console.log('보낼 삭제2 = ' +   this.state.bookmark_no);
        axios
            .delete(urlstring, {
                bookmark_no: this.state.bookmark_no,
            })
            .then((response) => {
                this.state.rows6 = response.data;

                // console.log(this.state.rows6);

                this.setState({
                    fetching: false, // done!
                });
                alert("분류함 제거 완료");
                window.location.reload();
            }) // SUCCESS
            .catch((response) => {
                // console.log(response);
            }); // ERROR

        this.setState({ popupType: 0 });
    };

    handleReady() {
        alert("준비중 입니다.");
    }

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

    _getData = async () => {
        this.setState({
            fetching: true, // requesting..
        });

        var urlstring2 = config.serverpoint + "/bookmark/" + sessionStorage.getItem("user");

        await axios
            .get(urlstring2)
            .then((response) => {
                this.state.rows2 = response.data;
                this.state.bookmark_no = this.state.rows2[0].bookmark_no;
                // console.log('보낼' + this.state.rows2[0].bookmark_name);

                this.setState({
                    fetching: false, // done!
                });
            }) // SUCCESS
            .catch((response) => {
                // console.log(response);
            }); // ERROR
    };

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

    handleClick(v) {
        this.state.page = v;
    }

    handleFirstPageButtonClick = (event) => {};

    handleBackButtonClick = (event) => {
        if (this.state.page > 9) {
            this.state.page -= 9;
            this.state.page = parseInt(this.state.page / this.state.rowsPerPage) * this.state.rowsPerPage + 0;
        }
    };

    handleNextButtonClick = (event) => {
        this.state.page += 11;
        this.state.page = parseInt(this.state.page / this.state.rowsPerPage) * this.state.rowsPerPage + 1;
    };

    handleLastPageButtonClick = (event) => {};

    handleChangePage = (event, page) => {};

    handleChangeRowsPerPage = (event) => {};

    handleCursorClick = (event, pagenum) => {
        // console.log(pagenum);
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

    render() {
        if (sessionStorage.getItem("user")) {
            // console.log(":test:" + sessionStorage.getItem("user"));
        } else {
            history.push("/login");
        }

        const { classes } = this.props;
        const { rows, rows2, rowsPerPage, page } = this.state;

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
                                {/* <li class="header_nav_menu2">
                                    <a href="../src/guide.html">이용안내</a>
                                    <div class="header_nav_menu_sub js_nav_menu">
                                        <a href="../src/guide.html">개요</a>
                                        <a href="../src/data_file.html">API 사용 가이드</a>
                                        <a href="../src/data_recommend.html">FILE 다운로드 가이드</a>
                                    </div>
                                </li> */}

                                <li class="on">
                                    <a href="../src/data.html">오픈데이터</a>
                                    <div class="header_nav_menu_sub js_nav_menu">
                                        <a href="../src/data_oda.html">오픈데이터 API</a>
                                        <a href="../src/data_file.html">파일데이터</a>
                                        {/* <a href="../src/data_recommend.html">추천 데이터</a> */}
                                    </div>
                                </li>
                                {/* <li className="header_nav_menu2">
                                    <a href="/tool">데이터 툴</a>
                                    <div className="header_nav_menu_sub js_nav_menu">
                                        <a href="/tool">도구</a>
                                    </div>
                                </li>
                                <li class="header_nav_menu2">
                                    <a href="/notice">정보공유</a>
                                    <div class="header_nav_menu_sub js_nav_menu">
                                        <a href="/notice">공지사항</a>
                                        <a href="/board">자유게시판</a>
                                        <a href="/request">API 요청 게시판</a>
                                    </div>
                                </li> */}
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
                <main className="main_sub">
                    <div className="layout_inner layout_clearfix">
                        <div className="layout_sub_side">
                            <h2>데이터</h2>
                            <div className="sub_nav_menu">
                                {this.state.dataType === "data" && (
                                    <a href="/src/data.html" class="on2">
                                        전체
                                    </a>
                                )}
                                {this.state.dataType !== "data" && <a href="/src/data.html">전체</a>}

                                {this.state.dataType === "data_oda" && (
                                    <a href="/src/data_oda.html" class="on2">
                                        오픈데이터 API
                                    </a>
                                )}
                                {this.state.dataType !== "data_oda" && <a href="/src/data_oda.html">오픈데이터 API</a>}

                                {this.state.dataType === "data_file" && (
                                    <a href="/src/data_file.html" class="on2">
                                        파일데이터
                                    </a>
                                )}
                                {this.state.dataType !== "data_file" && <a href="/src/data_file.html">파일데이터</a>}

                                {/* {this.state.dataType === "data_recommend" && (
                                    <a href="/src/data_recommend.html" class="on2">
                                        추천 데이터
                                    </a>
                                )}
                                {this.state.dataType !== "data_recommend" && <a href="/src/data_recommend.html">추천 데이터</a>}
                                {(this.state.dataType === "data_recommend" ||
                                    this.state.dataType === "data_recommend_bigdata" ||
                                    this.state.dataType === "data_recommend_history") && (
                                    <div className="sub_nav_favorites">
                                        <ul className="sub_nav_favorites_menu">
                                            <li>
                                                <a
                                                    href="/src/data_recommend.html"
                                                    className={this.state.dataType === "data_recommend" && "on2"}
                                                    style={{ padding: "2px" }}
                                                >
                                                    인기 오픈데이터 추천
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="/src/data_recommend_bigdata.html"
                                                    className={this.state.dataType === "data_recommend_bigdata" && "on2"}
                                                    style={{ padding: "2px" }}
                                                >
                                                    빅데이터 분석 추천
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="/src/data_recommend_history.html"
                                                    className={this.state.dataType === "data_recommend_history" && "on2"}
                                                    style={{ padding: "2px" }}
                                                >
                                                    사용량 기반 추천
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                                <h2>데이터 툴</h2>
                                <a href="/tool">도구</a> */}
                                <h2>마이페이지</h2>
                                <a href="/src/mypage.html">나의 오픈 API</a>
                                <a href="/src/mypage_history.html">나의 사용이력</a>
                                <a href="/src/mypage_favorites.html" className="on2">
                                    즐겨찾기
                                </a>
                                {/*<h2>SmartOcean</h2>*/}
                                {/*<a href={"http://182.252.131.176:3000/"} target='_blank'>바로가기</a>*/}
                            </div>
                            <div class="sub_nav_favorites">
                                <button type="button" class="sub_nav_favorites_add" onClick={this.handlePopupOpen}>
                                    <span>Add</span>
                                </button>

                                <ul class="sub_nav_favorites_menu">
                                    {this.state.fetching == false &&
                                        rows2
                                            // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row) => {
                                                return (
                                                    <li id={row.bookmark_no} onClick={() => this.handleCardClick(row.bookmark_no)}>
                                                        {" "}
                                                        {row.bookmark_name}
                                                        <button
                                                            id="delete_button"
                                                            value={row.bookmark_no}
                                                            type="button"
                                                            class="sub_nav_favorites_delete"
                                                            onClick={() => this.handleDeletePopup(row.bookmark_no)}
                                                        >
                                                            <span>Delete</span>
                                                        </button>
                                                    </li>
                                                );
                                            })}
                                </ul>
                            </div>
                        </div>

                        <div>
                            {this.state.bookmark_no == this.state.bookmark_no && this.state.fetching == false && this.state.TabTypes == 0 && (
                                <>
                                    <div>{this.state.bookmark_name}</div>
                                    <CardList
                                        bookmark_no={this.state.bookmark_no}
                                        bookmark_name={this.state.bookmark_name}
                                        returnPopupOpen={this.handlePopupOpen}
                                        returnTabClose={this.handlePopupCancle}
                                        TabTypes={this.state.TabTypes}
                                    />
                                </>
                            )}
                            {this.state.fetching == false && this.state.TabTypes == 1 && (
                                <CardList
                                    bookmark_no={this.state.bookmark_no}
                                    bookmark_name={this.state.bookmark_name}
                                    returnPopupOpen={this.handlePopupOpen}
                                    returnTabClose={this.handlePopupCancle}
                                    TabTypes={this.state.TabTypes}
                                />
                            )}
                            {this.state.fetching == false && this.state.TabTypes == 2 && (
                                <CardList
                                    bookmark_no={this.state.bookmark_no}
                                    bookmark_name={this.state.bookmark_name}
                                    returnPopupOpen={this.handlePopupOpen}
                                    returnTabClose={this.handlePopupCancle}
                                    TabTypes={this.state.TabTypes}
                                />
                            )}
                            {this.state.fetching == false && this.state.TabTypes == 3 && (
                                <CardList
                                    bookmark_no={this.state.bookmark_no}
                                    bookmark_name={this.state.bookmark_name}
                                    returnPopupOpen={this.handlePopupOpen}
                                    returnTabClose={this.handlePopupCancle}
                                    TabTypes={this.state.TabTypes}
                                />
                            )}
                        </div>
                        {}
                        {this.state.fetching == true && (
                            <div className="layout_sub_cont">
                                {}

                                <div className="cont_msg">
                                    {this.state.bookmark_no == null && (
                                        <>
                                            <div className="cont_msg_inner">
                                                <span class="ico_notice">좌측 + 버튼을 통해 분류함을 만들어주세요</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                                {}
                            </div>
                        )}
                        {}
                    </div>
                    {}
                    {this.state.popupType == 1 && (
                        <div class="pop_common">
                            <h4 class="pop_tit">알림</h4>
                            <div class="pop_cont_wrap">
                                <div class="pop_cont">
                                    <div class="pop_cont_select">
                                        <p>분류함 이름을 작성해주세요</p>
                                        {/* <div>
                                <select value={this.state.bookmark_name} onChange={this.handleChange}>
                                    {this.state.rows
                                        .map(row => 
                                        {
                                            return (                                                                              
                                            <option value={row.bookmark_no}>{row.bookmark_name}</option>
                                            );
                                        })
                                    }

                                    
                                </select>
                            </div> */}
                                        <textarea
                                            type="text"
                                            id="favorites_text"
                                            placeholder="분류함 이름을 작성해주세요"
                                            value={this.state.name}
                                        />
                                    </div>
                                </div>
                                <div class="pop_btns">
                                    <button type="submit" class="pop_btn_submit" onClick={this.handleAddButton}>
                                        확인
                                    </button>
                                    <button type="button" class="pop_btn_cancel" onClick={this.handlePopupCancle}>
                                        취소
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {this.state.popupType == 2 && (
                        <div class="pop_common">
                            <h4 class="pop_tit">알림</h4>
                            <div class="pop_cont_wrap">
                                <div class="pop_cont">
                                    <div class="pop_cont_select">
                                        <p>삭제하시겠습니까?</p>
                                    </div>
                                </div>
                                <div class="pop_btns">
                                    <button type="submit" class="pop_btn_submit" onClick={this.handleDeleteButton}>
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
            </div>
        );
    }
}
export default withStyles(styles)(view_mypage_favorites);
