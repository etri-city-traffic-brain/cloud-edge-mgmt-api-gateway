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

import CardList from "../view/templates/temp_cardList";
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
class guild extends React.Component {
    state = {
        name: "Cat in the Hat",
        age: 0,
        multiline: "Controlled",
        currency: "NULL",
    };

    constructor(...props) {
        super(...props);

        this.state = { date: new Date() };
        this.child = React.createRef();
        this.state.age = 1000;
        this.state.textFieldValue_value = 1000;
        this.state.bookmark_name = "";

        this.state.TabTypes = 0;

        this.state.openapi_no = null;

        this.state.popupType = 0;

        this.state.dataType = this.props.dataType;
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

    handleChange(event) {
        // console.log(event.target.value);
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

    _handleTextFieldChange_item_type = (e) => {
        this.setState({
            textFieldValue_item_type: e.target.value,
            currency: e.target.value,
        });
        //console.log(e.target.value);
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
                                    <a href="tool">데이터 툴</a>
                                    <div class="header_nav_menu_sub js_nav_menu">
                                        <a href="tool">도구</a>
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
                        <h2>이용안내</h2>
                        <div className="sub_nav_menu">
                            <a href="/src/guide.html" className="on2">
                                개요
                            </a>
                        </div>
                    </section>
                </div>

                <main className="main_sub" style={{ padding: "20px" }}>
                    <div className="layout_inner">
                        <section className="cont_guide">
                            <h3 style={{ color: "black" }}>오픈 API란?</h3>
                            <div>
                                오픈 API(Open Application Programming Interface, Open API, 공개 API)는 누구나 사용할 수 있도록 공개된 API를
                                말하며, 개발자에게 사유 응용 소프트웨어나 웹 서비스에 프로그래밍적인 권한을 제공합니다. 또한 정보공개를
                                공급자 위주에서 국민중심·수요자 중심으로 전환함에 따라, 공공기관이 이용자에게 정보를 재활용 할 수 있도록
                                제공하고, 제공받은 정보를 상업적·비영리적으로 이용할 권리를 부여함으로써 다양한 서비스와 데이터를 좀더 쉽게
                                이용할 수 있도록 공개한 개발자를 위한 인터페이스 입니다.
                            </div>
                        </section>
                        <section className="cont_guide cont_guide_diagram">
                            <h3>서비스 개요</h3>
                            <div>
                                <strong>UNIQ Cloud Platform</strong>은 다양한 기관에서 독립적으로 제공하는 해양 관련 오픈데이터 정보를 통합 및
                                분류하여 서비스를 제공합니다. <strong>UNIQ Cloud Platform</strong>을 통해 오픈데이터를 찾으면 다수의 사이트를
                                방문해야 하는 번거로움이 줄어듭니다. 또한 해양 관련 다양한 분류체계를 제공하면서 오픈데이터 정보의 접근성을
                                높입니다.
                            </div>
                            <div className="cont_guide_diagram_img">
                                <img src={require("../assets/images/guide_diagram.png")} alt="" />
                            </div>
                        </section>
                        <section className="cont_guide">
                            <div className="layout_clearfix">
                                <h3>주요기능</h3>
                                <p>
                                    <strong>UNIQ Cloud Platform</strong>의 주요 기능들을 살펴보세요.
                                </p>
                            </div>
                            <div className="cont_guide_summary_wrap">
                                <ul className="cont_guide_summary">
                                    <li>
                                        <h4>오픈데이터 통합</h4>
                                        <div>
                                            정부기관, 지자체, 민간기업에서 제공하는
                                            <br />
                                            방대한 해양 관련 오픈데이터 정보들을 수집하고
                                            <br />
                                            이질적 형태의 정보들을 정형화된 포맷으로 정렬하여
                                            <br />
                                            안내합니다. 또한 단일 포털 내에서 다양한
                                            <br />
                                            기관의 오픈데이터 정보를 수집하여
                                            <br />
                                            제공합니다.
                                        </div>
                                    </li>
                                    <li>
                                        <h4>오픈데이터 분류</h4>
                                        <div>
                                            오픈데이터에 손쉽게 접근할 수 있는 해양
                                            <br />
                                            관련 분류 체계를 제공합니다. 이를 통해 방대한
                                            <br />
                                            양의 오픈데이터 정보에 대한 체계적인
                                            <br />
                                            탐색을 가능하게 합니다.
                                        </div>
                                    </li>
                                    <li>
                                        <h4>오픈데이터 추천</h4>
                                        <div>
                                            사용자가 설정한 개인정보와 서비스 이용 패턴을
                                            <br />
                                            기반으로 오픈데이터를 추천하는 기능을 제공합니다.
                                            <br />
                                            이를 통해 방대한 양의 오픈데이터 정보 중
                                            <br />
                                            가장 가치있는 정보를 선별하여 제공하게
                                            <br />
                                            되고 오픈데이터 활용률을 높입니다.
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </section>
                        {/* <section className="cont_guide">
                            <div className="layout_clearfix">
                                <h3>시스템 구성</h3>
                                <p>
                                    <strong>UNIQ Cloud Platform</strong>의 시스템 구성을 살펴보세요.
                                </p>
                            </div>
                            <div className="cont_guide_system">
                                <img src={require("../assets/images/guide_system.png")} alt="" />
                            </div>
                        </section> */}
                    </div>
                    {}
                </main>

                <footer className="footer_common">
                    <div className="footer_cont">
                        <div className="layout_inner layout_clearfix">
                            <div className="footer_cont_logo">
                                <a href="http://www.msit.go.kr" target="_blank" rel="noopener noreferrer">
                                    <img src={require("../assets/images/logo4.png")} alt="산업통상자원부" />
                                </a>
                            </div>

                            <div className="footer_cont_menu">
                                <a href="/src/clause.html">이용약관</a>
                                <a href="/src/privacy.html">개인정보처리방침</a>
                                <a href="/src/mail.html">문의사항</a>
                            </div>
                        </div>
                    </div>
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
                    </div>
                </footer>
            </div>
        );
    }
}
export default withStyles(styles)(guild);
