import React from "react";

class main_shortcut extends React.Component {
  render() {
    return (
      <section className="main_shortcut">
        <div className="layout_inner">
          <a href="#" className="main_shortcut_medical">
            <span>보건의료</span>
          </a>
          <a href="#" className="main_shortcut_economy">
            <span>경제</span>
          </a>
          <a href="#" className="main_shortcut_culture">
            <span>문화관광</span>
          </a>
          <a href="#" className="main_shortcut_education">
            <span>교육</span>
          </a>
          <a href="#" className="main_shortcut_natunal">
            <span>환경</span>
          </a>
          <a href="#" className="main_shortcut_space">
            <span>공간정보</span>
          </a>
          <a href="#" className="main_shortcut_welfare">
            <span>복지</span>
          </a>
          <a href="#" className="main_shortcut_admin">
            <span>행정</span>
          </a>
          <a href="#" className="main_shortcut_food">
            <span>식품</span>
          </a>
          <a href="#" className="main_shortcut_farming">
            <span>농축수산</span>
          </a>
        </div>
      </section>
    );
  }
}

export default main_shortcut;
