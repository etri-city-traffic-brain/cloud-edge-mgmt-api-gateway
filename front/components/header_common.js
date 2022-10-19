import React from "react";

import session_nav from "./layout/session_nav";

class header_common extends React.Component {
    render() {
        return (
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
                <nav className="header_nav">
                    <div className="layout_inner layout_clearfix">
                        <button type="button" className="header_nav_btn js_arr_toggle js_nav_btn">
                            전체메뉴
                        </button>
                        <ul className="header_nav_menu">
                            <li>
                                <a href="/src/guide.html">이용안내</a>
                            </li>
                            <li className="on">
                                <a href="/src/data.html">데이터</a>
                                <div className="header_nav_menu_sub js_nav_menu">
                                    <a href="/src/data_oda.html">오픈데이터 API</a>
                                    <a href="/src/data_file.html">파일데이터</a>
                                    <a href="/src/data_recommend.html">오픈데이터 추천</a>
                                </div>
                            </li>
                            <li>
                                <a href="/src/lib_notice.html">정보공유</a>
                                <div className="header_nav_menu_sub js_nav_menu">
                                    <a href="/src/lib_notice.html">공지사항</a>
                                    <a href="/src/lib_board.html">자유게시판</a>
                                    <a href="/src/lib_request.html">API 요청 게시판</a>
                                </div>
                            </li>
                            <li>
                                <a href="/src/mypage.html">마이페이지</a>
                                <div className="header_nav_menu_sub js_nav_menu">
                                    <a href="/src/mypage.html">나의 오픈 API</a>
                                    <a href="/src/mypage_history.html">나의 사용이력</a>
                                    <a href="/src/mypage_favorites.html">즐겨찾기</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    {}
                </nav>
            </header>
        );
    }
}

export default header_common;
