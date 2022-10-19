import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import styles from '../../assets/css/style.css';
import config  from "../../js/config.js";
import history from '../../js/history.js';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import CardList from '../mypage_favorites';

var myrows = [
  
];

var myrows2 = [
  
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


class temp_mypage_favorites extends React.Component {
  state = {
    age: 0,
    multiline: 'Controlled',
    currency: 'NULL',
    page: 0,
    rowsPerPage: 10,
    pagemax : 0,
    rows: myrows,
    rows2: myrows2,
    // bookmark_name: 'NULL',
    value: 'NULL',
    isChecked: false,
    bookcheck: [],
    pagemap : null,
    startpage : 0,
    endpage : 0,
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.handlePopupOpen = this.handlePopupOpen.bind(this);
    this.handleDeletePopup = this.handleDeletePopup.bind(this);
    this.handlePopupCancle = this.handlePopupCancle.bind(this);
    
    this.handleChange = this.handleChange.bind(this);
    
    this.checkDelete = this.checkDelete.bind(this);

    this.state.bookmark_no = this.props.bookmark_no;
    this.state.bookmark_name = this.props.bookmark_name;

    this.child = React.createRef();
    this.state.age = 1000;
    this.state.textFieldValue_value = 1000;
    this.state.TabTypes = this.props.TabTypes;
    this.state.popupType = 0;

    // this.state.TabTypes = 3;

    this.state.rowsPerPage = 10;
    this.state.page = 0;
    this.state.pagemap = new Array();
    this.state.startpage = 0;
    this.state.endpage = 0;
  
  }

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

    var bk = this.props.bookmark_no;
    var on = this.state.bookcheck;
    

    var url = config.serverpoint + '/bookmark/bookmark_openapi/delete/' + bk + '/' + on;

    axios.delete(url,{
      bookmark_no : this.props.bookmark_no,
      openapi_no : this.state.bookcheck,
    })
    .then(response =>{
      this.state.rows3 = response.data[0];
      
      // console.log('bookmark_no = ' + this.props.bookmark_no);
      // console.log('openapi_no = ' + this.state.bookcheck);

      this.setState({
        fetching: false 
      });
      // console.log("삭제 " )
      alert("삭제 완료");
      window.location.reload();

    })
    .catch(response => {
      // console.log('res = ' + response);
    })
  }

  handlePopupOpen()
  {
   
    this.setState(
      { 
        popupType : 1,
        bookmark_name :""

      });
  }

  handleChange(event) 
  {
    
    this.setState({
      bookmark_name : event.target.value,
    });   
  }  

  handlePopupCancle()
  {
    // console.log("Cancle");
    this.setState({ popupType : 0});
  }


  handleDeletePopup()
  {
    // console.log('information 삭제' +  this.state.rows2.bookmark_no);
    this.setState(
      { 
        popupType : 2,
        bookmark_name :""

      });
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
        fetching: true, // requesting..
    });    

    var urlstring = config.serverpoint + '/bookmark/' + sessionStorage.getItem("user") + '/' + this.props.bookmark_no;

    
    // console.log('information id : ' + urlstring);
    if(this.state.TabTypes == 0){
      await axios.get(urlstring)
          .then(response => 
          {
            if(response.data == "비어있음"){
              this.setState({
                fetchings: true,
              })
              // alert("분류함에 API를 추가해주세요");
              // history.push('data.html')
              // window.location.reload();      
            }
            else{
              this.state.rows = response.data;
              this.state.bookmark_name = this.state.rows[0].bookmark_name;
  
              // console.log('information key = ' + this.state.rows[0].key);
              
              // console.log('aaa1 = ' + this.state.rows[0].bookmark_name);
              // console.log('information data length = ' + response.data.length);
              // console.log('information data rowsperpage = ' + this.state.rowsPerPage);
              this.state.pagemax = Math.ceil(response.data.length/this.state.rowsPerPage);
            // console.log('information page = ' + this.state.pagemax);
            this.state.endpage = ((Math.floor(parseInt(this.state.page/10))+1)*10);
            for (var i=0; i<this.state.pagemax; i++) {
              this.state.pagemap.push(i);
            }
  
              this.setState({
                  fetching: false,
              });
            }
              
  
          }) // SUCCESS
          .catch(response => { 
            // console.log(response); 
          }); // ERROR       
        }

    if(this.state.TabTypes == 1){
    await axios.get(urlstring)
        .then(response => 
        {
          if(response.data == "비어있음"){
            this.setState({
              fetchings : true,
            })
            // alert("분류함에 API를 추가해주세요");
            // history.push('data.html')
            // window.location.reload();  
          }
          else{
            this.state.rows = response.data;
            this.state.bookmark_name = this.state.rows[0].bookmark_name;

            // console.log('information key = ' + this.state.rows[0].key);
            // console.log('aaa2 = ' + this.state.rows[0].bookmark_name);
            // console.log('information data length = ' + response.data.length);
            // console.log('information dat/a rowsperpage = ' + this.state.rowsPerPage);
            this.state.pagemax = Math.ceil(response.data.length/this.state.rowsPerPage);
          // console.log('information page = ' + this.state.pagemax);
          this.state.endpage = ((Math.floor(parseInt(this.state.page/10))+1)*10);
          for (var i=0; i<this.state.pagemax; i++) {
            this.state.pagemap.push(i);
          }

            this.setState({
                fetching: false,
            });
          }

        }) // SUCCESS
        .catch(response => { 
          // console.log(response); 
        }); // ERROR       
      }

      if(this.state.TabTypes == 2){
        await axios.get(urlstring)
            .then(response => 
            {
              if(response.data == "비어있음"){
                this.setState({
                  fetchings : true,
                })
                // alert("분류함에 API를 추가해주세요");
                // history.push('data.html')
                // window.location.reload();  
              }
              else{
                this.state.rows = response.data;
                this.state.bookmark_name = this.state.rows[0].bookmark_name;
    
                // console.log('information key = ' + this.state.rows[0].key);
                // console.log('aaa3 = ' + this.state.rows[0].bookmark_name);
                // console.log('information data length = ' + response.data.length);
                // console.log('information data rowsperpage = ' + this.state.rowsPerPage);
                this.state.pagemax = Math.ceil(response.data.length/this.state.rowsPerPage);
              // console.log('information page = ' + this.state.pagemax);
              this.state.endpage = ((Math.floor(parseInt(this.state.page/10))+1)*10);
              for (var i=0; i<this.state.pagemax; i++) {
                this.state.pagemap.push(i);
              }
    
                this.setState({
                    fetching: false,
                });
                
              }
            }) // SUCCESS
            .catch(response => { 
              // console.log(response); 
            }); // ERROR       
          }

          if(this.state.TabTypes == 3){
            await axios.get(urlstring)
                .then(response => 
                {
                  if(response.data == "비어있음"){
                    this.setState({
                      fetchings : true,
                    })
                    // alert("분류함에 API를 추가해주세요");
                    // history.push('data.html')
                    // window.location.reload();     
                  }
                  else{
                    this.state.rows = response.data;
                    this.state.bookmark_name = this.state.rows[0].bookmark_name;
        
                    // console.log('information key = ' + this.state.rows[0].key);
                    // console.log('aaa4 = ' + this.state.rows[0].bookmark_name);
                    // console.log('information data length = ' + response.data.length);
                    // console.log('information data rowsperpage = ' + this.state.rowsPerPage);
                    this.state.pagemax = Math.ceil(response.data.length/this.state.rowsPerPage);
                  // console.log('information page = ' + this.state.pagemax);
                  this.state.endpage = ((Math.floor(parseInt(this.state.page/10))+1)*10);
                  for (var i=0; i<this.state.pagemax; i++) {
                    this.state.pagemap.push(i);
                  }
        
                    this.setState({
                        fetching: false,
                    });
                  }
        
                }) // SUCCESS
                .catch(response => { 
                  // console.log(response); 
                }); // ERROR       
              }

     


    var urlstring2 = config.serverpoint + '/bookmark/' + sessionStorage.getItem("user");

    await axios.get(urlstring2)
        .then(response => 
        {
            this.state.rows2 = response.data;

            // console.log('보낼' + this.state.rows2[0].bookmark_name);

            this.setState({
                fetching: false // done!
            });

        }) // SUCCESS
        .catch(response => { 
          // console.log(response); 
        }); // ERROR
      
  };


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
      // this.state.TabTypes = 1;
      // console.log("TabTypes = " + this.state.TabTypes);
    }
    else {
      history.push('/login');
    }

    const { classes } = this.props;
    const { rows, rows2, rowsPerPage, page } = this.state;

    return (
      <div>       
       

          <div className="layout_sub_cont">
            <div className="cont_mypage_tableHeader layout_clearfix">
              <form method>
                <div className="cont_mypage_tableHeader_search">
                  <div className="cont_mypage_tableHeader_search_select">
                   
                  
                   
                  </div>
                </div>
              </form>
            </div>
            {this.state.fetchings == true && 
                  <div className="layout_sub_mypage">분류함에 API를 추가해주세요</div>
                
            } 
            <div className="favorites_name">즐겨찾기 : {this.state.bookmark_name}</div>
             
            {this.state.fetching == false &&
            <table className="tb_mypage_list">
              <thead>
                <tr>
                  <th>선택</th>
                  <th>번호</th>
                  <th>오픈 데이터 API 이름</th>
                  <th>활용 유형</th>
                  <th>URL</th>
                  <th>제공 형태</th>
                  <th>오픈 데이터 제공처</th>
                </tr>
              </thead>
              <tbody >           
                
                  {this.state.fetching == false &&
                   rows
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)  
                      .map((row, index) => 
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
                            <td id = 'test'>
                              {index + 1}
                            </td>
                            
                            <td>
                              {/* <a href="mypage_detail.html"> */}
                                {row.name}
                              {/* </a> */}
                            </td>
                            <td>{row.activity_type}</td>
                            <td> 
                              {row.url}                              
                            </td>
                            <td> {row.filetype}</td>
                            <td>{row.provider}</td>                  
                          </tr>
                      

                          );
                      })
                      
                  }
              </tbody>
            </table>
            }
            <div className="cont_mypage_btns">
              <div className="cont_mypage_btns_inner">
              <div className="cont_mypage_tableHeader_search_select">
              {/* <div>
                <select id = 'name_bookmark' value={this.state.bookmark_name} onChange={this.handleChange}>
                        {
                          rows2.map(row => {
                            return (
                                              
                              <option value={row.bookmark_no}>{row.bookmark_name}</option>
                              
                          
                          );
                          })
                        }
                </select>
              </div> */}
                   
                  </div>
                <button type="button" className="btn_btm_cancel" onClick={this.checkDelete}>
                  삭제
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
            {}
          </div>
          
          {}

        
      </div>

    );
  }
}
export default (temp_mypage_favorites);