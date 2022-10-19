import React from "react";
import header_nav from "./header_nav";
import main_sub from "./main_sub";
import session_nav from "./layout/session_nav";

class layout_wrap_sub extends React.Component {
    render() {
        return (
            <div className="layout_wrap_sub">
                <header className="header_common">
                    <div className="layout_inner">
                        <div className="header_top layout_clearfix">
                            <h1 className="header_top_logo">
                                <a href="/">
                                    <img src="/lib/images/header_logo_uniq.png" alt="Cloudit" />
                                </a>
                            </h1>
                            {session_nav()}
                        </div>
                        {}
                    </div>
                    {}
                    <header_nav />
                </header>
                <section className="sub_nav">
                    <h2>이용안내</h2>
                </section>
                {}
                <main_sub />
                <footer className="footer_common">
                    <div className="footer_cont">
                        <div className="layout_inner layout_clearfix">
                            <div className="footer_cont_logo">
                                <a href="#">
                                    <img src="/lib/images/footer_logo_inno.png" alt="이노그리드" />
                                </a>
                                <a href="#">
                                    <img src="/lib/images/footer_logo_molit.png" alt="\uAD6D\uD1A0\uAD50\uD1B5\uBD80" />
                                </a>
                                <a href="#">
                                    <img src="/lib/images/footer_logo_innogrid.png" alt="\uC774\uB178\uADF8\uB9AC\uB4DC" />
                                </a>
                            </div>
                            <div className="footer_cont_menu">
                                <a href="#">이용약관</a>
                                <a href="#">개인정보처리방침</a>
                                <a href="#">이메일</a>
                            </div>
                        </div>
                    </div>
                    {}
                    <div className="footer_address">
                        <div className="layout_inner layout_clearfix">
                            <div className="footer_address_company">
                                <p className="footer_address_company_address">
                                    서울시 서초구 강남대로 623 우일빌딩 10층 ( 서울시 서초구 잠원동 12-5,6 ) 이노그리드
                                </p>
                                <p>
                                    대표이사 : 김명진    사업자 등록번호 : 12-73037383
                                    <br />
                                    통신판매업신고 : 제 2012-서울강남-00571호
                                </p>
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

export default layout_wrap_sub;
