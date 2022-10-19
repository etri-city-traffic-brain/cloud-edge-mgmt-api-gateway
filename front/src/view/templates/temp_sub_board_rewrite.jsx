import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import styles from '../../assets/css/style.css';
import config  from "../../js/config.js";
import history from '../../js/history.js';

var myrows = [

];

var myrows2 = [

];

myrows.sort((a, b) => (a.calories < b.calories ? -1 : 1));
class sub_board extends React.Component {
    constructor(...props) {
        super(...props);
        
        this.handleClick = this.handleClick.bind(this);

        this.handlePopupOpen = this.handlePopupOpen.bind(this);

        this.state.community_title = this.props.community_title;

        this.state.community_contents = this.props.community_contents;

        this.handleReturnCardList = this.handleReturnCardList.bind(this);
        
        this.state.community_no = this.props.community_no;

        this.state.returnPopupOpen = this.props.returnPopupOpen;

        this.state.returnTabClose = this.props.returnTabClose;
        
        
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
            rows2: myrows2,
            page: 0,
            rowsPerPage: 10,
            pagemax: 0,
        };

    componentDidMount = () => {
        this._getData();

    };

    

    _getData = async () => {
        this.setState({
            fetching: true // requesting..
        });

        var urlstring = config.serverpoint + '/boards/' + this.props.community_no;

        // console.log('information url: ' + urlstring);
        
        // console.log(urlstring);

        await axios.get(urlstring)
            .then(response => 
            {
                this.state.rows = response.data[0];
                // console.log('information title = ' + this.state.rows.community_title)

                this.setState({
                    fetching: false // done!
                });

            }) // SUCCESS
            .catch(response => { 
                // console.log(response); 
            }); // ERROR



    };

    rewriteButton = () => {
        var url = config.serverpoint + '/boards/board_no/' + this.props.community_no  + '/comment';
    
        // console.log("보낼 url = " + url);
        // console.log("보낼 내용 = " + document.getElementById("contents_text").value);

        if(!document.getElementById("title_text").value){
            alert("제목을 입력하세요")
            return;
          }
        else if(!document.getElementById("contents_text").value){
          alert("내용을 입력하세요")
          return;
        }
    
        else{
          axios.put(url,{
              community_no : this.props.community_no,
              community_title: document.getElementById("title_text").value,
              community_contents : document.getElementById("contents_text").value,
            user_id : sessionStorage.getItem("user"),
          }).then(function(response){
            // console.log("information response = " + response);
            alert("수정 완료");
            window.location.reload();
          }).catch(response => { 
            //   console.log("information response =" + response);
        });
        }
    
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

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };
      

    handleChangeRowsPerPage = event => {

    };

    handleCursorClick = (event, pagenum) => {
        // console.log(pagenum);
    };

    render() {
        const { rows, rows2, rowsPerPage, page } = this.state;
        //console.log('count: ' + this.state.rows.count);
        
        //var test2 = document.getElementById("text").value
        
        if(!!document.getElementById("title_text")){
            document.getElementById("title_text").value = this.state.rows.community_title;            
        }
        if(!!document.getElementById("contents_text")){
            document.getElementById("contents_text").value = this.state.rows.community_contents;            
            
        }
        

        return (

            <div>        
                
                <div class="layout_sub_cont" >
      <table class="tb_board_write">
            
                    <tr>
                        <th>제목</th>
                        <td>
                          <input type="text" id="title_text" 
                            
                            value={this.state.name}
                           // onChange={this.handleChange('community_title')}
                        ></input></td>
                    </tr>
                    <tr>
                        <th>내용</th>
                        <td>
                            <div className="cont_board_textarea">
                            <textarea type="text" id="contents_text"                            
                              value={this.state.name}
                            //   onChange={this.handleChange('community_contents')}
                            ></textarea>
                            </div>
                        </td>
                    </tr>
                    {/* <tr>
                        <th>첨부파일</th>
                        <td><input type="file" id=""/></td>
                    </tr> */}
                
        </table>
        <div class="cont_data_btns">
                    <button type="submit" class="btn_btm_submit" onClick={this.rewriteButton}>수정 완료</button>
                    <button class="btn_btm_cancel" onClick={this.handleReturnCardList}>취소</button>
                </div>
            </div>
            </div>
        );
    }


}

export default sub_board;



