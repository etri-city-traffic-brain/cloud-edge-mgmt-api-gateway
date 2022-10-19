import React from "react";
import axios from "axios";
import history from '../../js/history.js';
import PropTypes from "prop-types";
import styles from '../../assets/css/style.css';
import config  from "../../js/config.js";

var myrows = [

];

myrows.sort((a, b) => (a.calories < b.calories ? -1 : 1));

class sub_bigdata_carddetail extends React.Component {
    constructor(...props) {
        super(...props);
        
        this.handleClick = this.handleClick.bind(this);

        this.handlePopupOpen = this.handlePopupOpen.bind(this);

        this.handleReturnCardList = this.handleReturnCardList.bind(this);

        this.handleApiApply = this.handleApiApply.bind(this);
        
        this.state.tool_no = this.props.tool_no;

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

    handleApiApply()
    {
      var urlstring = config.serverpoint + '/api/request/' + this.props.openapi_no;

      // console.log(urlstring);

      axios.post(urlstring,
        {user_id : sessionStorage.getItem("user")})
        
      .then(response => 
      {
          this.state.rows = response.data[0];

          this.setState({
              fetching: false // done!
          });
          if(response.data == "이미 활용 신청 되어 있음"){
            // console.log('information 신청 = ' + response.data);
            alert("이미 신청 완료한 API 입니다.");
            //history.push('/src/data_oda.html');
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

    };

    _getData = async () => {
        this.setState({
            fetching: true // requesting..
        });

        var urlstring = config.serverpoint + '/tool/bigdata/' + this.props.tool_no;

        // console.log('aaa url: ' + urlstring);

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

            await axios.get(urlstring)
            .then(response => 
            {
                this.state.rows2 = response.data;

                this.setState({
                    fetching2: false // done!
                });

            }) // SUCCESS
            .catch(response => { 
              // console.log(response); 
            }); // ERROR


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
        const { rows, rows2, rowsPerPage, page } = this.state;
        // console.log('count: ' + this.state.rows.views_count);
        return (


            <div className="layout_sub_cont">
                <div className="cont_data_detail_tit">데이터 툴 정보</div>
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
                  <td>{this.state.rows.url}</td>
                  <th>서비스유형</th>
                  <td>{this.state.rows.activity_type}</td>
                </tr>
                <tr>
                  <th>제공형태</th>
                  <td>{this.state.rows.filetype}</td>
                  <th>카테고리</th>
                  <td>{this.state.rows.category}</td>
                </tr>
                <tr>
                  <th>분류</th>
                  <td>{this.state.rows.category}</td>
                  <th>등록일</th>
                  <td>{this.state.rows.update_time}</td>
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
            {/* <div className="cont_data_detail_att">
            <span>참고사이트</span>
              <a href="#">오픈데이터 API 활용 참고 사이트 </a>
            </div>
*/}
            <h4 className="cont_data_detail_subtit">안내</h4>
   
{/*         <table className="tb_data_detail">
              <colgroup>
                <col
                  style={{
                    width: "130px"
                  }}
                />
              </colgroup>
              
            </table>

            샘플 코드
            <div className="cont_data_detail_atts">           
            {this.state.fetching2 == false && this.state.rows2[0].code}
            </div> */}
            

            상세 기능 정보
            <table className="tb_mypage_list">
              <thead>
                <tr>
                  <th>번호</th>                  
                  <th>오픈 데이터 API 이름</th>
                  <th>설명</th>
                  <th>트래픽 제한</th>
                  <th>심의 결과</th>
                  <th>요청 변수</th>
                </tr>
              </thead>
              <tbody >

                  {this.state.fetching2 == false && this.state.rows2
  
  .map((row, index) => {
return (

  <>
  <tr>
    <td>{index + 1}</td>

    <td>
      {/* <a href="mypage_detail.html"> */}
      {row.name}
      {/* </a> */}
    </td>
    <td>{row.comment}</td>
   
    <td> {row.provider_traffic}</td>
    <td>{row.provider_deliberate}</td>
    <td>
      <button
        type="button"
        className="btn_mypage_list js_tbopen_btn"
        id={"viewButton_"+(index+1)}
        onClick={() => document.getElementById("view"+(index+1)).style.display = null}
      >
        보기
      </button>
    </td>
  </tr>
    <tr id={"view"+(index+1)} style={{ display: "none"}}>
    <td colSpan="8" className="td_inner_wrap">
      <div className="cont_mypage_detail_inner">
        <button
            type="button"
            className="btn_mypage_list_close js_tbclose_btn"
            id={"closeButton_"+(index+1)}
            onClick={() => document.getElementById("view"+(index+1)).style.display = "none"}
        >
          닫기
        </button>
        <div className="cont_mypage_detail_inner_tit"></div>
        <table className="tb_mypage_detail_inner">
          <tr>
            <th>오픈데이터 API 이름</th>
            <td>{row.name}</td>
            <th>활동 유형</th>
            <td>{row.activity_type}</td>
          </tr>
          <tr>
            <th>오픈데이터 제공처</th>
            <td>{row.provider}</td>
            <th>데이터 사용량</th>
            <td>
              {row.points == null && ("0/1000건")}
              {row.points != null && (row.points+"/1000건")}
            </td>
          </tr>          
          <tr>
            <th>URL</th>
            <td colSpan={"3"}>{row.url}</td>
          </tr>
          <tr>
            <th>설명</th>
            <td colSpan={"3"}>{row.comment}</td>
          </tr>
        </table>
      </div>
    </td>
  </tr>
</>
)


})}
    </tbody>
            </table>
            <div className="cont_data_btns">
              <button type="button" className="btn_btm_submit" onClick = {this.handlePopupOpen}>
                즐겨찾기 추가
              </button>
              <button type="button" className="btn_btm_cancel" onClick = {this.handleReturnCardList}>
                취소
              </button>
            </div>
          </div>

        );
    }


}

export default sub_bigdata_carddetail;


