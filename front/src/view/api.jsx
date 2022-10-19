import React from "react";

class api extends React.Component {
    render() {
        return (
            <div>
                <title />
                <meta httpEquiv="Content-Type" content="text/html;charset=utf-8" />
                <meta httpEquiv="Content-Script-Type" content="text/javascript" />
                <meta httpEquiv="Content-Style-Type" content="text/css" />
                <meta name="Author" content />
                <meta name="Keywords" content />
                <meta name="Description" content />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1" />
                {/*[if lt IE 9]>
              
              <![endif]*/}
                <header>
                    <div className="header_logo_uniq">
                        <div className="contentInner">
                            <h1>
                                <a href="../">
                                    <img src="../lib/images/logo.png" alt="Open Data API Gateway" />
                                </a>
                            </h1>
                            <button className={"usermenu"} onClick={() => this.setState({ showSomething: true })}>
                                <li>사용자 설정</li>
                                <li>로그아웃</li>
                            </button>
                        </div>
                    </div>
                    {/* //header_logo_uniq */}
                    <div className="header_nav">
                        <div className="contentInner">
                            <nav>
                                <a href="../src/api.html" className="current">
                                    오픈 데이터 API 소개
                                </a>
                                <a href="../src/recommend.html">오픈 데이터 API 추천</a>
                                <a href="../src/myapi.html">내 오픈 데이터 API 관리</a>
                            </nav>
                        </div>
                    </div>
                    {/* //header_nav */}
                </header>
                <main className="main_aside">
                    <div className="contentInner">
                        <div className="tab_btns_wrap">
                            <div className="tab_btns">
                                <a href="api.html" className="current">
                                    표준산업분류
                                </a>
                                <a href="api_offerer.html">오픈데이터 제공처</a>
                            </div>
                        </div>
                        <div className="api_search">
                            <form method>
                                <div className="api_search_option">
                                    <div>
                                        <select id>
                                            <option value>전체</option>
                                        </select>
                                    </div>
                                    <div>
                                        <select id>
                                            <option value>중분류</option>
                                        </select>
                                    </div>
                                    <div>
                                        <select id>
                                            <option value>소분류</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="api_search_input">
                                    <div className="search_category">
                                        <li>전체</li>
                                        <li>중분류</li>
                                        <li>소분류</li>
                                    </div>
                                    <div className="search_input">
                                        <input type="text" id placeholder="검색어를 입력하세요." />
                                        <button type="submit" id>
                                            <span>Search</span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {/* //api_search */}
                        <ul className="api_detailIist">
                            <li>
                                <div className="detailIist_tit">
                                    <input type="checkbox" id />
                                    <label htmlFor>도로명주소조회서비스</label>
                                    <div className="btns">
                                        <span className>사용신청완료</span>
                                    </div>
                                </div>
                                <div className="detailIist_cont">
                                    우정사업본부에서는 도로명주소 체계로 변경되는 새우편번호 및 기존 우편번호 정보를 조회하는 기능의
                                    오픈API입니다. 우정사업본부 에서는 도로명주소 체계로 변경되는 새우편번호 및 기존 우편번호 정보를
                                    조회하는 기능의 오픈API입니다.
                                </div>
                                <div className="detailIist_info">
                                    <span>
                                        활용 :<strong>FILE</strong>
                                    </span>
                                    <span>
                                        결과 :<strong>TEXT</strong>
                                    </span>
                                    <span>
                                        제공처 :<strong>공공데이터포털</strong>
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div className="detailIist_tit">
                                    <input type="checkbox" id />
                                    <label htmlFor>도로명주소조회서비스</label>

                                    <div className="btns">
                                        <button type="button" className="btn_detail_download">
                                            다운로드
                                        </button>
                                    </div>
                                </div>
                                <div className="detailIist_cont">
                                    우정사업본부에서는 도로명주소 체계로 변경되는 새우편번호 및 기존 우편번호 정보를 조회하는 기능의
                                    오픈API입니다. 우정사업본부 에서는 도로명주소 체계로 변경되는 새우편번호 및 기존 우편번호 정보를
                                    조회하는 기능의 오픈API입니다.
                                </div>
                                <div className="detailIist_info">
                                    <span>
                                        활용 :<strong>FILE</strong>
                                    </span>
                                    <span>
                                        결과 :<strong>TEXT</strong>
                                    </span>
                                    <span>
                                        제공처 :<strong>공공데이터포털</strong>
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div className="detailIist_tit">
                                    <input type="checkbox" id />
                                    <label htmlFor>도로명주소조회서비스</label>

                                    <div className="btns">
                                        <button type="button" className="btn_detail_app">
                                            사용신청
                                        </button>
                                    </div>
                                </div>
                                <div className="detailIist_cont">
                                    우정사업본부에서는 도로명주소 체계로 변경되는 새우편번호 및 기존 우편번호 정보를 조회하는 기능의
                                    오픈API입니다. 우정사업본부 에서는 도로명주소 체계로 변경되는 새우편번호 및 기존 우편번호 정보를
                                    조회하는 기능의 오픈API입니다.
                                </div>
                                <div className="detailIist_info">
                                    <span>
                                        활용 :<strong>FILE</strong>
                                    </span>
                                    <span>
                                        결과 :<strong>TEXT</strong>
                                    </span>
                                    <span>
                                        제공처 :<strong>공공데이터포털</strong>
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div className="detailIist_tit">
                                    <input type="checkbox" id />
                                    <label htmlFor>도로명주소조회서비스</label>

                                    <div className="btns">
                                        <button type="button" className="btn_detail_app">
                                            사용신청
                                        </button>
                                    </div>
                                </div>
                                <div className="detailIist_cont">
                                    우정사업본부에서는 도로명주소 체계로 변경되는 새우편번호 및 기존 우편번호 정보를 조회하는 기능의
                                    오픈API입니다. 우정사업본부 에서는 도로명주소 체계로 변경되는 새우편번호 및 기존 우편번호 정보를
                                    조회하는 기능의 오픈API입니다.
                                </div>
                                <div className="detailIist_info">
                                    <span>
                                        활용 :<strong>FILE</strong>
                                    </span>
                                    <span>
                                        결과 :<strong>TEXT</strong>
                                    </span>
                                    <span>
                                        제공처 :<strong>공공데이터포털</strong>
                                    </span>
                                </div>
                            </li>
                        </ul>
                        <div className="btm_btn">
                            <button type="button" className="btn_confirm">
                                즐겨찾기 추가
                            </button>
                        </div>
                        <aside>
                            <section>
                                <h3>인기 검색어</h3>
                                <ol className="popula_list">
                                    <li>도로명주소 조회 서비스</li>
                                    <li>도로명주소조회</li>
                                    <li>상가(상권)정보</li>
                                    <li>도로명주소 조회 서비스</li>
                                    <li>도로명주소조회</li>
                                </ol>
                            </section>
                        </aside>
                    </div>
                    {/* //contentInner */}
                </main>
                <footer>
                    <div className="contentInner">
                        <h1>
                            <img src="../lib/images/logo_footer.png" alt="Cloudit Knowledge Base" />
                        </h1>
                        <div className="footer_menu">
                            <li>개인정보취급방침</li>
                            <li>오시는길</li>
                            <li>사이트맵</li>
                        </div>
                        <address>
                            <p>서울시 서초구 강남대로 623, 10층 ( 서울시 서초구 잠원동 12-5, 우일빌딩 )</p>
                            <p>
                                TEL : 02. 516. 5990<span>/</span>FAX : 02. 516. 5997
                            </p>
                            <p className="copyright">COPYRIGHT 2018 innogrid. All right reserved.</p>
                        </address>
                    </div>
                </footer>
                <div className="popup">
                    <h3>알림</h3>
                    <div className="pop_cont_wrap">
                        <div className="pop_cont">
                            <div className="pop_cont_inner">
                                <p>선택된 Open API를 보관할 분류를 선택해 주세요.</p>
                                <select id>
                                    <option value>openAPI 분류 N</option>
                                </select>
                            </div>
                        </div>
                        <div className="pop_btns">
                            <button type="button" id className="btn_pop_cancel">
                                취소
                            </button>
                            <button type="submit" id className="btn_pop_submit">
                                확인
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default api;
