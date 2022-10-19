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
class privacy extends React.Component {
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
                        <h2>개인정보취급방침</h2>
                    </section>
                </div>

                <main className="main_sub" style={{ padding: "1px" }}>
                    <div className="layout_inner">
                        <section className="cont_guide">
                            <h3 style={{ color: "black" }}>1. 개인정보의 처리 목적</h3>
                            <div>
                                &lt;이노그리드&gt;(‘www.smartocean.com’이하 ‘UNIQ Cloud Platform’) 은(는) 다음의 목적을 위하여 개인정보를 처리하고
                                있으며, 다음의 목적 이외의 용도로는 이용하지 않습니다. <br />- 고객 가입의사 확인, 고객에 대한 서비스 제공에
                                따른 본인 식별.인증, 회원자격 유지.관리, 물품 또는 서비스 공급에 따른 금액 결제, 물품 또는 서비스의
                                공급.배송 등
                            </div>
                            <br />
                            <h3 style={{ color: "black" }}>2. 개인정보의 처리 및 보유 기간</h3>
                            <div>
                                ① &lt;이노그리드&gt;(‘www.smartocean.com’이하 ‘UNIQ Cloud Platform’) 은(는) 정보주체로부터 개인정보를 수집할 때 동의
                                받은 개인정보 보유․이용기간 또는 법령에 따른 개인정보 보유․이용기간 내에서 개인정보를 처리․보유합니다.
                                <br />
                                ② 구체적인 개인정보 처리 및 보유 기간은 다음과 같습니다.
                                <br />
                                ☞ 아래 예시를 참고하여 개인정보 처리업무와 개인정보 처리업무에 대한 보유기간 및 관련 법령, 근거 등을
                                기재합니다.
                                <br />
                                (예시)- 고객 가입 및 관리 : 서비스 이용계약 또는 회원가입 해지시까지, 다만 채권․채무관계 잔존시에는 해당
                                채권․채무관계 정산시까지
                                <br />- 전자상거래에서의 계약․청약철회, 대금결제, 재화 등 공급기록 : 5년
                            </div>
                            <br />
                            <h3 style={{ color: "black" }}>3. 개인정보의 제3자 제공에 관한 사항</h3>
                            <div>
                                ① &lt;이노그리드&gt;('www.smartocean.com'이하 'UNIQ Cloud Platform')은(는) 정보주체의 동의, 법률의 특별한 규정 등
                                개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
                                <br />
                                ② &lt;이노그리드&gt;('www.smartocean.com')은(는) 다음과 같이 개인정보를 제3자에게 제공하고 있습니다.
                                <br />
                                <br />
                                1. &lt;&gt;
                                <br />
                                - 개인정보를 제공받는 자 : <br />
                                - 제공받는 자의 개인정보 이용목적 : <br />
                                - 제공받는 자의 보유.이용기간: <br />
                            </div>
                            <br />
                            <h3 style={{ color: "black" }}>4. 개인정보처리 위탁</h3>
                            <div>
                                ① &lt;이노그리드&gt;('UNIQ Cloud Platform')은(는) 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를
                                위탁하고 있습니다.
                                <br />
                                <br />
                                1. &lt;&gt;
                                <br />
                                - 위탁받는 자 (수탁자) : <br />
                                - 위탁하는 업무의 내용 : <br />
                                - 위탁기간 : <br />
                            </div>
                            <br />
                            ② &lt;이노그리드&gt;('www.smartocean.com'이하 'UNIQ Cloud Platform')은(는) 위탁계약 체결시 개인정보 보호법 제25조에 따라
                            위탁업무 수행목적 외 개인정보 처리금지, 기술적․관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리․감독, 손해배상
                            등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.
                            <br />
                            ③ 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다.
                            <br />
                            <br />
                            <h3 style={{ color: "black" }}>
                                5. 정보주체와 법정대리인의 권리·의무 및 그 행사방법 이용자는 개인정보주체로써 다음과 같은 권리를 행사할 수
                                있습니다.
                            </h3>
                            <div>
                                ① 정보주체는 이노그리드(‘www.smartocean.com’이하 ‘UNIQ Cloud Platform) 에 대해 언제든지 다음 각 호의 개인정보 보호
                                관련 권리를 행사할 수 있습니다.
                                <br />
                                1. 개인정보 열람요구
                                <br />
                                2. 오류 등이 있을 경우 정정 요구
                                <br />
                                3. 삭제요구
                                <br />
                                4. 처리정지 요구
                                <br />
                            </div>
                            <br />
                            <h3 style={{ color: "black" }}>6. 처리하는 개인정보의 항목 작성 </h3>
                            <div>
                                ① &lt;이노그리드&gt;('www.smartocean.com'이하 'UNIQ Cloud Platform')은(는) 다음의 개인정보 항목을 처리하고 있습니다.
                                <br />
                                1&lt;이메일, 휴대전화번호&gt;
                                <br />
                                - 필수항목 : 이메일, 휴대전화번호
                                <br />
                                - 선택항목 :<br />
                            </div>
                            <br />
                            <br />
                            <h3 style={{ color: "black" }}>
                                7. 개인정보의 파기&lt;이노그리드&gt;('UNIQ Cloud Platform')은(는) 원칙적으로 개인정보 처리목적이 달성된 경우에는
                                지체없이 해당 개인정보를 파기합니다. 파기의 절차, 기한 및 방법은 다음과 같습니다.
                            </h3>
                            <div>
                                -파기절차
                                <br />
                                이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져(종이의 경우 별도의 서류) 내부 방침 및 기타 관련
                                법령에 따라 일정기간 저장된 후 혹은 즉시 파기됩니다. 이 때, DB로 옮겨진 개인정보는 법률에 의한 경우가
                                아니고서는 다른 목적으로 이용되지 않습니다.
                                <br />
                                <br />
                                -파기기한
                                <br />
                                이용자의 개인정보는 개인정보의 보유기간이 경과된 경우에는 보유기간의 종료일로부터 5일 이내에, 개인정보의
                                처리 목적 달성, 해당 서비스의 폐지, 사업의 종료 등 그 개인정보가 불필요하게 되었을 때에는 개인정보의 처리가
                                불필요한 것으로 인정되는 날로부터 5일 이내에 그 개인정보를 파기합니다.
                                <br />
                            </div>
                            <br />
                            <h3 style={{ color: "black" }}>8. 개인정보 자동 수집 장치의 설치•운영 및 거부에 관한 사항</h3>
                            <div>
                                ① 이노그리드 은 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 ‘쿠기(cookie)’를
                                사용합니다. ② 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에게 보내는 소량의
                                정보이며 이용자들의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다. 가. 쿠키의 사용 목적 : 이용자가 방문한 각
                                서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부, 등을 파악하여 이용자에게 최적화된
                                정보 제공을 위해 사용됩니다. 나. 쿠키의 설치•운영 및 거부 : 웹브라우저 상단의 도구 > 인터넷 옵션 >개인정보
                                메뉴의 옵션 설정을 통해 쿠키 저장을 거부 할 수 있습니다. 다. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에
                                어려움이 발생할 수 있습니다.
                                <br />
                            </div>
                            <br />
                            <h3 style={{ color: "black" }}>9. 개인정보 보호책임자 작성 </h3>
                            <div>
                                ① 이노그리드(‘www.smartocean.com’이하 ‘UNIQ Cloud Platform) 은(는) 개인정보 처리에 관한 업무를 총괄해서 책임지고,
                                개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를
                                지정하고 있습니다.
                                <br />
                                <br />
                                ▶ 개인정보 보호책임자 <br />
                                성명 :김철수
                                <br />
                                직책 :책임연구원
                                <br />
                                직급 :팀장
                                <br />
                                연락처 :010-1234-5678, naver@naver.com, 02-123-5678
                                <br />
                                ※ 개인정보 보호 담당부서로 연결됩니다.
                                <br />
                                <br />
                                ▶ 개인정보 보호 담당부서
                                <br />
                                부서명 :<br />
                                담당자 :<br />
                                연락처 :, , <br />
                                <br />
                                ② 정보주체께서는 이노그리드(‘www.smartocean.com’이하 ‘UNIQ Cloud Platform) 의 서비스(또는 사업)을 이용하시면서
                                발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로
                                문의하실 수 있습니다. 이노그리드(‘www.smartocean.com’이하 ‘UNIQ Cloud Platform) 은(는) 정보주체의 문의에 대해 지체
                                없이 답변 및 처리해드릴 것입니다.
                                <br />
                            </div>
                            <br />
                            <h3 style={{ color: "black" }}>10. 개인정보 처리방침 변경</h3>
                            <div>
                                ①이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는
                                경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
                                <br />
                            </div>
                            <br />
                            <h3 style={{ color: "black" }}>
                                11. 개인정보의 안전성 확보 조치 &lt;이노그리드&gt;('UNIQ Cloud Platform')은(는) 개인정보보호법 제29조에 따라 다음과
                                같이 안전성 확보에 필요한 기술적/관리적 및 물리적 조치를 하고 있습니다.
                            </h3>
                            <div>
                                1. 개인정보 취급 직원의 최소화 및 교육
                                <br />
                                개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화 하여 개인정보를 관리하는 대책을 시행하고
                                있습니다.
                                <br />
                                <br />
                                2. 내부관리계획의 수립 및 시행
                                <br />
                                개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고 있습니다.
                                <br />
                                <br />
                                3. 해킹 등에 대비한 기술적 대책
                                <br />
                                &lt;이노그리드&gt;('UNIQ Cloud Platform')은 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여
                                보안프로그램을 설치하고 주기적인 갱신·점검을 하며 외부로부터 접근이 통제된 구역에 시스템을 설치하고
                                기술적/물리적으로 감시 및 차단하고 있습니다.
                                <br />
                                <br />
                                4. 개인정보의 암호화
                                <br />
                                이용자의 개인정보는 비밀번호는 암호화 되어 저장 및 관리되고 있어, 본인만이 알 수 있으며 중요한 데이터는 파일
                                및 전송 데이터를 암호화 하거나 파일 잠금 기능을 사용하는 등의 별도 보안기능을 사용하고 있습니다.
                                <br />
                                <br />
                                5. 접속기록의 보관 및 위변조 방지
                                <br />
                                개인정보처리시스템에 접속한 기록을 최소 6개월 이상 보관, 관리하고 있으며, 접속 기록이 위변조 및 도난,
                                분실되지 않도록 보안기능 사용하고 있습니다.
                                <br />
                                <br />
                                6. 개인정보에 대한 접근 제한
                                <br />
                                개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여,변경,말소를 통하여 개인정보에 대한 접근통제를
                                위하여 필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.
                                <br />
                                <br />
                                7. 문서보안을 위한 잠금장치 사용
                                <br />
                                개인정보가 포함된 서류, 보조저장매체 등을 잠금장치가 있는 안전한 장소에 보관하고 있습니다.
                                <br />
                                <br />
                                8. 비인가자에 대한 출입 통제
                                <br />
                                개인정보를 보관하고 있는 물리적 보관 장소를 별도로 두고 이에 대해 출입통제 절차를 수립, 운영하고 있습니다.
                                <br />
                            </div>
                            <br />
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
export default withStyles(styles)(privacy);
