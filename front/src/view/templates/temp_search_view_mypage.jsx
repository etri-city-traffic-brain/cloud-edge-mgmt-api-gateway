import React from 'react';

import axios from "axios";

import { withStyles } from '@material-ui/core/styles';
import history from '../../js/history.js';

//import stylesheet from 'https://fonts.googleapis.com/css?family=Montserrat:600,700';
import styles from '../../assets/css/style.css';

//import style_bak from '../assets/css/style_bak.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import config  from '../../js/config';

import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

import Sub_mypage from '../templates/temp_view_mypage';

var myrows = [
  
];




myrows.sort((a, b) => (a.calories < b.calories ? -1 : 1));
const currencies = [

  {
    value: 'NULL',
    label: 'NULL',
  },
  {
    value: 'RUBY',
    label: 'RUBY',
  },
  {
    value: 'ITEM',
    label: 'ITEM',
  },

];

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


class search_view_mypage extends React.Component {
  state = {
    name: 'Cat in the Hat',
    age: 0,
    multiline: 'Controlled',
    currency: 'NULL',
    page: 0,
    rowsPerPage: 10,
    pagemax : 0,
    rows: myrows,
    pagemap : null,
    startpage : 0,
    endpage : 0,
    isHovering: false,
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickTabTypes = this.handleClickTabTypes.bind(this);

    this.handleClickTabClose = this.handleClickTabClose.bind(this);

    this.state.word = this.props.word;

    this.child = React.createRef();
    this.state.age = 1000;
    this.state.textFieldValue_value = 1000;
    this.state.rowsPerPage = 10;
    this.state.page = 0;
    this.state.pagemap = new Array();
    this.state.startpage = 0;
    this.state.endpage = 0;

    this.state.openapi_no = 0;

    this.state.TabTypes = 0;
    this.state.SetTypes = 1;
    this.handleMouseHover = this.handleMouseHover.bind(this);
  }

  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }
  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering,
    };
  }
  
  setstates = async () => {
    this.setState(
            {
              TabTypes : 1,          
            }
          );  
  }

  handleClickTabClose() 
  {    
    // console.log("1123123");
    this.setState(
      {
        TabTypes : 0,
        openapi_no : ""
      }
    );
  }

  handleClickTabTypes = (openapi_no) =>
  {    
    // console.log("openapi_no " + openapi_no)
   this.setstates();
    this.state.openapi_no = openapi_no;
  }

  setTypestate = async () => {
    this.setState(
            {
              SetTypes : 1,          
            }
          );  
  }

  search = () => {
    var urlParams = new URLSearchParams(window.location.search);

    var searchWord = urlParams.get('name');
    
    // console.log("aaa searchWord = " + searchWord);
    // console.log("aaa : " + this.state.SetTypes);

    this.setTypestate();
    this.state.word = searchWord;
    if (!!document.getElementById("search_keyword")) {
      document.getElementById("search_keyword").value = searchWord;
    }

  }

  onClickButton = async () => {
      window.location.reload();  
      this.setTypestate();  
  }

  handleReady()
  {
    alert("준비중 입니다.")
  }

  componentDidMount = () => {
    this._getData();

  };

  _getData = async () => {
    this.setState({
        fetching: true // requesting..
    });    

    var urlstring = config.serverpoint + '/usermypage/' + sessionStorage.getItem("user");
    var urlstring2 = config.serverpoint + '/search/myopenapilist/' + sessionStorage.getItem("user") + '?name=' + this.props.word;

    // console.log('information id : ' + urlstring);

    await axios.get(urlstring2)
        .then(response => 
        {
            this.state.rows = response.data;

          // console.log('information key = ' + this.state.rows[0].key);

          // console.log('information data length = ' + response.data.length);
          // console.log('information data rowsperpage = ' + this.state.rowsPerPage);
          this.state.pagemax = Math.ceil(response.data.length/this.state.rowsPerPage);
          // console.log('information page = ' + this.state.pagemax);
          this.state.endpage = ((Math.floor(parseInt(this.state.page/10))+1)*10);
          for (var i=0; i<this.state.pagemax; i++) {
            this.state.pagemap.push(i);
          }

            this.setState({
                fetching: false // done!
            });

        }) // SUCCESS
        .catch(response => { 
          // console.log(response); 
        }); // ERROR

        var urlstring = config.serverpoint + '/usermypage/developer/' + sessionStorage.getItem("user");

    // console.log('information id : ' + urlstring);

    await axios.get(urlstring)
        .then(response => 
        {
            this.state.rows2 = response.data;

            // console.log('information key = ' + this.state.rows2[0].auth_key);  

            this.setState({
                fetchings: false // done!
            });

        }) // SUCCESS
        .catch(response => { 
          // console.log(response); 
        }); // ERROR

        var word = this.state.word;    

        if(word !== null){
        var urlstring2 = config.serverpoint + '/search/myopenapilist/' + sessionStorage.getItem("user") + '?name=' + this.props.word;
      
        // console.log('url: ' + urlstring2);

        await axios.get(urlstring2)
            .then(response => 
            {
                this.state.rows4 = response.data;
                
                if(response.data == false){
                  // console.log("aaa" + response.data)
                  alert("검색 결과가 없습니다. 다시 입력해주세요");
                  history.push("/src/mypage.html");
                  window.location.reload();
                  return;
                }

                this.setState({
                    fetching4: false // done!
                });

            }) // SUCCESS
            .catch(response => { 
              // console.log(response); 
            }); // ERROR
          }
  };



  toggleChange = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    })
    // console.log('checked = ' + this.state.isChecked)
  }

  bookChecked = (bookchecks) => {
    this.setState({
      bookcheck : bookchecks
    });
    
  }

  checkDelete = async () =>{
    // console.log('checkcheck = ' + this.state.bookcheck);

    var on = this.state.bookcheck;

    var url = config.serverpoint + '/api/request/' + on + '/' + sessionStorage.getItem("user");

    axios.delete(url,{
      openapi_no : this.state.bookcheck,
      user_id : sessionStorage.getItem("user"),
    })
    .then(response =>{
      this.state.rows3 = response.data[0];
      
      
      // console.log('openapi_no = ' + this.state.bookcheck);

      this.setState({
        fetching: false 
      });
      // console.log("삭제 " )
      alert("해지가 완료되었습니다.");
      window.location.reload();

    })
    .catch(response => {
      // console.log('res = ' + response);
    })
  }


  _handleTextFieldChange_item_type = (e) => {

    this.setState({
      textFieldValue_item_type: e.target.value,
      currency: e.target.value
    });
    //console.log(e.target.value);
  }

  _handleTextFieldChange_value = (e) => {

    this.setState({
      textFieldValue_value: e.target.value,
      age: e.target.value
    });
    //console.log(this.state.textFieldValue_value);
  }

  _handleTextFieldChange_message = (e) => {

    this.setState({
      textFieldValue_message: e.target.value
    });
    //console.log(this.state.textFieldValue_message);
  }

  _handleTextFieldChange_received_type = (e) => {

    this.setState({
      textFieldValue_received_type: e.target.value
    });
    //console.log(this.state.textFieldValue_received_type);
  }

  handleClick(v) {
    this.state.page = v;
  }

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

  enterCheck = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      this.onClickButton();
    }
  }

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

  render() {

    if (sessionStorage.getItem("user")) {      
      // console.log(":test:" + sessionStorage.getItem("user"));
    }
    else {
      history.push('/login');
    }

    const { classes } = this.props;
    const { rows, rows4, rowsPerPage, page } = this.state;

    return (
      <div>     
          {this.state.TabTypes == 0 &&
          <>

          <div className="cont_mypage_tableHeaders layout_clearfix">
            
            <form method>
              <div className="cont_mypage_tableHeaders_search">
              
                <div className="cont_mypage_tableHeaders_search_input">
                                  
                  <button type="button" id onClick={() => this.onClickButton()} className>
                    <span>Search</span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          
            <div className="cont_data_search">
              <div className="cont_data_search_form_key">
                <div className="tit">나의 인증키</div>

                <div 
                onMouseEnter={this.handleMouseHover}
                onMouseLeave={this.handleMouseHover}
                > 

                { this.state.isHovering == false &&
                  <div className="tits">마우스를 올려 인증키를 확인하세요</div>
                }
                {this.state.isHovering &&
                <div className="tits"> 
                {this.state.fetchings == false && this.state.rows2[0].auth_key}
                </div>
                }

                </div>
              </div>
              {}
            </div>
          
            
           
            
            {this.state.fetching4 == false && this.state.SetTypes == 1 &&
            <table className="tb_mypage_list">
             <thead>
                <tr>
                  <th>선택</th>
                  
                  <th>오픈 데이터 API 이름</th>
                  <th>활용 유형</th>
                  <th>예제</th>
                  <th>키워드</th>
                  <th>오픈 데이터 제공처</th>
                </tr>
              </thead>
              
              <tbody >
            {
                   rows4
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map(row => 
                      {
                          return (
                         
                          <tr>
                            <td>
                            <CheckboxGroup type="checkbox"
                              //  checked={this.state.isChecked}
                              //  onChange={this.toggleChange}
                              value={this.state.bookcheck}
                              onChange={this.bookChecked}
                              >                              
                              <Checkbox
                                id = {"checkid"}
                                value={'bookdelete' + row.openapi_no + 'bookdelete'}
                              />
                              
                              </CheckboxGroup>
                            </td>
                             {this.state.fetching == false &&
                            // <td onClick={this.handleClickTabTypes} value={row.openapi_no}>
                            <td id={row.openapi_no} onClick={() => this.handleClickTabTypes(row.openapi_no)}>
                                {row.name}
                              
                            </td>
                            }
                            <td>{row.activity_type}</td>
                            <td>
                              <div className="cont_mypage_detail_code">

                              <CopyToClipboard text={row.code}
                                onCopy={() => this.setState({copied: true})}>
                                <button
                                  type="button"
                                  className="btn_mypage_list_code js_code_btn"
                                >
                                  code
                                </button>
                              </CopyToClipboard>
                                
                                <div className="pop_code">
                                  {                                    
                                   
                                    row.code.split('\n').map( line => {
                                      return (<span>{line}<br/></span>)
                                    })
                                  }
                                </div>
                                
                              </div>
                              
                            </td>
                            <td> {row.keyword}</td>
                            <td>{row.provider}</td>                  
                          </tr>
                      

                          );
                      })
                  }
                  </tbody>
              
              
            </table>
            }
        
            {}
            <div className="cont_mypage_btns">
              <div className="cont_mypage_btns_inner">
                <button type="button" className="btn_btm_cancel" onClick={this.checkDelete}>
                  Open API 활용 해지
                </button>
              </div>
            </div>
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
            
          </>
        }
        {
            this.state.TabTypes == 1 &&
            <Sub_mypage
              openapi_no={this.state.openapi_no}
              returnPopupOpen = {this.handlePopupOpen} 
              returnTabClose = {this.handleClickTabClose}
            />
          }
      </div>

    );
  }
}
export default withStyles(styles)(search_view_mypage);