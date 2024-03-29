import React from "react";
import axios from "axios";
import history from '../../js/history.js';
import PropTypes from "prop-types";
import styles from '../../assets/css/style.css';

import config  from "../../js/config.js";

var myrows = [
  
];

myrows.sort((a, b) => (a.calories < b.calories ? -1 : 1));

class Clickable extends React.Component 
{

  constructor(...props) {
    super(...props);
    this.handleClickChild = this.handleClickChild.bind(this);
  }
  
  handleClickChild() {
    this.props.onClick(this.props.id)
  }

  render() {
    return (
      <a href="#" onClick={this.handleClickChild}>{this.props.text}</a>
    )
  }
}


class sub_informationList extends React.Component 
{
  constructor(...props) {
    super(...props);
    this.handleClick = this.handleClick.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
    this.state.notice_no = this.props.notice_no;
    this.state.notice_title = this.props.notice_title;
    this.state.create_user_id = this.props.create_user_id;
    this.state.count = this.props.count;

    this.state.rowsPerPage = 10;
    this.state.page = 0;
    this.state.pagemap = new Array();
    this.state.startpage = 0;
    this.state.endpage = 0;
  }
  handleWriteButton = () => {
      history.push("/noticewrite");
    
  }
  handleCardClick(notice_no)
  {
    this.props.returnType(notice_no);
  }

  handleClick(v) {
    this.state.page = v;
  }

  state = 
  {
    page: 0,
    rowsPerPage: 10,
    pagemax : 0,
    rows: myrows,
    pagemap : null,
    startpage : 0,
    endpage : 0,
  };

  componentDidMount = () => {
    this._getData();  
   
  };

  _getData = async () => {
    this.setState({
        fetching: true // requesting..
    });

    var requesturl = config.serverpoint + "/notice"
    
    // console.log("information requesturl: " + requesturl);

    await axios.get(requesturl)
    .then( response => 
    {
        
        var newRows = [];
        // console.log(response.data);

        for(var i = 0 ; i < response.data.length ; i++)
        {
            var dataPack = 
            {          
                notice_no : "100",
                notice_title : "제목",
                create_user_id : "운영자",
                create_time : "2019.01.21",
                count : "66",  
            }
            var tempdatapack = eval('(' + JSON.stringify(dataPack) + ')');

            tempdatapack.notice_no = response.data[i].notice_no;    
            tempdatapack.notice_title = response.data[i].notice_title;    
            tempdatapack.create_user_id = response.data[i].create_user_id;    
            tempdatapack.create_time = response.data[i].create_time; 
            tempdatapack.count = response.data[i].count;

            newRows.push(tempdatapack);

            
        }

        // console.log(newRows);

        this.state.rows = newRows;
        this.state.pagemax = Math.ceil(response.data.length/this.state.rowsPerPage);
        // console.log('information page = ' + this.state.pagemax);
        this.state.endpage = ((Math.floor(parseInt(this.state.page/10))+1)*10);
        for (var i=0; i<this.state.pagemax; i++) {
          this.state.pagemap.push(i);
        }

        this.setState({
            fetching: false // done!
        });
        

    } ) // SUCCESS
    .catch( response => { 
      // console.log(response); 
    } ); // ERROR

    var requesturls = config.serverpoint + "/notice/target/list"

    await axios.get(requesturls)
    .then( response => 
    {
        
        var newRows2 = [];
        // console.log(response.data);

        for(var i = 0 ; i < response.data.length ; i++)
        {
            var dataPack = 
            {          
                notice_no : "100",
                request_title : "제목",
                create_user_id : "작성자",
                create_time : "2019.01.21",
                count : "66",  
            }
            var tempdatapack = eval('(' + JSON.stringify(dataPack) + ')');

            tempdatapack.notice_no = response.data[i].notice_no;    
            tempdatapack.notice_title = response.data[i].notice_title;    
            tempdatapack.create_user_id = response.data[i].create_user_id;    
            tempdatapack.create_time = response.data[i].create_time; 
            tempdatapack.count = response.data[i].count;

            newRows2.push(tempdatapack);            
        }

        // console.log(newRows2);

        this.state.rows2 = newRows2;
        // this.state.pagemax = Math.ceil(response.data.length/this.state.rowsPerPage);
        // console.log('information page = ' + this.state.pagemax);
        // this.state.endpage = ((Math.floor(parseInt(this.state.page/10))+1)*10);
        // for (var i=0; i<this.state.pagemax; i++) {
        //   this.state.pagemap.push(i);
        // }
        this.setState({
            fetching2: false // done!
        });
        

    } ) // SUCCESS
    .catch( response => { 
      // console.log(response); 
    } ); // ERROR
   
  };



  handleFirstPageButtonClick = event => {
    
  };

  handleBackButtonClick = event => {

    if(this.state.page > 9)
    {
      this.state.page -= 9;
      this.state.startpage = (((Math.floor(parseInt(this.state.page/10))+1)*10)-10);
      this.state.endpage = ((Math.floor(parseInt(this.state.page/10))+1)*10);

      this.state.page = this.state.startpage;
    }

  };

  handleNextButtonClick = event => {
    if ( this.state.endpage < this.state.pagemax) {
      this.state.page += 10;
      this.state.page = parseInt(this.state.page/this.state.rowsPerPage) * this.state.rowsPerPage + 1;

      this.state.startpage = (((Math.floor(parseInt(this.state.page/10))+1)*10)-10);
      this.state.endpage = ((Math.floor(parseInt(this.state.page/10))+1)*10);

      this.state.page = this.state.startpage;
    }
  };

  handleLastPageButtonClick = event => {
    
  };

  handleChangePage = (event, page) => {
    
  };


  handleChangeRowsPerPage = event => {
    
  };

  handleCursorClick= (event,pagenum) => {
    // console.log(pagenum);
  };

  render()
  {
    const { rows, rows2, rowsPerPage, page } = this.state;
   
    return (
      <div class="layout_sub_cont" >
      <table class="tb_mypage_list notice_list">
                  <thead>
                    <tr>
                      <th class="class1">번호</th>
                      <th class="class2">제목</th>
                      <th class="class3">등록자</th>
                      <th class="class4">등록일</th>
                      <th class="class5">조회수</th>
                    </tr>
                  </thead> 

                  {this.state.fetching2 == false && rows2
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => 
              {
                return (    
   
                     <tbody className = "board_notice">
                     <tr onClick={(e) => this.handleCardClick(row.notice_no)}>
                        <td className = "noti"><span>※필독 사항</span></td>
                        <td>{row.notice_title }</td>
                        <td>{row.create_user_id}</td>
                        <td>{row.create_time}</td>
                        <td>{row.count}</td>
                    </tr>                    
                    
                </tbody>                        
                );
              })
            }

            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => 
              {
                return (    
   
                     <tbody>
                     <tr onClick={(e) => this.handleCardClick(row.notice_no)}>
                        <td>{row.notice_no}</td>
                        <td>{row.notice_title }</td>
                        <td>{row.create_user_id}</td>
                        <td>{row.create_time}</td>
                        <td>{row.count}</td>
                    </tr>                    
                    
                </tbody>
                        
                );
              })
            }
        </table>

        <div className="cont_board_pagenation">
            <a href="#" className="cont_board_pagenation_btn prev"  onClick={this.handleBackButtonClick}></a>
            {
                this.state.pagemap
                    .slice(this.state.startpage,this.state.endpage)
                    .map((row, index) =>
                        {
                          return (
                              <Clickable id={index + this.state.startpage} onClick={this.handleClick} text = {(index + this.state.startpage + 1)}/>
                          )
                        }
                    )
              }
            <a href="#" className="cont_board_pagenation_btn next"  onClick={this.handleNextButtonClick}></a>
        </div>


        <div className="cont_board_btns">
            <div className="cont_board_btns_inner">
              {sessionStorage.getItem("user") == 'admin' &&
              <button className="btn_btm_submit" onClick={this.handleWriteButton}>글작성</button>
            }
            </div>
          </div> 

      </div>

    );
  }
}

export default sub_informationList;
