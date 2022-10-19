import React from "react";
import axios from "axios";
import history from '../../js/history.js';
import PropTypes from "prop-types";
import styles from '../../assets/css/style.css';
import config  from "../../js/config.js";
import $ from "jquery";
window.$ = $;

var myrows = [

];
// window.onbeforeunload = function(e) {	
  // history.push('/src/mypage.html');
// };

myrows.sort((a, b) => (a.calories < b.calories ? -1 : 1));

class sub_Oda_carddetail extends React.Component {
    constructor(...props) {
        super(...props);
        
        this.handleClick = this.handleClick.bind(this);

        this.handlePopupOpen = this.handlePopupOpen.bind(this);

        this.handleReturnCardList = this.handleReturnCardList.bind(this);

        this.handleApiApply = this.handleApiApply.bind(this);
        
        this.state.openapi_no = this.props.openapi_no;

        this.state.returnPopupOpen = this.props.returnPopupOpen;

        this.state.returnTabClose = this.props.returnTabClose;

      }
    
      handleReady()
      {
        alert("준비중 입니다.")
      }

    handleClick(v) {
        this.state.page = v;
    }

    handlePopupOpen() {
        this.props.returnPopupOpen();
    }

    handleReturnCardList() {
        this.props.returnTabClose();
    }
    handleChange = name => event => {
      this.setState({
        [name]: event.target.value,
      });
    };

    handleApiApply()
    {
      
      if(!this.state.radio1){
        alert("활용 목적을 골라주세요")
        // window.location.reload(); 
        return;
      }

      var urlstring = config.serverpoint + '/api/request/' + this.props.openapi_no;

      // console.log(urlstring);
      console.log('radio1: ' + this.state.radio1);

      axios.post(urlstring,
        {user_id : sessionStorage.getItem("user"),
         objects : this.state.radio1
      }
      )
        
      .then(response => 
      {
          this.state.rows = response.data[0];

          this.setState({
              fetching: false // done!
          });
          if(response.data == "이미 활용 신청 되어 있음"){
            // console.log('information 신청 = ' + response.data);
            alert("이미 신청 완료한 API 입니다.");
            window.location.reload(); 
          }

          else if (sessionStorage.getItem("user")) {      
            // console.log(":test:" + sessionStorage.getItem("user"));
            // console.log('information 신청 = ' + response.data);
            alert("신청 완료 되었습니다.");
            history.push('/src/mypage.html');
          }
         
          else {
            alert("로그인이 필요한 서비스 입니다.")
            history.push('/login');
          }
          
          // alert("신청 완료 되었습니다.");
          // history.push('/src/mypage.html');
          

      }) // SUCCESS
      .catch(response => { 
        // console.log(response); 
      }); // ERROR
    }

    state =
        {
            rows: myrows,
            page: 0,
            rowsPerPage: 10,
            pagemax: 0
        };

    componentDidMount = () => {
        this._getData();
        this.onBackButtonEvent();
        
        // window.addEventListener("onunload", function (event) {
          // return "내용을 잃어버릴 수도 있습니다. 그래도 나가시겠습니까?";
          // window.beforeunload = this.props.returnTabClose();
        // });
    };

  //   componentDidUpdate = () => {
      
  //     this.onBackButtonEvent();
  //     alert("aaa");
  //     console.log("aaa");
  // };

    //뒤로가기
    onBackButtonEvent = (e) => {
      // window.beforeunload = this.props.returnTabClose();
      window.onbeforeunload = function(e){
        history.push('/src/data_oda.html');
        return false;
        
      };
    };

    _getData = async () => {
        this.setState({
            fetching: true // requesting..
        });

        var urlstring = config.serverpoint + '/apilist/' + this.props.openapi_no;

        // console.log('url: ' + urlstring);

        await axios.get(urlstring)
            .then(response => 
            {
                this.state.rows = response.data[0];

                this.setState({
                    fetching: false // done!
                });

            }) // SUCCESS
            .catch(response => { 
              // console.log(response); 
            }); // ERROR

            // window.onbeforeunload = this.props.returnTabClose();
            window.addEventListener('beforeunload', (event) => {
              // this.state.returnTabClose();
            });
    };



    handleFirstPageButtonClick = event => {

    };

    handleBackButtonClick = event => {

        if (this.state.page > 10) {
            this.state.page -= 10;
            this.state.page = parseInt(this.state.page / this.state.rowsPerPage) * this.state.rowsPerPage + 1
        }

    };

    handleNextButtonClick = event => {

        this.state.page += 10;
        this.state.page = parseInt(this.state.page / this.state.rowsPerPage) * this.state.rowsPerPage + 1
    };

    handleLastPageButtonClick = event => {

    };

    handleChangePage = (event, page) => {

    };


    handleChangeRowsPerPage = event => {

    };

    handleCursorClick = (event, pagenum) => {
        // console.log(pagenum);
    };

    render() {
        const { rows, rowsPerPage, page } = this.state;
        // console.log('count: ' + this.state.rows.views_count);
        return (


            <div className="layout_sub_cont">
                <div className="cont_data_detail_tit">Open Data 활용 신청</div>
            <table className="tb_data_detail">
              <colgroup>
                <col
                  style={{
                    width: "130px"
                  }}
                />
                <col />
                <col
                  style={{
                    width: "130px"
                  }}
                />
              </colgroup>
              <tbody>
                <tr>
                  <th>서비스명</th>
                  <td>{this.state.rows.name}</td>
                  <th>제공처</th>
                  <td>{this.state.rows.provider}</td>
                </tr>
                <tr>
                  <th>URL</th>
                  <td>{this.state.rows.provider_url}</td>
                  <th>서비스유형</th>
                  <td>{this.state.rows.activity_type}</td>
                </tr>
                <tr>
                  <th>제공형태</th>
                  <td>{this.state.rows.filetype}</td>
                  <th>활용기간</th>
                  <td>{this.state.rows.provider_term}</td>
                </tr>
                <tr>
                  <th>분류</th>
                  <td>{this.state.rows.category}</td>
                  <th>등록일</th>
                  <td>{this.state.rows.update_time}</td>
                </tr>
                <tr>
                  <th>심의여부</th>
                  <td>{this.state.rows.provider_deliberate}</td>
                  <th>처리상태</th>
                  <td>{this.state.rows.provider_status}</td>
                </tr>
                <tr>
                  <th>담당자</th>
                  <td>{this.state.rows.provider_person}</td>
                  <th>전화번호</th>
                  <td>{this.state.rows.provider_phone}</td>
                </tr>
                <tr>
                  <th>태그</th>
                  <td>{this.state.rows.keyword}</td>
                  <th>트래픽 제한</th>
                  <td>{this.state.rows.provider_traffic}</td>
                </tr>
                <tr className="tb_data_detail_line">
                  <th>설명</th>
                  <td colSpan={3}>
                    {this.state.rows.comment}
                    
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="cont_data_detail_att">
            <span>참고사이트</span>
              <a href={this.state.rows.provider_url} target="_blank">오픈데이터 API 활용 참고 사이트 </a>              
            </div>

            {/* <h4 className="cont_data_detail_subtit">안내</h4>
            <table className="tb_data_detail">
              <colgroup>
                <col
                  style={{
                    width: "130px"
                  }}
                />
              </colgroup>
              <tbody>
                <tr>
                  <th>
                    위치기반 서비스
                    <br />
                    사업자 확인
                  </th>
                  <td>
                    <div className="cont_tb_description">
                      공공데이터중 위치정보를 포함한 서비스를 사용하고자 하는
                      사업자는 '위치정보의 보호 및 이용 등에 관한 법률' 에 따라
                      방송통신위원회에 '위치정보서비스 허가' 를 받거나 '위치기반
                      서비스사업 신고' 를 하여야 합니다. 이에 해당하는 사업자인
                      경우에는 첨부파일에 '위치기반서비스사업신고필증' 을 첨부해
                      주시기 바랍니다. 활용신청 시 '위치기반서비스사업신고필증'
                      이 등록되지 않으면 반려가 될 수 있으니 참고 하시기
                      바랍니다.
                    </div>
                  </td>
                </tr>
              </tbody> */}

            <h4 className="cont_data_detail_subtit">활용 정보</h4>
            <div className>
              <span className="cont_data_detail_option_tit">&nbsp;활용 목적</span>
              <input type="radio" name="radiogroup" id="radio1" value="웹 사이트 개발" onChange={this.handleChange('radio1')}/>
              <label htmlFor="radio1">웹 사이트 개발&nbsp;</label>
              <input type="radio" name="radiogroup" id="radio2" value="앱 개발" onChange={this.handleChange('radio1')}/>
              <label htmlFor="radio2">앱 개발&nbsp;</label>
              <input type="radio" name="radiogroup" id="radio3" value="기타" onChange={this.handleChange('radio1')}/>
              <label htmlFor="radio3">기타&nbsp;</label>
              <input type="radio" name="radiogroup" id="radio4" value="참고 자료" onChange={this.handleChange('radio1')}/>
              <label htmlFor="radio4">참고 자료&nbsp;</label>
              <input type="radio" name="radiogroup" id="radio5" value="연구" onChange={this.handleChange('radio1')}/>
              <label htmlFor="radio5">연구&nbsp;</label>
            </div>
            <div className="cont_data_btns">
              <button type="button" className="btn_btm_submit" onClick = {this.handlePopupOpen}>
                즐겨찾기 추가
              </button>
              <button type="submit" className="btn_btm_submit" onClick = {this.handleApiApply}>
                신청
              </button>
              <button type="button" className="btn_btm_cancel" onClick = {this.handleReturnCardList}>
                취소
              </button>
            </div>
          </div>

        );
    }


}

export default sub_Oda_carddetail;


