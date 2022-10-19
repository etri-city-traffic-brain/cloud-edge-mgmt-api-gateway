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
class clause extends React.Component {
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
                        <h2>이용약관</h2>
                    </section>
                </div>

                <main className="main_sub" style={{ padding: "1px" }}>
                    <div className="layout_inner">
                        <section className="cont_guide">
                            <h4 style={{ color: "black" }}>제 1장 총칙</h4>
                            <br />
                            <h3 style={{ color: "black" }}>제 1 조(목적)</h3>
                            <div>
                                본 약관은 UNIQ Cloud Platform 웹사이트(이하 "UNIQ Cloud Platform")가 제공하는 모든 서비스(이하 "서비스")의 이용조건 및 절차,
                                회원과 UNIQ Cloud Platform의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.
                            </div>
                            <br />

                            <h3 style={{ color: "black" }}>제 2 조(약관의 효력과 변경)</h3>
                            <div>
                                1. UNIQ Cloud Platform은 이용자가 본 약관 내용에 동의하는 경우, UNIQ Cloud Platform의 서비스 제공 행위 및 회원의 서비스 사용
                                행위에 본 약관이 우선적으로 적용됩니다.
                                <br />
                                2. UNIQ Cloud Platform은 약관을 개정할 경우, 적용일자 및 개정사유를 명시하여 현행약관과 함께 UNIQ Cloud Platform의
                                초기화면에 그 적용일 7일 이전부터 적용 전일까지 공지합니다. 단, 회원에 불리하게 약관내용을 변경하는 경우에는
                                최소한 30일 이상의 사전 유예기간을 두고 공지합니다. 이 경우 UNIQ Cloud Platform은 개정 전 내용과 개정 후 내용을
                                명확하게 비교하여 회원이 알기 쉽도록 표시합니다.
                                <br />
                                3. 변경된 약관은 UNIQ Cloud Platform 홈페이지에 공지하거나 e-mail을 통해 회원에게 공지하며, 약관의 부칙에 명시된
                                날부터 그 효력이 발생됩니다. 회원이 변경된 약관에 동의하지 않는 경우, 회원은 본인의 회원등록을
                                취소(회원탈퇴)할 수 있으며, 변경된 약관의 효력 발생일로부터 7일 이내에 거부의사를 표시하지 아니하고 서비스를
                                계속 사용할 경우는 약관 변경에 대한 동의로 간주됩니다.
                                <br />
                            </div>
                            <br />

                            <h3 style={{ color: "black" }}>제 3 조(약관 외 준칙)</h3>
                            <div>
                                본 약관에 명시되지 않은 사항은 전기통신기본법, 전기통신사업법, 정보통신윤리위원회심의규정, 정보통신
                                윤리강령, 프로그램보호법 및 기타 관련 법령의 규정에 의합니다.
                            </div>
                            <br />

                            <h3 style={{ color: "black" }}>제 4 조(용어의 정의)</h3>
                            <div>
                                본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
                                <br />
                                1. 개발자 : 본 약관에 따라 UNIQ Cloud Platform이 제공하는 서비스를 받는 자<br />
                                2. 가입 : UNIQ Cloud Platform이 제공하는 신청서 양식에 해당 정보를 기입하고, 본 약관에 동의하여 서비스 이용계약을
                                완료시키는 행위
                                <br />
                                3. 회원 : UNIQ Cloud Platform에 개인 정보를 제공하여 회원 등록을 한 자로서 UNIQ Cloud Platform이 제공하는 서비스를 이용할 수
                                있는 자.
                                <br />
                                4. 계정(ID) : 회원의 식별과 회원의 서비스 이용을 위하여 회원이 선정하고 UNIQ Cloud Platform에서 부여하는 문자와
                                숫자의 조합
                                <br />
                                5. 비밀번호 : 회원과 계정이 일치하는지를 확인하고 통신상의 자신의 비밀보호를 위하여 회원 자신이 선정한
                                문자와 숫자의 조합
                                <br />
                                6. 탈퇴 : 회원이 이용계약을 종료시키는 행위
                                <br />
                                7. 본 약관에서 정의하지 않은 용어는 개별서비스에 대한 별도 약관 및 이용규정에서 정의합니다.
                                <br />
                            </div>
                            <br />

                            <h4 style={{ color: "black" }}>제 2장 서비스 제공 및 이용</h4>
                            <br />
                            <h3 style={{ color: "black" }}>제 5 조 (이용계약의 성립)</h3>
                            <div>
                                1. 이용계약은 이용자가 온라인으로 UNIQ Cloud Platform에서 제공하는 소정의 가입신청 양식에서 요구하는 사항을 기록하여
                                가입을 완료하는 것으로 성립됩니다.
                                <br />
                                2. UNIQ Cloud Platform은 다음 각 호에 해당하는 이용계약에 대하여는 가입을 취소할 수 있습니다. 1) 다른 사람의 명의를
                                사용하여 신청하였을 때 2) 이용계약 신청서의 내용을 허위로 기재하였거나 신청하였을 때 3) 다른 사람의 Smart
                                Ocean 서비스 이용을 방해하거나 그 정보를 도용하는 등의 행위를 하였을 때 4) UNIQ Cloud Platform을 이용하여 법령과 본
                                약관이 금지하는 행위를 하는 경우 5) 기타 UNIQ Cloud Platform이 정한 이용신청요건이 미비 되었을 때
                            </div>
                            <br />

                            <h3 style={{ color: "black" }}>제 6 조 (회원정보 사용에 대한 동의)</h3>
                            <div>
                                1. 회원의 개인정보는 「공공기관의개인정보보호에관한법률」에 의해 보호됩니다.
                                <br />
                                2. UNIQ Cloud Platform의 회원 정보는 다음과 같이 사용, 관리, 보호됩니다.
                                <br />
                                1) 개인정보의 사용 : UNIQ Cloud Platform는 서비스 제공과 관련해서 수집된 회원의 신상정보를 본인의 승낙 없이
                                제3자에게 누설, 배포하지 않습니다. 단, 전기통신기본법 등 법률의 규정에 의해 국가기관의 요구가 있는 경우,
                                범죄에 대한 수사상의 목적이 있거나 정보통신윤리위원회의 요청이 있는 경우 또는 기타 관계법령에서 정한 절차에
                                따른 요청이 있는 경우, 이용자 스스로 개인정보를 공개한 경우에는 그러 하지 않습니다. 2) 개인정보의 관리 :
                                회원은 개인정보의 보호 및 관리를 위하여 서비스의 개인정보관리에서 수시로 회원의 개인정보를 수정/삭제할 수
                                있습니다. 3) 개인정보의 보호 : 회원의 개인정보는 오직 본인만이 열람/수정/삭제 할 수 있으며, 이는 전적으로
                                회원의 계정과 비밀번호에 의해 관리되고 있습니다. 따라서 타인에게 본인의 계정과 비밀번호를 알려주어서는 안
                                되며, 작업 종료 시에는 반드시 로그아웃해 주시기 바랍니다.
                                <br />
                                3. 회원이 본 약관에 따라 이용신청을 하는 것은, UNIQ Cloud Platform의 신청서에 기재된 회원정보를 수집, 이용하는 것에
                                동의하는 것으로 간주 됩니다.
                            </div>
                            <br />

                            <h3 style={{ color: "black" }}>제 7 조 (사용자의 정보 보안)</h3>
                            <div>
                                1. 이용자는 UNIQ Cloud Platform 서비스 가입 절차를 완료하는 순간부터 본인이 입력한 정보의 비밀을 유지할 책임이
                                있으며, 회원이 고의나 중대한 실수로 회원의 계정과 비밀번호를 사용하여 발생한 피해에 대한 책임은 회원
                                본인에게 있습니다.
                                <br />
                                2. 계정과 비밀번호에 관한 모든 관리의 책임은 회원에게 있으며, 회원의 계정이나 비밀번호가 부정하게
                                사용되었다는 사실을 발견한 경우에는 즉시 UNIQ Cloud Platform에 신고하여야 합니다. 신고를 하지 않음으로 인한 모든
                                책임은 회원 본인에게 있습니다.
                                <br />
                                3. 이용자는 UNIQ Cloud Platform 서비스의 사용 종료 시마다 정확히 접속을 종료해야 하며, 정확히 종료하지 아니함으로써
                                제3자가 이용자에 관한 정보를 이용하게 되는 등의 결과로 인해 발생하는 손해 및 손실에 대하여 Open Data
                                Market은 책임을 부담하지 아니합니다.
                                <br />
                            </div>
                            <br />

                            <h3 style={{ color: "black" }}>제 8 조 (서비스의 변경)</h3>
                            <div>
                                1. 당 사이트는 귀하가 서비스를 이용하여 기대하는 손익이나 서비스를 통하여 얻은 자료로 인한 손해에 관하여
                                책임을 지지 않으며, 회원이 본 서비스에 게재한 정보, 자료, 사실의 신뢰도, 정확성 등내용에 관하여는 책임을
                                지지 않습니다.
                                <br />
                                2. 당 사이트는 서비스 이용과 관련하여 가입자에게 발생한 손해 중 가입자의 고의, 과실에 의한 손해에 대하여
                                책임을 부담하지 아니합니다.
                                <br />
                            </div>
                            <br />

                            <h3 style={{ color: "black" }}>제 9 조 (이용기간 및 자격의 정지 및 상실)</h3>
                            <div>
                                1. UNIQ Cloud Platform 회원이용기간은 조직통폐합에 따른 불가항력을 제외하고 회원신청에서 탈퇴까지로 합니다.
                                <br />
                                2. UNIQ Cloud Platform은 이용자가 본 약관에 명시된 내용을 위배하는 행동을 한 경우, 이용자격을 일시적으로 정지하고
                                30일 이내에 시정하도록 이용자에게 요구할 수 있으며, 이후 동일한 행위를 2회 이상 반복할 경우에 30일간의
                                소명기회를 부여한 후 이용자격을 상실시킬 수 있습니다.
                                <br />
                            </div>
                            <br />

                            <h3 style={{ color: "black" }}>제 10 조 (계약해제, 해지 등)</h3>
                            <div>
                                1. 회원은 언제든지 서비스 초기화면의 마이페이지 또는 정보수정 메뉴 등을 통하여 이용계약 해지 신청을 할 수
                                있으며, UNIQ Cloud Platform은 관련법 등이 정하는 바에 따라 이를 즉시 처리하여야 합니다.
                                <br />
                                2. 회원이 계약을 해지할 경우, 관련법 및 개인정보취급방침에 따라 UNIQ Cloud Platform이 회원정보를 보유하는 경우를
                                제외하고는 해지 즉시 회원의 모든 데이터는 소멸됩니다.
                                <br />
                                3. 회원이 계약을 해지하는 경우, 회원이 작성한 게시물 중 블로그 등과 같이 본인 계정에 등록된 게시물 일체는
                                삭제됩니다. 단, 타인에 의해 스크랩 되어 재 게시되거나, 공용게시판에 등록된 게시물 등은 삭제되지 않으니
                                사전에 삭제 후 탈퇴하시기 바랍니다.
                                <br />
                            </div>
                            <br />

                            <h3 style={{ color: "black" }}>제 11 조 (게시물의 저작권)</h3>
                            <div>
                                1. 이용자가 게시한 게시물의 저작권은 이용자가 소유하며, UNIQ Cloud Platform는 서비스 내에 이를 게시할 수 있는 권리를
                                갖습니다.
                                <br />
                                2. UNIQ Cloud Platform은 다음 각 호에 해당하는 게시물이나 자료를 사전통지 없이 삭제하거나 이동 또는 등록 거부를 할
                                수 있습니다.
                                <br />
                                1) 본서비스 약관에 위배되거나 상용 또는 불법, 음란, 저속하다고 판단되는 게시물을 게시한 경우 2) 다른 회원
                                또는 제 3자에게 심한 모욕을 주거나 명예를 손상시키는 내용인 경우 3) 공공질서 및 미풍양속에 위반되는 내용을
                                유포하거나 링크시키는 경우 4) 불법복제 또는 해킹을 조장하는 내용인 경우 5) 영리를 목적으로 하는 광고일 경우
                                6) 범죄와 결부된다고 객관적으로 인정되는 내용일 경우 7) 다른 이용자 또는 제 3자의 저작권 등 기타 권리를
                                침해하는 내용인 경우 8) UNIQ Cloud Platform에서 규정한 게시물 원칙에 어긋나거나, 게시판 성격에 부합하지 않는 경우 9)
                                기타 관계법령에 위배된다고 판단되는 경우
                                <br />
                                3. 이용자의 게시물이 타인의 저작권을 침해함으로써 발생하는 민, 형사상의 책임은 전적으로 이용자가 부담하여야
                                합니다.
                            </div>
                            <br />

                            <h4 style={{ color: "black" }}>제 3장 의무 및 책임</h4>
                            <h3 style={{ color: "black" }}>제 12 조 (UNIQ Cloud Platform의 의무)</h3>
                            <div>
                                1. UNIQ Cloud Platform은 회원의 개인 신상 정보를 본인의 승낙 없이 타인에게 누설, 배포하지 않습니다. 단,
                                전기통신관련법령 등 관계법령에 의하여 관계 국가기관 등의 요구가 있는 경우에는 그러하지 아니합니다.
                                <br />
                                2. UNIQ Cloud Platform은 법령과 본 약관이 금지하거나 미풍양속에 반하는 행위를 하지 않으며, 지속적·안정적으로
                                서비스를 제공하기 위해 노력 할 의무가 있습니다.
                                <br />
                                3. UNIQ Cloud Platform은 이용자의 귀책사유로 인한 서비스 이용 장애에 대하여 책임을 지지 않습니다.
                                <br />
                            </div>
                            <br />

                            <h3 style={{ color: "black" }}>제 13 조 (회원의 의무)</h3>
                            <div>
                                1. 회원 가입 시에 요구되는 정보는 정확하게 기입하여야 합니다. 또한 이미 제공된 회원에 대한 정보가 정확한
                                정보가 되도록 유지, 갱신하여야 하며, 회원은 자신의 계정 및 비밀번호를 제3자에게 이용하게 해서는 안 됩니다.
                                <br />
                                2. 회원은 UNIQ Cloud Platform의 사전 승낙없이 서비스를 이용하여 어떠한 영리행위도 할 수 없으며, 그 영업활동의 결과에
                                대해 UNIQ Cloud Platform은 일절 책임을 지지 않습니다. 또한 회원은 이와 같은 영업활동으로 Open Data Market이 손해를
                                입은 경우 손해배상의무를 지며, UNIQ Cloud Platform은 해당 회원에 대해 서비스 이용제한 및 적법한 절차를 거쳐 손해배상
                                등을 청구할 수 있습니다.
                                <br />
                                3. 회원은 UNIQ Cloud Platform 서비스 이용과 관련하여 다음 각 호의 행위를 하여서는 안 됩니다.
                                <br />
                                1) 회원가입 신청 또는 회원정보 변경 시 허위내용을 기재하거나 다른 회원의 비밀번호와 ID를 도용하여 부정
                                사용하는 행위 2) 저속, 음란, 모욕적, 위협적이거나 타인의 Privacy를 침해할 수 있는 내용을 전송, 게시, 게재,
                                전자우편 또는 기타의 방법으로 전송하는 행위 3) UNIQ Cloud Platform 운영진, 직원 또는 관계자를 사칭하는 행위 4)
                                서비스를 통하여 전송된 내용의 출처를 위장하는 행위 5) 법률, 계약에 의해 이용할 수 없는 내용을 게시, 게재,
                                전자우편 또는 기타의 방법으로 전송하는 행위 6) 서버 해킹 및 컴퓨터바이러스 유포, 웹사이트 또는 게시된 정보의
                                일부분 또는 전체를 임의로 변경하는 행위 7) 타인의 특허, 상표, 영업비밀, 저작권, 기타 지적재산권을 침해하는
                                내용을 게시, 게재, 전자우편 또는 기타의 방법으로 전송하는 행위 8) UNIQ Cloud Platform의 승인을 받지 아니한 광고,
                                판촉물, 스팸메일, 행운의 편지, 피라미드 조직 다른 형태의 권유를 게시, 게재, 전자우편 또는 기타의 방법으로
                                전송하는 행위 9) 다른 사용자의 개인정보를 수집, 저장, 공개하는 행위 10) 범죄행위를 목적으로 하거나 기타
                                범죄행위와 관련된 행위 11) 선량한 풍속, 기타 사회질서를 해하는 행위 12) 타인의 명예를 훼손하거나 모욕하는
                                행위 13) 타인의 지적재산권 등의 권리를 침해하는 행위 14) 타인의 의사에 반하여 광고성 정보 등 일정한 내용을
                                지속적으로 전송하는 행위 15) 서비스의 안정적인 운영에 지장을 주거나 줄 우려가 있는 일체의 행위 17) 본 약관을
                                포함하여 기타 UNIQ Cloud Platform이 정한 제반 규정 또는 이용 조건을 위반하는 행위 18) 기타 관계법령에 위배되는 행위
                            </div>
                            <br />

                            <h4 style={{ color: "black" }}>제 4장 기타</h4>
                            <br />
                            <h3 style={{ color: "black" }}>제 14 조 (양도금지)</h3>
                            <div>회원이 서비스의 이용권한, 기타 이용계약 상 지위를 타인에게 양도, 증여할 수 없습니다.</div>
                            <br />

                            <h3 style={{ color: "black" }}>제 15조 (면책조항)</h3>
                            <div>
                                1. UNIQ Cloud Platform은 서비스 이용과 관련하여 이용자에게 발생한 손해에 대하여 UNIQ Cloud Platform의 중대한 과실, 고의 또는
                                범죄행위로 인해 발생한 손해를 제외하고 이에 대하여 책임을 부담하지 않으며, 이용자가 본 서비스에 게재한 정보,
                                자료, 사실의 신뢰도, 정확성 등내용에 관하여는 책임을 지지 않습니다.
                                <br />
                                2. UNIQ Cloud Platform은 서비스 이용과 관련하여 이용자에게 발생한 손해 중 이용자의 고의, 실수에 의한 손해에 대하여
                                책임을 부담하지 아니합니다.
                                <br />
                                3. UNIQ Cloud Platform은 이용자 간 또는 이용자와 제3자간에 서비스를 매개로 하여 물품거래 혹은 금전적 거래 등과
                                관련하여 어떠한 책임도 부담하지 아니하고, 이용자가 서비스의 이용과 관련하여 기대하는 이익에 관하여 책임을
                                부담하지 않습니다.
                                <br />
                            </div>
                            <br />

                            <h3 style={{ color: "black" }}>제 16 조 (재판관할)</h3>
                            <div>
                                UNIQ Cloud Platform과 이용자 간에 발생한 서비스 이용에 관한 분쟁에 대하여는 대한민국 법을 적용하며, 본 분쟁으로 인한
                                소는 민사소송법상의 관할법원에 제기합니다.
                            </div>
                            <br />

                            <h3 style={{ color: "black" }}>부 칙 1. (시행일) 본 약관은 2021년 1월 1일부터 시행됩니다.</h3>
                        </section>
                    </div>
                    {}
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
export default withStyles(styles)(clause);
