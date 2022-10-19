import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import styles from '../../assets/css/style.css';
import config  from "../../js/config.js";
import Sub_notice_rewrite from '../templates/temp_sub_information_rewrite';

var myrows = [

];

myrows.sort((a, b) => (a.calories < b.calories ? -1 : 1));

class sub_information extends React.Component {
    constructor(...props) {
        super(...props);
        
        this.handleClick = this.handleClick.bind(this);

        this.handleRewrite = this.handleRewrite.bind(this);

        this.state.TabTypes = 0;

        this.state.popupType = 0;

        this.handlePopupOpen = this.handlePopupOpen.bind(this);

        this.handleReturnCardList = this.handleReturnCardList.bind(this);
        
        this.state.notice_no = this.props.notice_no;

        this.state.returnPopupOpen = this.props.returnPopupOpen;

        this.state.returnTabClose = this.props.returnTabClose;
        
    }

    handleUp = async () =>{
        this.setState({
            fetching: true // requesting..
        });
    
        var urlstring = config.serverpoint + '/notice/targetup/' + this.props.notice_no;
    
        await axios.put(urlstring)
            .then(response => 
            {
                this.state.rows4 = response.data[0];
    
                this.setState({
                    fetching: false // done!
                    
                });
                
                alert("공지로 올리기");
                window.location.reload();
    
            }) // SUCCESS
            .catch(response => { 
                // console.log('res = ' + response); 
            })
    }

    handleDown = async () =>{
        this.setState({
            fetching: true // requesting..
        });
    
        var urlstring = config.serverpoint + '/notice/targetdown/' + this.props.notice_no;
    
        await axios.put(urlstring)
            .then(response => 
            {
                this.state.rows5 = response.data[0];
    
                this.setState({
                    fetching: false // done!
                    
                });
                
                alert("공지에서 내리기");
                window.location.reload();
    
            }) // SUCCESS
            .catch(response => { 
                // console.log('res = ' + response); 
            })
    }

    deletenotice = () => {
        this.setState({
          popupType : 2,
        })
      }

    handleDeletePopup(notice_no)
  {
    
    this.deletenotice();
    this.state.notice_no = notice_no;

    // console.log('보낼 삭제 = ' +  notice_no);
  }
    
        handleDelete = async () =>{
            this.setState({
                fetching: true // requesting..
            });
    
            var urlstring = config.serverpoint + '/notice/' + this.props.notice_no;
    
            await axios.delete(urlstring)
                .then(response => 
                {
                    this.state.rows3 = response.data[0];
    
                    this.setState({
                        fetching: false // done!
                        
                    });
                    // console.log("information 삭제완료")
                    alert("삭제 완료");
                    window.location.reload();
    
                }) // SUCCESS
                .catch(response => { 
                    // console.log('res = ' + response); 
                })
               // ERROR
               this.setState({ popupType : 0});
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

    handleRewrite(notice_no){
        if(notice_no==notice_no){
            this.setState({                
                TabTypes : 1,
            })
        }
    }

    _getData = async () => {
        this.setState({
            fetching: true // requesting..
        });

        var urlstring = config.serverpoint + '/notice/' + this.props.notice_no;

        // console.log('information url: ' + urlstring);
        
        // console.log(urlstring);

        await axios.get(urlstring)
            .then(response => 
            {
                this.state.rows = response.data[0];

                console.log(response.data[0].notice_contents);

                this.setState({
                    fetching: false // done!
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
        const { rows, rowsPerPage, page } = this.state;
        //console.log('count: ' + this.state.rows.count);
        return (

            <div>
                {this.state.TabTypes == 0 && this.state.fetching == false && sessionStorage.getItem("user") == 'admin' &&
                <div className="header_top_user">
                <button class="btn_btm_rewrite" onClick={this.handleUp}>상단 고정</button>
                <button class="btn_btm_rewrite" onClick={this.handleDown}>고정 해제</button>
                  <button class="btn_btm_rewrite" onClick={this.handleRewrite}>수정</button>
               
                  <button class="btn_btm_rewrite" onClick={() => this.handleDeletePopup(this.state.rows.notice_no)}>삭제</button>
                
                </div>   
                }

            {this.state.TabTypes == 0 && this.state.fetching == false &&
            <div className="layout_sub_cont">   
                             
                <div className="cont_notice_read">
                  
                    <div className="cont_notice_read_tit layout_clearfix">
                        <div className="tit">{this.state.rows.notice_title}</div>
                        <div className="info">
                            <span>{this.state.rows.create_time}</span>
                            <span>{this.state.rows.count}</span>
                        </div>
                    </div>

                    {/* <div className="cont_notice_read_body" contenteditable>
                            <textarea disabled >
                                {this.state.rows.notice_contents}
                            </textarea>
                    </div> */}

                    <div className="cont_notice_read_body" contenteditable>
                        <textarea disabled >
                            {this.state.rows.notice_contents}
                        </textarea>
                    </div>

                    <div className="cont_notice_read_btns layout_clearfix">
                        {/* <div>
                            <a href="#이전글" className="btn_btm_normal"><span class="ico_up">이전글</span></a>
                            <a href="#다음글" className="btn_btm_normal"><span class="ico_down">다음글</span></a>
                        </div> */}
                        <div>
                            <a href="/notice" className="btn_btm_submit">목록</a>
                        </div>
                    </div>
                </div>
            </div>
            }
            {
                    this.state.TabTypes == 1 && 
                    <Sub_notice_rewrite
                    returnType={this.handleRewrite}            
                    notice_no={this.state.notice_no}   
                    notice_title={this.state.notice_title}                 
                    notice_contents={this.state.notice_contents}
                    returnPopupOpen = {this.handlePopupOpen} 
                    returnTabClose = {this.handleClickTabClose}
                    />
                }

                {this.state.popupType == 2 && 
                    <div class="pop_commons">
                <h4 class="pop_tit">알림</h4>
                <div class="pop_cont_wrap">
                    <div class="pop_cont">
                        <div class="pop_cont_select">
                            <p>삭제하시겠습니까?</p>
                        </div>
                    </div>
                    <div class="pop_btns">
                    <button type="submit" class="pop_btn_submit" onClick={this.handleDelete}>확인</button>
                        <button type="button" class="pop_btn_cancel" onClick={this.handlePopupCancle}>취소</button>
                        
                    </div>
                </div>
                 </div>
                   }
                
            </div>

        );
    }


}

export default sub_information;
