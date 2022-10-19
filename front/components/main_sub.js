import React from "react";

class main_sub extends React.Component {
  render() {
    return (
      <main className="main_sub">
        <div className="layout_inner">
          <section className="cont_guide">
            <h3>오픈 데이터 API란?</h3>
            <div>
              API는 응용프로그램이나 서비스를 개발하는데 필요한 운영체제(OS)나
              라이브러리 등의 특정 기능을 추상화하여 사용하기 쉽도록 만든
              인터페이스로 Single UNIX Specification, Windows API 등을 말합니다.
              <br />
              Open API는 Web 2.0 API, 통신망 서비스 API 등 주로 인터넷이나
              통신망과 관련된 자원의 API를 의미하는 것으로, 여러 사람들이
              공동으로 사용할 필요가 있는 자원에 대하여 이 자원의 사용을
              개방하고, 사용자들이 자원에 대한 전문적인 지식이 없어도 쉽게
              사용할 수 있도록 기능을 추상화하여 표준화한 인터페이스를 말합니다.
              이러한 Open API 서비스는 아마존, 구글 등 글로벌 회사들이 자사의
              서비스를 일반 개발자, 타사 등에 개방하여 다양한 Mashup 서비스가
              생겨나게 하고, 이렇게 하는 것이 자사의 비즈니스를 더욱 확대하고
              수익을 창출하게 되는 계기가 되는 것이 입증되었기에, 국내에서도
              공공기관과 포털 사이트를 중심으로 Open API를 이용하여 자사의
              자원을 개방하는 서비스가 보편화되고 있는 추세입니다.
            </div>
          </section>
          <section className="cont_guide cont_guide_diagram">
            <h3>서비스 개요</h3>
            <div>
              <strong>Open Date API Gateway (ODAG)</strong> 는 다양한 기관에서
              독립적으로 제공하는 오픈데이터 정보를 통합 및 분류하고 개인화된
              추천 서비스를 제공합니다. ODAG를 통해 권하는 오픈데이터를 찾기
              위해 다수의 사이트를 방문해야 하는 번거로움이 줄어듭니다. 또한 S/W
              창업자에 최적화된 분류체계를 제공하면서 오픈데이터 정보의 접근성을
              높입니다.
            </div>
            <div className="cont_guide_diagram_img">
              <img 
             
              src={ require('../assets/images/guide_diagram.png')}
              alt />
            </div>
          </section>
          <section className="cont_guide">
            <div className="layout_clearfix">
              <h3>주요기능</h3>
              <p>ODAG의 주요 기능들을 살펴보세요.</p>
            </div>
            <div className="cont_guide_summary_wrap">
              <ul className="cont_guide_summary">
                <li>
                  <h4>오픈데이터 통합</h4>
                  <div>
                    정부기관, 지자체, 민간기업에서 제공하는
                    <br />
                    방대한 오픈데이터 정보들을 수집하고 이질적 형태의
                    <br />
                    정보들을 정형화된 포맷으로 정렬하여 사용자에게
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
                    다양한 산업군에 속한 S/W 창업자를
                    <br />
                    대상으로 필요한 오픈데이터에 손쉽게 접근할 수<br />
                    있는 분류 체계를 제공합니다. 이를 통해 방대한
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
                    이를 통해 방대한 양의 오픈데이터 정보 중<br />
                    가장 가치있는 정보를 선별하여 제공하게
                    <br />
                    되고 오픈데이터 활용률을 높입니다.
                  </div>
                </li>
              </ul>
            </div>
          </section>
          <section className="cont_guide">
            <div className="layout_clearfix">
              <h3>시스템 구성</h3>
              <p>ODAG의 시스템 구성을 살펴보세요.</p>
            </div>
            <div className="cont_guide_system">
              <img 
              src={ require('../assets/images/guide_system.png')}
              alt />
            </div>
          </section>
        </div>
        {}
      </main>
    );
  }
}

export default main_sub;
