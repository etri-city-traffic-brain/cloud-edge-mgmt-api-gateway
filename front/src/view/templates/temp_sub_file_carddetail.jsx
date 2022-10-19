import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import styles from '../../assets/css/style.css';
import config  from "../../js/config.js";

var myrows = [

];

myrows.sort((a, b) => (a.calories < b.calories ? -1 : 1));

class sub_file_carddetail extends React.Component {
    constructor(...props) {
        super(...props);
        
        this.handleClick = this.handleClick.bind(this);

        this.handlePopupOpen = this.handlePopupOpen.bind(this);

        this.handleReturnCardList = this.handleReturnCardList.bind(this);
        
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

        var urlstring = config.serverpoint + '/filedata/' + this.props.openapi_no;

        // console.log('url: ' + urlstring);
        
        // console.log(urlstring);

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
    };

    linkclick = () => {
        // console.log("링크 클릭")
        
        this.setState({
            fetching: true // requesting..
        });

        var urlstring = config.serverpoint + '/filedata/download/' + this.props.openapi_no;

        // console.log('url: ' + urlstring);
        
        // console.log(urlstring);

        axios.post(urlstring)
            .then(response => 
            {
                this.state.rows5 = response.data[0];

                this.setState({
                    fetching: false // done!
                });

            }) // SUCCESS
            .catch(response => { 
                // console.log(response); 
            }); // ERROR
    }

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
        return (

            <div>
                {this.state.fetching == false &&
            <div className="layout_sub_cont">
                    
                    <div className="cont_data_detail_tit">File Data 다운로드</div>
                    
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
                                <th>제공형태</th>
                                <td>{this.state.rows.filetype}</td>
                                <th>등록일</th>
                                <td>{this.state.rows.update_time}</td>
                            </tr>
                            <tr>
                                <th>분류</th>
                                <td>{this.state.rows.category}</td>
                                <th>담당자</th>
                                <td>{this.state.rows.provider_person}</td>
                            </tr>
                            <tr>
                                <th>태그</th>
                                <td>{this.state.rows.keyword}</td>
                                <th>전화번호</th>
                                <td>{this.state.rows.provider_phone}</td>
                            </tr>
                            <tr className="tb_data_detail_line">
                                <th>설명</th>
                                <td colSpan={3}>
                                    <div className="cont_tb_description">
                                    {this.state.rows.comment}
                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {/* <div className="cont_data_detail_att">
                        <span>참고문서</span>
                        <a href="#"></a>
                    </div> */}
                    <h4 className="cont_data_detail_subtit">파일 다운로드</h4>

                    
                    <div className="cont_data_detail_option">
                        <span className="cont_data_detail_option_tit">등록된 파일</span>

                        
                        {this.state.rows.filelist
                            
                            .map(row => 
                            {
                                return (
                                    
                                <a href={row.filedata_key} className= {"cont_data_detail_option_att " + row.filetype} onClick={this.linkclick} target="_blank">
                                    <span>{row.filename}</span>
                                </a>
                            

                                );
                            })
                        }


                


                    </div>
                    


                    <div className="cont_data_btns">
                        <button type="button" className="btn_btm_submit" onClick = {this.handlePopupOpen}>
                            즐겨찾기 추가
            </button>
                        <button type="button" className="btn_btm_cancel" onClick = {this.handleReturnCardList}>
                            취소
            </button>
                    </div>
                
            </div>
                }
            </div>

        );
    }


}

export default sub_file_carddetail;







// <div className="pop_common">
// <h4 className="pop_tit">알림</h4>
// <div className="pop_cont_wrap">
//     <div className="pop_cont">
//         <div className="pop_cont_select">
//             <p>선택된 openAPI를 보관할 분류를 선택해주세요.</p>
//             <div>
//                 <select id>
//                     <option value="openAPI \uBD84\uB958 N">
//                         openAPI 분류 N
// </option>
//                 </select>
//             </div>
//         </div>
//     </div>
//     {}
//     <div className="pop_btns">
//         <button type="button" className="pop_btn_cancel">
//             취소
// </button>
//         <button type="submit" className="pop_btn_submit">
//             확인
// </button>
//     </div>
// </div>
// </div>