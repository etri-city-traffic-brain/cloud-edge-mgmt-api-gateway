import React from "react";

class sub_nav extends React.Component {
  render() {
    return (
      <section className="sub_nav">
        <h2>데이터</h2>
        <div className="sub_nav_menu">
          <a href="/src/data.html">전체</a>
          <a href="/src/data_oda.html" className="on">
            오픈데이터 API
          </a>
          <a href="/src/data_file.html">파일데이터</a>
          <a href="/src/data_recommend.html">오픈데이터 추천</a>
        </div>
      </section>
    );
  }
}

export default sub_nav;
