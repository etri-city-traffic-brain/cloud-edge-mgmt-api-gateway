import React from "react";

import axios from "axios";
import classNames from "classnames";

import { withStyles } from "@material-ui/core/styles";
import history from "../js/history.js";
import TextField from "@material-ui/core/TextField";
import Clock from "./clock";
import MenuItem from "@material-ui/core/MenuItem";
import CardList from "../view/templates/temp_cardList";
import Sub_file_carddetail from "../view/templates/temp_sub_file_carddetail";

import CustomPaginationActionsTable from "./main_templates/coupon_table.jsx";
import { Divider } from "@material-ui/core";

import normalize from "../assets/css/normalize.css";
import font from "../assets/css/font.css";
import swiper_min from "../assets/css/swiper.min.css";

//import stylesheet from 'https://fonts.googleapis.com/css?family=Montserrat:600,700';
import styles from "../assets/css/style.css";

import Sub_mypage from "../view/templates/temp_view_mypage";

//import style_bak from '../assets/css/style_bak.css';
import { CopyToClipboard } from "react-copy-to-clipboard";
import config from "../js/config";
import Swiper from "react-id-swiper";

import Sub_view_mypage from "../view/templates/temp_search_view_mypage";

import session_nav from "./layout/session_nav";
import { Checkbox, CheckboxGroup } from "react-checkbox-group";

import { findDOMNode } from "react-dom";
import $ from "jquery";
window.$ = $;

var myrows = [];
var logger = (function() {
    var oldConsoleLog = null;
    var pub = {};
    pub.enableLogger = function enableLogger() {
        if (oldConsoleLog == null) return;
        window["console"]["log"] = oldConsoleLog;
    };
    pub.disableLogger = function disableLogger() {
        oldConsoleLog = console.log;
        window["console"]["log"] = function() {};
    };
    return pub;
})();

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

class view_mypage extends React.Component {
    state = {
        name: "Cat in the Hat",
        age: 0,
        multiline: "Controlled",
        currency: "NULL",
        page: 0,
        rowsPerPage: 10,
        pagemax: 0,
        rows: myrows,
        pagemap: null,
        startpage: 0,
        endpage: 0,
        isHovering: false,
    };

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleClickTabTypes = this.handleClickTabTypes.bind(this);

        this.handleClickTabClose = this.handleClickTabClose.bind(this);

        this.child = React.createRef();
        this.state.age = 1000;
        this.state.textFieldValue_value = 1000;
        this.state.rowsPerPage = 10;
        this.state.page = 0;
        this.state.pagemap = new Array();
        this.state.startpage = 0;
        this.state.endpage = 0;

        this.state.openapi_no = 0;

        this.state.TabTypes = 0;
        this.state.SetTypes = 0;

        this.handleMouseHover = this.handleMouseHover.bind(this);
        // this.state={
        //   isHovering: false,
        // }
    }
    handleMouseHover() {
        this.setState(this.toggleHoverState);
    }

    toggleHoverState(state) {
        return {
            isHovering: !state.isHovering,
        };
    }

    setstates = async () => {
        this.setState({
            TabTypes: 1,
        });
    };

    handleClickTabClose() {
        // console.log("1123123");
        this.setState({
            TabTypes: 0,
            openapi_no: "",
        });
    }

    handleClickTabTypes = (openapi_no) => {
        // console.log("openapi_no " + openapi_no)
        this.setstates();
        this.state.openapi_no = openapi_no;
    };

    setTypestate = async () => {
        this.setState({
            SetTypes: 1,
        });
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

    search = () => {
        var urlParams = new URLSearchParams(window.location.search);

        var searchWord = urlParams.get("name");

        // console.log("aaa searchWord = " + this.state.word);
        // console.log("aaa : " + this.state.SetTypes);

        // this.setTypestate();
        this.state.word = searchWord;
        if (!!document.getElementById("search_keyword")) {
            document.getElementById("search_keyword").value = searchWord;
        }
    };

    onClickButton = async () => {
        this.props.history.push({
            search: "?name=" + document.getElementById("search_keyword").value,
        });
        // console.log("aaab => : " + this.state.SetTypes);
        // window.location.reload();
        this.setTypestate();
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

        var urlstring = config.serverpoint + "/usermypage/" + sessionStorage.getItem("user");

        // console.log('information id : ' + urlstring);

        await axios
            .get(urlstring)
            .then((response) => {
                this.state.rows = response.data;

                console.log("information key = " + this.state.rows[0].key);
                logger.disableLogger();

                // console.log('information data length = ' + response.data.length);
                // console.log('information data rowsperpage = ' + this.state.rowsPerPage);
                this.state.pagemax = Math.ceil(response.data.length / this.state.rowsPerPage);
                // console.log('information page = ' + this.state.pagemax);
                this.state.endpage = (Math.floor(parseInt(this.state.page / 10)) + 1) * 10;
                for (var i = 0; i < this.state.pagemax; i++) {
                    this.state.pagemap.push(i);
                }

                this.setState({
                    fetching: false, // done!
                });
            }) // SUCCESS
            .catch((response) => {
                // console.log(response);
            }); // ERROR

        var urlstring = config.serverpoint + "/usermypage/developer/" + sessionStorage.getItem("user");

        // console.log('information id : ' + urlstring);

        await axios
            .get(urlstring)
            .then((response) => {
                this.state.rows2 = response.data;

                // console.log('information key = ' + this.state.rows2[0].auth_key);

                this.setState({
                    fetchings: false, // done!
                });
            }) // SUCCESS
            .catch((response) => {
                // console.log(response);
            }); // ERROR

        var word = this.state.word;

        if (word !== "null") {
            var urlstring2 = config.serverpoint + "/search/myopenapilist/" + sessionStorage.getItem("user") + "?name=" + word;

            // console.log('url: ' + urlstring2);

            await axios
                .get(urlstring2)
                .then((response) => {
                    this.state.rows4 = response.data;

                    this.setState({
                        fetching4: false, // done!
                    });
                }) // SUCCESS
                .catch((response) => {
                    // console.log(response);
                }); // ERROR
        }
    };

    toggleChange = () => {
        this.setState({
            isChecked: !this.state.isChecked,
        });
        // console.log('checked = ' + this.state.isChecked)
    };

    bookChecked = (bookchecks) => {
        this.setState({
            bookcheck: bookchecks,
        });
    };

    checkDelete = async () => {
        // console.log('checkcheck = ' + this.state.bookcheck);

        var on = this.state.bookcheck;

        var url = config.serverpoint + "/api/request/" + on + "/" + sessionStorage.getItem("user");

        axios
            .delete(url, {
                openapi_no: this.state.bookcheck,
                user_id: sessionStorage.getItem("user"),
            })
            .then((response) => {
                this.state.rows3 = response.data[0];

                // console.log('openapi_no = ' + this.state.bookcheck);

                this.setState({
                    fetching: false,
                });
                // console.log("삭제 " )
                alert("해지가 완료되었습니다.");
                window.location.reload();
            })
            .catch((response) => {
                // console.log('res = ' + response);
            });
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
            this.state.startpage = (Math.floor(parseInt(this.state.page / 10)) + 1) * 10 - 10;
            this.state.endpage = (Math.floor(parseInt(this.state.page / 10)) + 1) * 10;

            this.state.page = this.state.startpage;
        }
    };

    enterCheck = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            e.stopPropagation();
            this.onClickButton();
        }
    };

    handleNextButtonClick = (event) => {
        if (this.state.endpage < this.state.pagemax) {
            this.state.page += 10;
            this.state.page = parseInt(this.state.page / this.state.rowsPerPage) * this.state.rowsPerPage + 1;

            this.state.startpage = (Math.floor(parseInt(this.state.page / 10)) + 1) * 10 - 10;
            this.state.endpage = (Math.floor(parseInt(this.state.page / 10)) + 1) * 10;

            this.state.page = this.state.startpage;
        }
    };

    handleLastPageButtonClick = (event) => {};

    handleChangePage = (event, page) => {};

    handleChangeRowsPerPage = (event) => {};

    handleCursorClick = (event, pagenum) => {
        // console.log(pagenum);
    };

    render() {
        if (sessionStorage.getItem("user")) {
            // console.log(":test:" + sessionStorage.getItem("user"));
        } else {
            history.push("/login");
        }

        const { classes } = this.props;
        const { rows, rows4, rowsPerPage, page } = this.state;

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
                                <a href="/src/mypage.html" className="on2">
                                    나의 오픈 API
                                </a>
                                <a href="/src/mypage_history.html">나의 사용이력</a>
                                <a href="/src/mypage_favorites.html">즐겨찾기</a>
                                {/* <h2>SmartOcean</h2>
                                <a href={"http://182.252.131.176:3000/"} target='_blank'>바로가기</a> */}
                            </div>
                        </div>
                        {}

                        {this.state.TabTypes == 0 && (
                            <div className="layout_sub_cont">
                                {this.state.fetching == true && (
                                    <div class="cont_msg">
                                        <div className="cont_msg_inner">
                                            <span class="ico_notice">등록된 Open API가 없습니다. Open API를 신청해주세요.</span>
                                        </div>
                                    </div>
                                )}
                                <div className="cont_mypage_tableHeader layout_clearfix">
                                    <form method>
                                        <div className="cont_mypage_tableHeader_search">
                                            <div className="cont_mypage_tableHeader_search_input">
                                                {this.state.fetching == false && this.state.SetTypes == 0 && (
                                                    <input type="text" id="search_keyword" onKeyDown={this.enterCheck} />
                                                )}

                                                {this.search()}

                                                {this.state.fetching == false && this.state.SetTypes == 0 && (
                                                    <button type="button" id onClick={() => this.onClickButton()} className>
                                                        <span>Search</span>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                {this.state.fetching == false && this.state.SetTypes == 0 && (
                                    <div className="cont_data_search">
                                        <div className="cont_data_search_form_key">
                                            <div className="tit">나의 인증키</div>

                                            <div onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseHover}>
                                                {this.state.isHovering == false && (
                                                    <div className="tits">마우스를 올려 인증키를 확인하세요</div>
                                                )}
                                                {this.state.isHovering && (
                                                    <div className="tits">
                                                        {this.state.fetchings == false && this.state.rows2[0].auth_key}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {}
                                    </div>
                                )}
                                {}
                                {/* <div className="cont_mypage_tableHeader layout_clearfix">
              <form method>
                <div className="cont_mypage_tableHeader_search">
                  
                  <div className="cont_mypage_tableHeader_search_input">
                    <input type="text" id="search_keyword" onKeyDown={this.enterCheck} />
                    {this.search()}
                    <button type="button" id onClick={() => this.onClickButton()} className>
                      <span>Search</span>
                    </button>
                  </div>
                </div>
              </form>
            </div> */}
                                {this.state.fetching == false && this.state.SetTypes == 0 && (
                                    <table className="tb_mypage_list">
                                        <thead>
                                            <tr>
                                                <th>선택</th>

                                                <th>오픈 데이터 API 이름</th>
                                                <th>활용 유형</th>
                                                <th>예제</th>
                                                <th>키워드</th>
                                                <th>오픈 데이터 제공처</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {this.state.fetching == false &&
                                                rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                                    return (
                                                        <tr>
                                                            <td>
                                                                <CheckboxGroup
                                                                    type="checkbox"
                                                                    //  checked={this.state.isChecked}
                                                                    //  onChange={this.toggleChange}
                                                                    value={this.state.bookcheck}
                                                                    onChange={this.bookChecked}
                                                                >
                                                                    <Checkbox
                                                                        id={"checkid"}
                                                                        value={"bookdelete" + row.openapi_no + "bookdelete"}
                                                                    />
                                                                </CheckboxGroup>
                                                            </td>
                                                            {this.state.fetching == false && (
                                                                // <td onClick={this.handleClickTabTypes} value={row.openapi_no}>
                                                                <td
                                                                    id={row.openapi_no}
                                                                    onClick={() => this.handleClickTabTypes(row.openapi_no)}
                                                                >
                                                                    {row.name}
                                                                </td>
                                                            )}
                                                            <td>{row.activity_type}</td>
                                                            <td>
                                                                <div className="cont_mypage_detail_code">
                                                                    <CopyToClipboard
                                                                        text={row.code}
                                                                        onCopy={() => this.setState({ copied: true })}
                                                                    >
                                                                        <button type="button" className="btn_mypage_list_code js_code_btn">
                                                                            code
                                                                        </button>
                                                                    </CopyToClipboard>

                                                                    <div className="pop_code">
                                                                        {row.code.split("\n").map((line) => {
                                                                            return (
                                                                                <span>
                                                                                    {line}
                                                                                    <br />
                                                                                </span>
                                                                            );
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td> {row.keyword}</td>
                                                            <td>{row.provider}</td>
                                                        </tr>
                                                    );
                                                })}
                                        </tbody>
                                    </table>
                                )}

                                {this.state.fetching4 == false && this.state.SetTypes == 1 && <Sub_view_mypage word={this.state.word} />}

                                {this.state.fetching == false && this.state.SetTypes == 0 && (
                                    <>
                                        <div className="cont_mypage_btns">
                                            <div className="cont_mypage_btns_inner">
                                                <button type="button" className="btn_btm_cancel" onClick={this.checkDelete}>
                                                    Open API 활용 해지
                                                </button>
                                            </div>
                                        </div>
                                        <div className="cont_board_pagenation">
                                            <a href="#" className="cont_board_pagenation_btn prev" onClick={this.handleBackButtonClick}></a>
                                            {this.state.pagemap.slice(this.state.startpage, this.state.endpage).map((row, index) => {
                                                return (
                                                    <Clickable
                                                        id={index + this.state.startpage}
                                                        onClick={this.handleClick}
                                                        text={index + this.state.startpage + 1}
                                                    />
                                                );
                                            })}
                                            <a href="#" className="cont_board_pagenation_btn next" onClick={this.handleNextButtonClick}></a>
                                        </div>
                                    </>
                                )}

                                {}
                            </div>
                        )}
                        {this.state.TabTypes == 1 && (
                            <Sub_mypage
                                openapi_no={this.state.openapi_no}
                                returnPopupOpen={this.handlePopupOpen}
                                returnTabClose={this.handleClickTabClose}
                            />
                        )}
                        {}
                    </div>
                    {}
                </main>
            </div>
        );
    }
}
export default withStyles(styles)(view_mypage);
