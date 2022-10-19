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


class sub_boardList extends React.Component 
{
  constructor(...props) {
    super(...props);
    this.handleClick = this.handleClick.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
    this.state.community_no = this.props.community_no;
    this.state.community_title = this.props.community_title;
    this.state.user_id = this.props.user_id;
    this.state.count = this.props.count;

    this.state.rowsPerPage = 10;
    this.state.page = 0;
    this.state.pagemap = new Array();
    this.state.startpage = 0;
    this.state.endpage = 0;
  }

  handleCardClick(community_no)
  {
    this.props.returnType(community_no);
  }

  handleWriteButton = () => {
    if (sessionStorage.getItem("user")) {      
      // console.log(":test:" + sessionStorage.getItem("user"));
      history.push("/boardwrite");
    }
    else {
      alert("로그인이 필요한 서비스 입니다.")
      history.push('/login');
    }    
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

    var requesturl = config.serverpoint + "/boards"
    
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
                community_no : "100",
                community_title : "제목",
                user_id : "작성자",
                create_time : "2019.01.21",
                count : "66",  
            }
            var tempdatapack = eval('(' + JSON.stringify(dataPack) + ')');

            tempdatapack.community_no = response.data[i].community_no;    
            tempdatapack.community_title = response.data[i].community_title;    
            tempdatapack.user_id = response.data[i].user_id;    
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

    var requesturls = config.serverpoint + "/boards/target/list"

    await axios.get(requesturls)
    .then( response => 
    {
        
        var newRows2 = [];
        // console.log(response.data);

        for(var i = 0 ; i < response.data.length ; i++)
        {
            var dataPack = 
            {          
                community_no : "100",
                community_title : "제목",
                user_id : "작성자",
                create_time : "2019.01.21",
                count : "66",  
            }
            var tempdatapack = eval('(' + JSON.stringify(dataPack) + ')');

            tempdatapack.community_no = response.data[i].community_no;    
            tempdatapack.community_title = response.data[i].community_title;    
            tempdatapack.user_id = response.data[i].user_id;    
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

    if(sessionStorage.getItem("user") == 'admin'){
      var requesturl = config.serverpoint + "/boards/admin"
    
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
                  community_no : "100",
                  community_title : "제목",
                  user_id : "작성자",
                  create_time : "2019.01.21",
                  count : "66",  
              }
              var tempdatapack = eval('(' + JSON.stringify(dataPack) + ')');
  
              tempdatapack.community_no = response.data[i].community_no;    
              tempdatapack.community_title = response.data[i].community_title;    
              tempdatapack.user_id = response.data[i].user_id;    
              tempdatapack.create_time = response.data[i].create_time; 
              tempdatapack.count = response.data[i].count;
  
              newRows.push(tempdatapack);
  
              
          }
  
          // console.log(newRows);
  
          this.state.rows = newRows;
          this.setState({
              fetching: false // done!
          });
          
  
      } ) // SUCCESS
      .catch( response => { 
        // console.log(response); 
      } ); // ERROR


    }
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
                     <tr onClick={(e) => this.handleCardClick(row.community_no)}>
                        <td className = "noti"><span>공지</span></td>
                        <td>{row.community_title }</td>
                        <td>운영자</td>
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
                     <tr onClick={(e) => this.handleCardClick(row.community_no)}>
                        <td>{row.community_no}</td>
                        <td>{row.community_title }</td>
                        <td>{row.user_id}</td>
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
              <button className="btn_btm_submit" onClick={this.handleWriteButton}>글작성</button>
             </div>
          </div> 
      </div>

    );
  }

 
}

export default sub_boardList;
