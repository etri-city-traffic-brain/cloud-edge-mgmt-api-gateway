import React from "react";

class header_nav extends React.Component {
  render() {
    return (
      <nav className="header_nav">
        <div className="layout_inner layout_clearfix">
          <button
            type="button"
            className="header_nav_btn js_arr_toggle js_nav_btn"
          >
            전체메뉴
          </button>
          <ul className="header_nav_menu">
            <li className="on">
              <a href="/src/guide.html">이용안내</a>
            </li>
            <li>
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
    );
  }
}

export default header_nav;
