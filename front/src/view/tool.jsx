import React from "react";

import axios from "axios";
import classNames from "classnames";

// reactstrap components
import { DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown, NavLink } from "reactstrap";

import { withStyles } from "@material-ui/core/styles";
import history from "../js/history.js";
import TextField from "@material-ui/core/TextField";
import Clock from "./clock";
import MenuItem from "@material-ui/core/MenuItem";

import CardList from "../view/templates/temp_toolList";
import Sub_bigdata_carddetail from "../view/templates/temp_sub_bigdata_carddetail";
import Sub_ai_carddetail from "../view/templates/temp_sub_ai_carddetail";

import CustomPaginationActionsTable from "./main_templates/coupon_table.jsx";
import { Divider } from "@material-ui/core";

import normalize from "../assets/css/normalize.css";
import font from "../assets/css/font.css";
import swiper_min from "../assets/css/swiper.min.css";

import styles from "../assets/css/style.css";

import config from "../js/config.js";

import user_sesstion from "./layout/session_nav";

import session_nav from "./layout/session_nav";

import { findDOMNode } from "react-dom";
import $ from "jquery";
window.$ = $;

var myrows1 = [];

var myrows2 = [];
class tool extends React.Component {
    state = {
        name: "Cat in the Hat",
        age: 0,
        multiline: "Controlled",
        currency: "NULL",
        word: "NULL",
        category: "NULL",
        value: "cate",
        user_id: "NULL",
        rows: myrows1,
        rows2: myrows2,
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
        this.state.bookmark_no = 1;

        this.state.TabTypes = 0;

        this.state.tool_no = this.props.tool_no;

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
        if (this.state.dataType == "tool" && this.state.values == this.state.values) {
            this.props.history.push({
                pathname: "/tool",
                search: "?name=" + document.getElementById("search_keyword").value + "&category=" + this.state.values,
            });
            // console.log("검색 : " + this.state.values);
            window.location.reload();
        }

        // else if(this.state.dataType == "data_recommend" && this.state.values == this.state.values){
        //   this.props.history.push({
        //     pathname: '/src/data_recommend.html',
        //     search: '?name=' + document.getElementById("search_keyword").value + '&category=' + this.state.values,
        //   });

        //   window.location.reload();
        // }
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

    handleClickTabTypes(types, data_type) {
        // console.log('aaa = ' + types + "/ " + data_type);
        if (data_type == "빅데이터") {
            this.setState({
                TabTypes: 1,
                tool_no: types,
            });
        } else if (data_type == "AI") {
            this.setState({
                TabTypes: 2,
                tool_no: types,
            });
        }
    }

    _getData = async () => {
        this.setState({
            fetching: true, // requesting..
        });

        var user_id = sessionStorage.getItem("user");
        var urlstring = config.serverpoint + "/bookmark/" + user_id;

        await axios
            .get(urlstring)
            .then((response) => {
                this.state.rows = response.data;

                // console.log("ㅁㅁㅁ" + this.state.rows.length);

                if (this.state.rows.length == undefined) {
                    this.setState({
                        fetchings: true, // done!
                    });
                } else {
                    this.setState({
                        fetchings: false, // done!
                    });
                }
            }) // SUCCESS
            .catch((response) => {
                // console.log(response);
            }); // ERROR

        var urlstring2 = config.serverpoint + "/recommandation/search";

        await axios
            .get(urlstring2)
            .then((response) => {
                var newRows = [];

                for (var i = 0; i < response.data.length; i++) {
                    var dataPack = {
                        // ranking : "0",
                        search_keywords: "검색어",
                    };
                    var tempdatapack = eval("(" + JSON.stringify(dataPack) + ")");

                    // tempdatapack.ranking = response.data[i].ranking;
                    tempdatapack.search_keywords = response.data[i].search_keywords;

                    newRows.push(tempdatapack);
                }
                this.state.rows3 = newRows;
                // console.log(newRows);

                this.setState({
                    fetching: false,
                });
            })
            .catch((response) => {
                // console.log(response);
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
            tool_no: "",
        });
    }

    handleCreate() {
        history.push("/src/mypage_favorites.html");
    }

    handlePopupCancle() {
        // console.log("Cancle");
        this.setState({ popupType: 0 });
    }

    handleChange(event) {
        this.setState({
            bookmark_name: event.target.value,
        });
    }

    handlePopupAccept(event) {
        // console.log("handlePopupAccept");
        // console.log('no = ' + this.state.bookmark_no)
        // console.log('name = ' + this.state.bookmark_name)
        var id = sessionStorage.getItem("user");
        this.state.bookmark_name = document.getElementById("test_select").value;
        var no = this.state.bookmark_name;
        var tool_no = this.state.tool_no;
        var urlstring = config.serverpoint + "/bookmark/" + id + "/" + no;

        // console.log(urlstring);
        axios
            .post(urlstring, {
                openapi_no: this.state.tool_no,
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
        alert("즐겨찾기에 추가하였습니다.");
        window.location.reload();
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

        const { rows3 = [] } = this.state;
        return (
            <div>
                <main className="main_sub">
                    <div className="layout_inner layout_clearfix">
                        <div class="layout_sub_side">
                            <h2>데이터</h2>
                            <div class="sub_nav_menu">
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

                                {this.state.dataType === "data_recommend" && (
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
                                            {/* <li>
                                                <a
                                                    href="/src/data_recommend_bigdata.html"
                                                    className={this.state.dataType === "data_recommend_bigdata" && "on2"}
                                                    style={{ padding: "2px" }}
                                                >
                                                    빅데이터 분석 추천
                                                </a>
                                            </li> */}
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
                                {this.state.dataType == "tool" && (
                                    <a href="/tool" className="on2">
                                        도구
                                    </a>
                                )}
                                {this.state.dataType !== "tool" && <a href="/tool">도구</a>}
                                {sessionStorage.getItem("user") && (
                                    <>
                                        <h2>마이페이지</h2>
                                        <a href="/src/mypage.html">나의 오픈 API</a>
                                        <a href="/src/mypage_history.html">나의 사용이력</a>
                                        <a href="/src/mypage_favorites.html">즐겨찾기</a>
                                        <h2>SmartOcean</h2>
                                        <a href={"http://182.252.131.176:3000/"} target='_blank'>바로가기</a>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="layout_sub_cont">
                            {this.state.TabTypes == 0 && (
                                <div>
                                    <div className="cont_data_search">
                                        <div className="cont_data_search_forms">
                                            <form method id="form" onsubmit="return false">
                                                <div className="cont_data_search_form_input">
                                                    <input type="text" id="search_keyword" onKeyDown={this.enterCheck} />
                                                    {this.search()}
                                                    <button
                                                        type="button"
                                                        id
                                                        onClick={this.onClickButton}
                                                        className="cont_data_search_form_btns"
                                                    >
                                                        <span>Search</span>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    {this.categorys()}

                                    <CardList
                                        returnType={this.handleClickTabTypes}
                                        dataType={this.state.dataType}
                                        word={this.state.word}
                                        category={this.state.category}
                                        value={this.state.value}
                                    />
                                </div>
                            )}
                            {this.state.TabTypes == 1 && (
                                <Sub_bigdata_carddetail
                                    tool_no={this.state.tool_no}
                                    returnPopupOpen={this.handlePopupOpen}
                                    returnTabClose={this.handleClickTabClose}
                                />
                            )}
                            {this.state.TabTypes == 2 && (
                                <Sub_ai_carddetail
                                    tool_no={this.state.tool_no}
                                    returnPopupOpen={this.handlePopupOpen}
                                    returnTabClose={this.handleClickTabClose}
                                />
                            )}
                        </div>
                        {}
                    </div>
                    {this.state.popupType == 1 && this.state.fetchings == true && (
                        <div class="pop_common">
                            <h4 class="pop_tit">알림</h4>
                            <div class="pop_cont_wrap">
                                <div class="pop_cont">
                                    <div class="pop_cont_select">
                                        <p>분류함을 만들어주세요</p>
                                        <div />
                                    </div>
                                </div>
                                <div class="pop_btns">
                                    <button type="submit" class="pop_btn_submit" onClick={this.handleCreate}>
                                        확인
                                    </button>
                                    <button type="button" class="pop_btn_cancel" onClick={this.handlePopupCancle}>
                                        취소
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {this.state.popupType == 1 && this.state.fetchings == false && (
                        <div class="pop_common">
                            <h4 class="pop_tit">알림</h4>
                            <div class="pop_cont_wrap">
                                <div class="pop_cont">
                                    <div class="pop_cont_select">
                                        <p>선택한 openAPI를 보관할 분류함을 선택해주세요.</p>
                                        <div>
                                            <select id="test_select" value={this.state.bookmark_name} onChange={this.handleChange}>
                                                {this.state.rows.map((row) => {
                                                    return <option value={row.bookmark_no}>{row.bookmark_name}</option>;
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="pop_btns">
                                    <button type="submit" class="pop_btn_submit" onClick={this.handlePopupAccept}>
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
export default withStyles(styles)(tool);
