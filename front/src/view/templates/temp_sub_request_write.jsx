import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import styles from '../../assets/css/style.css';
import config  from "../../js/config.js";
import history from '../../js/history.js';
import Sub_request_rewrite from '../templates/temp_sub_request_rewrite';

var myrows = [

];

var myrows2 = [

];

myrows.sort((a, b) => (a.calories < b.calories ? -1 : 1));
class sub_request extends React.Component {
    constructor(...props) {
        super(...props);
        
        this.handleClick = this.handleClick.bind(this);

        this.handleRewrite = this.handleRewrite.bind(this);
 
        this.state.TabTypes = 0;

        this.handlePopupOpen = this.handlePopupOpen.bind(this);

        this.handleReturnCardList = this.handleReturnCardList.bind(this);
        
        this.state.request_no = this.props.request_no;

        this.state.returnPopupOpen = this.props.returnPopupOpen;

        this.state.returnTabClose = this.props.returnTabClose;

        this.handlePopupCancle = this.handlePopupCancle.bind(this);

        this.handleClickTabClose = this.handleClickTabClose.bind(this);
        
        this.state.popupType = 0;
        
    }

    handlePopupCancle()
    {
    //   console.log("Cancle");
      this.setState({ popupType : 0});
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

 handleClickTabClose() 
    {    
    //   console.log("1123123");
      this.setState(
        {
          TabTypes : 0,
          openapi_no : ""
        }
      );
    }

    state =
        {
            rows: myrows,
            rows2: myrows2,
            page: 0,
            rowsPerPage: 10,
            pagemax: 0,
        };

    componentDidMount = () => {
        this._getData();

    };

    handleRewrite(request_no){
        if(request_no==request_no){
            this.setState({                
                TabTypes : 1,
            })
        }
    }
    
    deleterequest = () => {
        this.setState({
          popupType : 2,
        })
      }

    handleDeletePopup(request_no)
  {
    
    this.deleterequest();
    this.state.request_no = request_no;

    // console.log('보낼 삭제 = ' +  request_no);
  }

  handleUp = async () =>{
    this.setState({
        fetching: true // requesting..
    });

    var urlstring = config.serverpoint + '/request/targetup/' + this.props.request_no;

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

    var urlstring = config.serverpoint + '/request/targetdown/' + this.props.request_no;

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

    handleDelete = async () =>{
        this.setState({
            fetching: true // requesting..
        });

        var urlstring = config.serverpoint + '/request/' + this.props.request_no;

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

    _getData = async () => {
        this.setState({
            fetching: true // requesting..
        });

        var urlstring = config.serverpoint + '/request/' + this.props.request_no;

        // console.log('information url: ' + urlstring);
        
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

var urlstring2 = config.serverpoint + '/request/' + this.props.request_no  + '/comment';

        // console.log('information url: ' + urlstring2);
        
        // console.log(urlstring2);
        
        await axios.get(urlstring2)
            .then(response => 
            {
                var newRows = [];


                for(var i = 0 ; i < response.data.length ; i++){
                    var dataPack = 
                    {          
                        user_id : "작성자",
                        request_reply_contents : "내용",
                        create_time : "2019.01.21",
                    }
                    var tempdatapack = eval('(' + JSON.stringify(dataPack) + ')');

                    tempdatapack.user_id = response.data[i].user_id;                   
                    tempdatapack.request_reply_contents = response.data[i].request_reply_contents;                   
                    tempdatapack.create_time = response.data[i].create_time;

                    newRows.push(tempdatapack);
                   
                }
                this.state.rows2 = newRows;
               
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
    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };
    
    writeButton = () => {
        if (sessionStorage.getItem("user")) {     
        var url = config.serverpoint + '/request/request_no/' + this.props.request_no  + '/comment';
    
        // console.log("보낼 url = " + url);
        // console.log("보낼 내용 = " + this.state.request_reply_contents);

        if(!this.state.request_reply_contents){
          alert("내용을 입력하세요")
          return;
        }
    
        else{
          axios.post(url,{
              request_no : this.props.request_no,
              request_reply_contents : this.state.request_reply_contents,
            user_id : sessionStorage.getItem("user"),
          }).then(function(response){
            // console.log("information response = " + response);
            alert("댓글 작성 완료");
            window.location.reload();
          }).catch(response => { 
            //   console.log("information response =" + response);
        });
        }
    }
    else {
        alert("로그인이 필요한 서비스 입니다.")
        history.push('/login');
      }   
    
      }

    handleChangeRowsPerPage = event => {

    };

    handleCursorClick = (event, pagenum) => {
        // console.log(pagenum);
    };

    render() {
        const { rows, rows2, rowsPerPage, page } = this.state;
        //console.log('count: ' + this.state.rows.count);
        return (
            

            <div>       
                 {
                          
                          this.state.TabTypes == 0 &&  this.state.fetching == false && sessionStorage.getItem("user") == 'admin' &&
                           <div>
      
                              <div className="header_top_user">
                              <button class="btn_btm_rewrite" onClick={this.handleUp}>상단 고정</button>
                              <button class="btn_btm_rewrite" onClick={this.handleDown}>고정 해제</button>
                                <button class="btn_btm_rewrite" onClick={this.handleRewrite}>수정</button>
                             
                                <button class="btn_btm_rewrite" onClick={() => this.handleDeletePopup(this.state.rows.community_no)}>삭제</button>
                              
                              </div>                          
                               
                           </div>
                      }    
                
                {      
                    this.state.TabTypes == 0 &&  this.state.fetching == false && sessionStorage.getItem("user") == this.state.rows.user_id && 
                     <div>
                         { sessionStorage.getItem("user") !== 'admin' &&
                        <div className="header_top_user">
                          <button class="btn_btm_rewrite" onClick={this.handleRewrite}>수정</button>
                          <button class="btn_btm_rewrite" onClick={() => this.handleDeletePopup(this.state.rows.request_no)}>삭제</button>
                        </div>                          
                         }
                         <div className="layout_sub_cont">                    
                         <div className="cont_notice_read">
                             <div className="cont_notice_read_tit layout_clearfix">
                                 <div className="tit">{this.state.rows.request_title}</div>
                                 <div className="info">
                                 <span>작성자 : {this.state.rows.user_id}</span>
                                     <span>{this.state.rows.create_time}</span>
                                     <span>{this.state.rows.count}</span>
                                 </div>
                             </div>
         
                             <div className="cont_notice_read_body" contenteditable>
                                <textarea disabled >
                                    {this.state.rows.request_contents}
                                </textarea>
                            </div>
                             <div class="layout_sub_cont" >
                             <table class="tb_board_reply_write">
                                 <tr>
                                     <td>
                                     <input type="text" id="" placeholder="댓글을 입력해 주세요"
                                     value={this.state.name}
                                     onChange={this.handleChange('request_reply_contents')}
                                 />
                                     </td>
                                     <td><button type="submit" class="btn_btms_submit" onClick={this.writeButton}>확인</button></td>
                                 </tr>         
                             </table>
                             </div>
         
         
                             <table class="board_reply">
                             {rows2
                       
                       .map(row => 
                       {
                         return (    
            
                              <tbody>
                              <tr><td><br></br></td></tr>
                              <tr><td class="class1"><strong>{row.user_id}</strong></td> </tr>
                              <tr><td class="class2">{row.request_reply_contents }</td></tr>
                              <tr><td class="class3">{row.create_time}</td></tr>
                              
                                                 
                             
                         </tbody>
                                 
                         );
                       })
                     }
                                
                             </table>
         
                             <div className="cont_notice_read_btns layout_clearfix">
                                 {/* <div>
                                     <a href="#이전글" className="btn_btm_normal"><span class="ico_up">이전글</span></a>
                                     <a href="#다음글" className="btn_btm_normal"><span class="ico_down">다음글</span></a>
                                 </div> */}
                                 <div>
                                     <a href="/request" className="btn_btm_submit">목록</a>
                                 </div>
                             </div>
                         </div>
                     </div>
                     </div>
                }   
             
                {this.state.TabTypes == 0 && this.state.fetching == false && sessionStorage.getItem("user") !== this.state.rows.user_id &&
            <div className="layout_sub_cont">                    
                <div className="cont_notice_read">
                    <div className="cont_notice_read_tit layout_clearfix">
                        <div className="tit">{this.state.rows.request_title}</div>
                        <div className="info">
                        <span>작성자 : {this.state.rows.user_id}</span>
                            <span>{this.state.rows.create_time}</span>
                            <span>{this.state.rows.count}</span>
                        </div>
                    </div>

                    <div className="cont_notice_read_body" contenteditable>
                        <textarea disabled >
                            {this.state.rows.request_contents}
                        </textarea>
                    </div>
                    <div class="layout_sub_cont" >
                    <table class="tb_board_reply_write">
                        <tr>
                            <td>
                            <input type="text" id="" placeholder="댓글을 입력해 주세요"
                            value={this.state.name}
                            onChange={this.handleChange('request_reply_contents')}
                        />
                            </td>
                            <td><button type="submit" class="btn_btms_submit" onClick={this.writeButton}>확인</button></td>
                        </tr>

                    </table>
                    </div>


                    <table class="board_reply">
                    {rows2
              
              .map(row => 
              {
                return (    
   
                     <tbody>
                     <tr><td><br></br></td></tr>
                     <tr><td class="class1"><strong>{row.user_id}</strong></td> </tr>
                     <tr><td class="class2">{row.request_reply_contents }</td></tr>
                     <tr><td class="class3">{row.create_time}</td></tr>                  
                    
                </tbody>
                        
                );
              })
            }
                       
                    </table>

                    <div className="cont_notice_read_btns layout_clearfix">
                        {/* <div>
                            <a href="#이전글" className="btn_btm_normal"><span class="ico_up">이전글</span></a>
                            <a href="#다음글" className="btn_btm_normal"><span class="ico_down">다음글</span></a>
                        </div> */}
                        <div>
                            <a href="/request" className="btn_btm_submit">목록</a>
                        </div>
                    </div>
                </div>
            </div>
                }
                {
                    this.state.TabTypes == 1 && 
                    <Sub_request_rewrite
                    returnType={this.handleRewrite}            
                    request_no={this.state.request_no}   
                    request_title={this.state.request_title}                 
                    request_contents={this.state.request_contents}
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

export default sub_request;



