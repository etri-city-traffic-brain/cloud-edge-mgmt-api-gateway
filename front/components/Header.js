import React from "react";

class Header extends React.Component {
    render() {
        return (
            <header className="header_common">
                <div className="layout_inner">
                    <div className="header_top layout_clearfix">
                        <h1 className="header_top_logo">
                            <a href="#home">
                                <img src="/lib/images/header_logo_uniq.png" alt="Cloudit" />
                            </a>
                        </h1>
                        <div className="header_top_user">
                            <a href="#LOGIN">LOGIN</a>
                            <a href="#SIGNUP">SIGNUP</a>
                        </div>
                    </div>
                    {}
                    <div className="header_cont layout_clearfix">
                        <div className="header_cont_search">
                            <div className="header_cont_search_wrap">
                                <form method>
                                    <div className="header_cont_search_option js_list_select">
                                        <button type="button" className="header_cont_search_option_btn js_arr_toggle">
                                            <span>검색조건</span>
                                        </button>
                                        <ul>
                                            <li>
                                                <input type="radio" id="option1" name="option-group" />
                                                <label htmlFor="option1">Option 1</label>
                                            </li>
                                            <li>
                                                <input type="radio" id="option2" name="option-group" />
                                                <label htmlFor="option2">Option 2</label>
                                            </li>
                                            <li>
                                                <input type="radio" id="option3" name="option-group" />
                                                <label htmlFor="option3">Option 3</label>
                                            </li>
                                            <li>
                                                <input type="radio" id="option4" name="option-group" />
                                                <label htmlFor="option4">Option 4</label>
                                            </li>
                                        </ul>
                                    </div>
                                    {}
                                    <input type="text" id className="header_cont_search_input" />
                                    <button type="submit" id className="header_cont_search_btn">
                                        <span>Search</span>
                                    </button>
                                </form>
                            </div>
                            {}
                        </div>
                        {}
                        <div className="header_cont_count">
                            <div>
                                <span>
                                    All
                                    <br />
                                    Open Data
                                </span>
                                <strong>25,818</strong>
                            </div>
                            <div>
                                <span>
                                    New
                                    <br />
                                    Open Data
                                </span>
                                <strong>218</strong>
                            </div>
                        </div>
                        {}
                        <div className="header_cont_notice">
                            <h3>NOTICE</h3>
                            <div className="swiper-container">
                                <ul className="swiper-wrapper">
                                    <li className="swiper-slide">
                                        <a href="#">건물정보 부동산 중개업 정보(일간)</a>
                                    </li>
                                    <li className="swiper-slide">
                                        <a href="#">건물정보 부동산 중개업 정보</a>
                                    </li>
                                    <li className="swiper-slide">
                                        <a href="#">오픈데이터 사이트 오픈했습니다. 많은 이용부탁드립니다.</a>
                                    </li>
                                </ul>
                            </div>
                            {}
                        </div>
                        {}
                    </div>
                    {}
                </div>
                {}
                <nav className="header_nav">
                    <div className="layout_inner layout_clearfix">
                        <button type="button" className="header_nav_btn js_arr_toggle js_nav_open">
                            전체메뉴
                        </button>
                        <ul className="header_nav_manu js_nav_open">
                            <li>
                                <a href="#">이용안내</a>
                            </li>
                            <li>
                                <a href="#">데이터</a>
                                <ul>
                                    <li>
                                        <a href="#">오픈데이터 API</a>
                                    </li>
                                    <li>
                                        <a href="#">File 데이터</a>
                                    </li>
                                    <li>
                                        <a href="#">오픈데이터 추천</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">정보공유</a>
                                <ul>
                                    <li>
                                        <a href="#">공지사항</a>
                                    </li>
                                    <li>
                                        <a href="#">자유게시판</a>
                                    </li>
                                    <li>
                                        <a href="#">API 요청 게시판</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">마이페이지</a>
                                <ul>
                                    <li>
                                        <a href="#">나의 오픈 API</a>
                                    </li>
                                    <li>
                                        <a href="#">나의 사용이력</a>
                                    </li>
                                    <li>
                                        <a href="#">즐겨찾기</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    {}
                </nav>
            </header>
        );
    }
}

export default Header;
