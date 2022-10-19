import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import styles from '../../assets/css/style.css';
import history from '../../js/history';

import config  from "../../js/config.js";

var rowpack = {

  filetype_01 : "xml",
  filetype_02 : "json",
  filetype_03 : "xls",
  filetype_04 : "xlsx",
  filetype_05 : "hwp",
  filetype_06 : "txt",
  filetype_07 : "shp",
  filetype_08 : "csv",
  filetype_09 : "zip",
  filetype_10 : "jpg",
  filetype_11 : "link",
  filetype_12 : "pdf",
  filetype_13 : "doc",
  filetype_14 : "png",
  filetype_15 : "bmp",
  filetype_16 : "stl",
  filetype_17 : "ply",
  filetype_18 : "gif",
  filetype_19 : "mp4",
  filetype_20 : "dwg",

  openapi_category_odag : "공간정보",
  name : "교통사고 GIS 노선별 검색",
  views_count : 58,
  comment : "교통시설, 교통수단 및 교통안전과 관련된 교통 정보 교통안전",
  update_time : "2019.01.21",
  provider : "국가 교통부",  
  activity_type : "RESTful",
  openapi_no : "e"
}


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


class sub_cardList extends React.Component 
{
  constructor(...props) {
    super(...props);
    this.handleClick = this.handleClick.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
    this.state.dataType = this.props.dataType;
    this.state.word = this.props.word;
    this.state.category = this.props.category;
    this.state.views_count = this.props.views_count;

    this.state.rowsPerPage = 10;
    this.state.page = 0;
    this.state.pagemap = new Array();
    this.state.startpage = 0;
    this.state.endpage = 0;
  
  }

  handleCardClick(type , activity_type)
  {
    this.props.returnType(type , activity_type);
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

    var requesturl = config.serverpoint + "/"

    // console.log("word: " + this.state.word);
    // console.log("(temp_cardlist)category: " + this.state.category);

    if(this.state.word !== null && this.state.dataType == "tool" && this.state.category == null) {
      requesturl += "search/tool?name=" + this.state.word;
    }
    else if(this.state.word !== null && this.state.dataType == "tool" && this.state.category == "undefined") {
      requesturl += "search/tool?name=" + this.state.word;
    }
    else if(this.state.word !== null && this.state.dataType == "tool" && this.state.category == this.state.category) {
      requesturl += "search/tool?name=" + this.state.word + "&category=" + this.state.category;
    }    
    
    else if (this.state.category !== null){
      requesturl += "category/" + this.state.category;
    }
    else {
      if(this.state.dataType == "tool")
      {
        requesturl += "tool";
      }
      else if(this.state.dataType == "bigdata")
      {
        requesturl += "tool/bigdata";
      }
      else if(this.state.dataType == "AI")
      {
        requesturl += "tool/AI";
      }
      else if(this.state.dataType == "etc")
      {
        requesturl += "tool/etc";
      }
    }   
    
    // console.log("requesturl: " + requesturl);

    await axios.get(requesturl,{
      user_id : sessionStorage.getItem("user"),
    })
    .then( response => 
    {
        
        var newRows = [];
        // console.log(response.data);
        // console.log('aaa user = ' + sessionStorage.getItem("user")) 

        for(var i = 0 ; i < response.data.length ; i++)
        {
          if(response.data == "검색 결과가 없습니다."){
            // console.log("aaa" + response.data)
            alert("검색 결과가 없습니다. 다시 입력해주세요");
            history.push("../tool");
            window.location.reload();
            return;
          }
            var dataPack = 
            {                
                filetype_01 : null, //xml
                filetype_02 : null, //json
                filetype_03 : null, //xls
                filetype_04 : null, //xlsx
                filetype_05 : null, //hwp
                filetype_06 : null, //txt
                filetype_07 : null, //shp
                filetype_08 : null, //csv
                filetype_09 : null, //zip
                filetype_10 : null, //jpg
                filetype_11 : null, //link
                filetype_12 : null, //pdf
                filetype_13 : null, //doc
                filetype_14 : null, //png
                filetype_15 : null, //bmp
                filetype_16 : null, //stl
                filetype_17 : null, //ply
                filetype_18 : null, //gif
                filetype_19 : null, //mp4
                filetype_20 : null, //dwg

                category : "분류없음",
                name : "교통사고 GIS 노선별 검색",
                views_count : 58,
                comment : "교통시설, 교통수단 및 교통안전과 관련된 교통 정보 교통안전",
                update_time : "2019.01.21",
                provider : "국가 교통부",  
                activity_type : "RESTful",
                tool_no : "e"
            }
            var tempdatapack = eval('(' + JSON.stringify(dataPack) + ')');

            tempdatapack.name = response.data[i].name;    
            tempdatapack.provider = response.data[i].provider;    
            tempdatapack.comment = response.data[i].comment;    
            tempdatapack.update_time = response.data[i].update_time; 
            tempdatapack.views_count = response.data[i].views_count;
            tempdatapack.activity_type = response.data[i].activity_type;
            tempdatapack.tool_no = response.data[i].tool_no;                

            if(response.data[i].category != null || response.data[i].category != undefined)
            tempdatapack.category = response.data[i].category;   
            
            if(response.data[i].filetype_01 != null || response.data[i].filetype_01 != undefined)
            tempdatapack.filetype_01 = response.data[i].filetype_01;

            if(response.data[i].filetype_02 != null || response.data[i].filetype_02 != undefined)
            tempdatapack.filetype_02 = response.data[i].filetype_02;

            if(response.data[i].filetype_03 != null || response.data[i].filetype_03 != undefined)
            tempdatapack.filetype_03 = response.data[i].filetype_03;

            if(response.data[i].filetype_04 != null || response.data[i].filetype_04 != undefined)
            tempdatapack.filetype_04 = response.data[i].filetype_04;

            if(response.data[i].filetype_05 != null || response.data[i].filetype_05 != undefined)
            tempdatapack.filetype_05 = response.data[i].filetype_05;

            if(response.data[i].filetype_06 != null || response.data[i].filetype_06 != undefined)
            tempdatapack.filetype_06 = response.data[i].filetype_06;

            if(response.data[i].filetype_07 != null || response.data[i].filetype_07 != undefined)
            tempdatapack.filetype_07 = response.data[i].filetype_07;

            if(response.data[i].filetype_08 != null || response.data[i].filetype_08 != undefined)
            tempdatapack.filetype_08 = response.data[i].filetype_08;

            if(response.data[i].filetype_09 != null || response.data[i].filetype_09 != undefined)
            tempdatapack.filetype_09 = response.data[i].filetype_09;

            if(response.data[i].filetype_10 != null || response.data[i].filetype_10 != undefined)
            tempdatapack.filetype_10 = response.data[i].filetype_10;

            if(response.data[i].filetype_11 != null || response.data[i].filetype_11 != undefined)
            tempdatapack.filetype_11 = response.data[i].filetype_11;

            if(response.data[i].filetype_12 != null || response.data[i].filetype_12 != undefined)
            tempdatapack.filetype_12 = response.data[i].filetype_12;

            if(response.data[i].filetype_13 != null || response.data[i].filetype_13 != undefined)
            tempdatapack.filetype_13 = response.data[i].filetype_13;

            if(response.data[i].filetype_14 != null || response.data[i].filetype_14 != undefined)
            tempdatapack.filetype_14 = response.data[i].filetype_14;

            if(response.data[i].filetype_15 != null || response.data[i].filetype_15 != undefined)
            tempdatapack.filetype_15 = response.data[i].filetype_15;

            if(response.data[i].filetype_16 != null || response.data[i].filetype_16 != undefined)
            tempdatapack.filetype_16 = response.data[i].filetype_16;

            if(response.data[i].filetype_17 != null || response.data[i].filetype_17 != undefined)
            tempdatapack.filetype_17 = response.data[i].filetype_17;

            if(response.data[i].filetype_18 != null || response.data[i].filetype_18 != undefined)
            tempdatapack.filetype_18 = response.data[i].filetype_18;

            if(response.data[i].filetype_19 != null || response.data[i].filetype_19 != undefined)
            tempdatapack.filetype_19 = response.data[i].filetype_19;

            if(response.data[i].filetype_20 != null || response.data[i].filetype_20 != undefined)
            tempdatapack.filetype_20 = response.data[i].filetype_20;

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
    const { rows, rowsPerPage, page } = this.state;
   
    return (
      <div>
        <ul className="cont_data_list layout_clearfix">      
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => 
              {
                return (

                
                    <li>
                      <div className="cont_data_label layout_clearfix">
                        
                        {row.filetype_01 != null && <div className={row.filetype_01}>{row.filetype_01}</div>}
                        {row.filetype_02 != null && <div className={row.filetype_02}>{row.filetype_02}</div>}
                        {row.filetype_03 != null && <div className={row.filetype_03}>{row.filetype_03}</div>}
                        {row.filetype_04 != null && <div className={row.filetype_04}>{row.filetype_04}</div>}
                        {row.filetype_05 != null && <div className={row.filetype_05}>{row.filetype_05}</div>}
                        {row.filetype_06 != null && <div className={row.filetype_06}>{row.filetype_06}</div>}
                        {row.filetype_07 != null && <div className={row.filetype_07}>{row.filetype_07}</div>}
                        {row.filetype_08 != null && <div className={row.filetype_08}>{row.filetype_08}</div>}
                        {row.filetype_09 != null && <div className={row.filetype_09}>{row.filetype_09}</div>}
                        {row.filetype_10 != null && <div className={row.filetype_10}>{row.filetype_10}</div>}
                        {row.filetype_11 != null && <div className={row.filetype_11}>{row.filetype_11}</div>}
                        {row.filetype_12 != null && <div className={row.filetype_12}>{row.filetype_12}</div>}
                        {row.filetype_13 != null && <div className={row.filetype_13}>{row.filetype_13}</div>}                      
                        {row.filetype_14 != null && <div className={row.filetype_14}>{row.filetype_14}</div>}  
                        {row.filetype_15 != null && <div className={row.filetype_15}>{row.filetype_15}</div>}  
                        {row.filetype_16 != null && <div className={row.filetype_16}>{row.filetype_16}</div>}  
                        {row.filetype_17 != null && <div className={row.filetype_17}>{row.filetype_17}</div>}  
                        {row.filetype_18 != null && <div className={row.filetype_18}>{row.filetype_18}</div>}  
                        {row.filetype_19 != null && <div className={row.filetype_19}>{row.filetype_19}</div>}  
                        {row.filetype_20 != null && <div className={row.filetype_20}>{row.filetype_20}</div>}  

                        
                      </div>
                     
                      <div className="cont_data_tit layout_clearfix" onClick={(e) => this.handleCardClick(row.tool_no , row.category)}>
                        <div className="cont_data_tit_category">{row.category}  </div>
                        <div className="cont_data_tit_txt">{row.name}</div>
                        <div className="cont_data_tit_hit">
                          <span>조회수</span>
                          <strong>{row.views_count}</strong>
                        </div>
                      </div>
                      
                      <div className="cont_data_body layout_clearfix">
                        <p>{row.comment}</p>
                        <div className="cont_data_body_info">
                          <div>
                            <span>수정일</span>
                            <strong>{row.update_time}</strong>
                          </div>
                          <div>
                            <span>제공처</span>
                            <strong>{row.provider}</strong>
                          </div>
                          <div>
                            <span>활용유형</span>
                            <strong>{row.activity_type}</strong>
                          </div>
                        </div>
                      </div>
                      {}
                    </li>
                );
              })
            }


        </ul>
                
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
      </div>

    );
  }

 
}

export default sub_cardList;


// <li>
// <div className="cont_data_label layout_clearfix">
//   <div className="json">json</div>
//   <div className="xml">xml</div>
//   <div className="xls">xls</div>
// </div>
// {}
// <div className="cont_data_tit layout_clearfix">
//   <div className="cont_data_tit_category">공간 정보</div>
//   <div className="cont_data_tit_txt">
//     교통사고 GIS 노선별 검색
//             </div>
//   <div className="cont_data_tit_hit">
//     <span>조회수</span>
//     <strong>58</strong>
//   </div>
// </div>
// {}
// <div className="cont_data_body layout_clearfix">
//   <p>
//     교통시설, 교통수단 및 교통안전과 관련된 교통 정보 교통안전
//           </p>
//   <div className="cont_data_body_info">
//     <div>
//       <span>수정일</span>
//       <strong>2019.01.21</strong>
//     </div>
//     <div>
//       <span>제공처</span>
//       <strong>국가교통부</strong>
//     </div>
//     <div>
//       <span>활동유형</span>
//       <strong>RESTful</strong>
//     </div>
//   </div>
// </div>
// {}
// </li>






