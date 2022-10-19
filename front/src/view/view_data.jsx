import React from "react";
import axios from "axios";
import history from "../js/history.js";
import CardList from "../view/templates/temp_cardList";
import Sub_file_carddetail from "../view/templates/temp_sub_file_carddetail";
import Sub_Oda_carddetail from "../view/templates/temp_sub_Oda_carddetail";
import styles from "../assets/css/style.css";
import config from "../js/config.js";
import session_nav from "./layout/session_nav";
import { findDOMNode } from "react-dom";
import $ from "jquery";
import { withStyles } from "@material-ui/core/styles";
import cookie from "react-cookies";

window.$ = $;
var myrows1 = [];
var myrows2 = [];

var crypto = require("crypto");

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

class view_data extends React.Component {
    state = {
        name: "Cat in the Hat",
        age: 0,
        multiline: "Controlled",
        currency: "NULL",
        word: "NULL",
        category: "NULL",
        value: "cate",
        user_id: "NULL",
        startpage: 0,
        endpage: 0,
        page: 0,
        rowsPerPage: 10,
        pagemax: 0,
        pagemap: null,
        rows: myrows1,
        rows2: myrows2,
        bigdata: "NULL",
    };

    constructor(...props) {
        super(...props);

        this.handleClick = this.handleClick.bind(this);

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

        this.state.openapi_no = null;

        this.state.popupType = 0;

        this.state.word = null;

        this.state.rowsPerPage = 10;
        this.state.page = 0;
        this.state.pagemap = [];
        this.state.startpage = 0;
        this.state.endpage = 0;

        this.state.category = this.props.category;

        this.state.dataType = this.props.dataType;

        this.state.recommend = this.props.recommend;

        this.state.bigdata = null;
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
        if (this.state.dataType === "data" && this.state.values === this.state.values) {
            this.props.history.push({
                pathname: "/src/data.html",
                search: "?name=" + document.getElementById("search_keyword").value + "&category=" + this.state.values,
            });
            // console.log("검색 : " + this.state.values);
            window.location.reload();
        } else if (this.state.dataType === "data_oda" && this.state.values == this.state.values) {
            this.props.history.push({
                pathname: "/src/data_oda.html",
                search: "?name=" + document.getElementById("search_keyword").value + "&category=" + this.state.values,
            });

            window.location.reload();
        } else if (this.state.dataType === "data_file" && this.state.values == this.state.values) {
            this.props.history.push({
                pathname: "/src/data_file.html",
                search: "?name=" + document.getElementById("search_keyword").value + "&category=" + this.state.values,
            });

            window.location.reload();
        } else if (this.state.dataType === "data_recommend" && this.state.values == this.state.values) {
            this.props.history.push({
                pathname: "/src/data_recommend.html",
                search: "?name=" + document.getElementById("search_keyword").value + "&category=" + this.state.values,
            });

            window.location.reload();
        } else if (this.state.dataType === "data_recommend_bigdata" && this.state.values == this.state.values) {
            this.props.history.push({
                pathname: "/src/data.html",
                search: "?name=" + document.getElementById("search_keyword").value + "&category=" + this.state.values,
            });

            window.location.reload();
        } else if (this.state.dataType === "data_recommend_history" && this.state.values == this.state.values) {
            this.props.history.push({
                pathname: "/src/data_recommend_history.html",
                search: "?name=" + document.getElementById("search_keyword").value + "&category=" + this.state.values,
            });

            window.location.reload();
        }
    };

    onClickBigdataButton = (key) => {
        // console.log(key);

        this.props.history.push({
            pathname: "/src/data.html",
            search: "?name=" + key,
        });
        // console.log("검색 : " + this.state.values);
        window.location.reload();
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


    handleLoginButtonClick = async (id) => {
        // var id = document.getElementById("email").value;
        // var passwd = document.getElementById("password").value;

        var urlstring = config.serverpoint + "/login"
        // var urlstring = "http://127.0.0.1:9000/login";

        var passwd = "1234";

        var new_passwd = null;

        if (passwd !== null) {
            var hashPassword = crypto
                .createHash("sha256")
                .update(passwd)
                .digest("hex");

            new_passwd = Buffer.from(hashPassword).toString("base64");
        }

        await axios
            .post(urlstring, {
                user_id: id,
                user_pw: new_passwd,
            })
            .then((response) => {
                // console.log(response.data);

                if (response.data == "로그인 성공") {
                    sessionStorage.setItem("user", id);
                    history.push("/");
                } else {
                    alert(id);
                    alert(new_passwd);
                    history.push("/login");
                    window.location.reload();
                    console.log("로그인 실패 = ");
                }
            }) // SUCCESS
            .catch((response) => {
                // console.log(response);
            }); // ERROR
    };

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
            fetchings: true, // requesting..
            fetchings_bigdata: true,
        });

        if(window.location.search !== null){
            console.log(window.location.search);
            const url = new URL(window.location.href)
            const urlParams = url.searchParams;

            var urlstring = config.serverpoint + "/sso/callback"
            // var urlstring = "http://127.0.0.1:9000/sso/callback";
            await axios
                .post(urlstring, {
                    code: urlParams.get('code'),
                    state: urlParams.get('state'),
                })
                .then((response) => {
                    console.log(response.data);
                    console.log(response.data.id);
                    // if(!response){
                        this.handleLoginButtonClick(response.data.id);
                    // }else{
                    //
                    // }
                }) // SUCCESS
                .catch((response) => {
                    console.log(response);
                }); // ERROR


        }


        if (this.state.dataType !== "data_recommend_bigdata") {
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
        } else {
            var urlstring3 = config.serverpoint + "/recommandation/bigdata/keyword";

            await axios
                .get(urlstring3)
                .then((response) => {
                    var newRows = [];

                    for (var i = 0; i < response.data.length; i++) {
                        if (response.data == "검색 결과가 없습니다.") {
                            // console.log("aaa" + response.data)
                            alert("검색 결과가 없습니다. 다시 입력해주세요");
                            history.push("/main");
                            window.location.reload();
                            return;
                        }
                        var dataPack = {
                            key: "이름",
                            score: "점수",
                        };
                        var tempdatapack = eval("(" + JSON.stringify(dataPack) + ")");

                        tempdatapack.key = response.data[i].key;
                        tempdatapack.score = response.data[i].score;

                        newRows.push(tempdatapack);
                    }

                    // this.state.fetchings_bigdata = false;
                    this.state.bigdata = newRows;
                    this.state.pagemax = Math.ceil(response.data.length / this.state.rowsPerPage);
                    this.state.endpage = (Math.floor(parseInt(this.state.page / 10)) + 1) * 10;
                    for (var i = 0; i < this.state.pagemax; i++) {
                        this.state.pagemap.push(i);
                    }
                    this.setState({
                        fetchings_bigdata: false,
                    });
                }) // SUCCESS
                .catch((response) => {
                    // console.log(response);
                }); // ERROR
        }

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

    handleClickTabClose() {
        // console.log("1123123");
        this.setState({
            TabTypes: 0,
            openapi_no: "",
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
        var openapi_no = this.state.openapi_no;
        var urlstring = config.serverpoint + "/bookmark/" + id + "/" + no;

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
        const { bigdata, rows3 = [], rowsPerPage, page } = this.state;
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
                                {sessionStorage.getItem("user") && (
                                    <>
                                        <h2>마이페이지</h2>
                                        <a href="/src/mypage.html">나의 오픈 API</a>
                                        <a href="/src/mypage_history.html">나의 사용이력</a>
                                        <a href="/src/mypage_favorites.html">즐겨찾기</a>
                                        {/* <h2>SmartOcean</h2> */}
                                        {/* <a href={"http://182.252.131.176:3000/"} target='_blank'>바로가기</a> */}
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="layout_sub_cont">
                            {this.state.TabTypes == 0 && (
                                <div>
                                    <div className="cont_data_search">
                                        <div className="cont_data_search_form">
                                            <form method id="form" onsubmit="return false">
                                                <div className="cont_data_search_form_select">
                                                    <select value={this.state.values} onChange={this.handleCategory}>
                                                        <option value>전체</option>
                                                        <option value="해양정책">해양정책</option>
                                                        <option value="수산">수산</option>
                                                        <option value="어업자원">어업자원</option>
                                                        <option value="해운">해운</option>
                                                        <option value="해운물류">해운물류</option>
                                                        <option value="해사안전">해사안전</option>
                                                        <option value="항만">항만</option>
                                                        <option value="통계">통계</option>
                                                    </select>
                                                </div>
                                                <div className="cont_data_search_form_input">
                                                    <input type="text" id="search_keyword" onKeyDown={this.enterCheck} />
                                                    {this.search()}
                                                    <button
                                                        type="button"
                                                        id
                                                        onClick={this.onClickButton}
                                                        className="cont_data_search_form_btn"
                                                    >
                                                        <span>Search</span>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    {this.state.dataType === "data_recommend" && (
                                        <div className="favorites_name">
                                            {" "}
                                            <h3>인기 오픈데이터 추천</h3>{" "}
                                        </div>
                                    )}
                                    {/* {this.state.dataType === "data_recommend_bigdata" && (
                                        <div className="favorites_name">
                                            {" "}
                                            <h3>빅데이터 분석 추천</h3>{" "}
                                        </div>
                                    )} */}
                                    {this.state.dataType === "data_recommend_history" && (
                                        <div className="favorites_name">
                                            {" "}
                                            <h3>사용량 기반 추천</h3>{" "}
                                        </div>
                                    )}
                                    {this.categorys()}
                                    {this.state.dataType !== "data_recommend_bigdata" && (
                                        <CardList
                                            returnType={this.handleClickTabTypes}
                                            dataType={this.state.dataType}
                                            word={this.state.word}
                                            category={this.state.category}
                                            value={this.state.value}
                                        />
                                    )}
                                    {this.state.dataType === "data_recommend_bigdata" && (
                                        <table class="tb_data_list">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: "120px" }}>순위</th>
                                                    <th>키워드</th>
                                                    <th>점수</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.fetchings_bigdata === false &&
                                                    bigdata
                                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                        .map((row, index) => {
                                                            return (
                                                                <tr>
                                                                    <td
                                                                        onClick={() => this.onClickBigdataButton(row.key)}
                                                                        className="text-center"
                                                                    >
                                                                        {index + 1}
                                                                    </td>
                                                                    <td
                                                                        onClick={() => this.onClickBigdataButton(row.key)}
                                                                        className="text-center"
                                                                    >
                                                                        {row.key}
                                                                    </td>
                                                                    <td
                                                                        onClick={() => this.onClickBigdataButton(row.key)}
                                                                        className="text-center"
                                                                    >
                                                                        {row.score.toFixed(3)}
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                            </tbody>
                                        </table>
                                    )}
                                    {this.state.fetchings_bigdata === false && (
                                        <div className="cont_board_pagenation">
                                            <a href="#" className="cont_board_pagenation_btn prev" onClick={this.handleBackButtonClick} />
                                            {this.state.fetchings_bigdata == false &&
                                                this.state.pagemap.slice(this.state.startpage, this.state.endpage).map((row, index) => {
                                                    return (
                                                        <Clickable
                                                            id={index + this.state.startpage}
                                                            onClick={this.handleClick}
                                                            text={index + this.state.startpage + 1}
                                                        />
                                                    );
                                                })}

                                            <a href="#" className="cont_board_pagenation_btn next" onClick={this.handleNextButtonClick} />
                                        </div>
                                    )}
                                </div>
                            )}
                            {this.state.TabTypes === 1 && (
                                <Sub_file_carddetail
                                    openapi_no={this.state.openapi_no}
                                    returnPopupOpen={this.handlePopupOpen}
                                    returnTabClose={this.handleClickTabClose}
                                />
                            )}
                            {this.state.TabTypes === 2 && (
                                <Sub_Oda_carddetail
                                    openapi_no={this.state.openapi_no}
                                    returnPopupOpen={this.handlePopupOpen}
                                    returnTabClose={this.handleClickTabClose}
                                />
                            )}
                        </div>
                        {}
                    </div>
                    {this.state.popupType === 1 && this.state.fetchings === true && (
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

                    {this.state.popupType === 1 && this.state.fetchings === false && (
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
export default withStyles(styles)(view_data);
