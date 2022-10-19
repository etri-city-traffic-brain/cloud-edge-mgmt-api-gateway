import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import styles from '../../assets/css/style.css';
import config  from "../../js/config.js";

import CardList from '../templates/temp_sub_request_write';
import Sub_board_rewrite from '../templates/temp_sub_request_rewrite';

var myrows = [

];


var myrows2 = [

];
myrows.sort((a, b) => (a.calories < b.calories ? -1 : 1));

class sub_request extends React.Component {
    constructor(...props) {
        super(...props);
        
        this.state.TabTypes = 0;

        this.handleClick = this.handleClick.bind(this);

        this.handleRewrite = this.handleRewrite.bind(this);

        this.handleClickTabTypes = this.handleClickTabTypes.bind(this);

        this.handlePopupOpen = this.handlePopupOpen.bind(this);

        this.handleReturnCardList = this.handleReturnCardList.bind(this);
        
        this.state.request_no = this.props.request_no;

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

    handleClickTabTypes(request_no) 
    {    
      // console.log("information notice_no " + request_no)
      if(request_no == request_no)
      {
        this.setState(
          {
            TabTypes : 1,
            request_no : request_no,
          }
        );      
      }
    }
    state =
        {
            rows: myrows,
            rows2: myrows2,
            page: 0,
            rowsPerPage: 10,
            pagemax: 0
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

    
    _getData = async () => {
        this.setState({
            fetching: true // requesting..
        });

        // var urlstring = config.serverpoint + '/request/' + this.props.request_no;

        // console.log('information url: ' + urlstring);
        
        // console.log(urlstring);

        // await axios.get(urlstring)
        //     .then(response => 
        //     {
        //         this.state.rows = response.data[0];

        //         this.setState({
        //             fetching: false // done!
        //         });

        //     }) // SUCCESS
        //     .catch(response => { console.log(response); }); // ERROR

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


    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };
    
      writeButton = () => {
        var url = config.serverpoint + '/request/' + this.props.request_no  + '/comment';
    
        // console.log("보낼 url = " + url);
        // console.log("보낼 내용 = " + this.state.request_reply_contents);

        if(!this.state.request_reply_contents){
          alert("내용을 입력하세요")
          return;
        }
    
        else{
          axios.post(url,{
            user_id : sessionStorage.getItem("user"),
            request_reply_contents : this.state.request_reply_contents,
          }).then(function(response){
            // console.log("information response = " + response);
            alert("댓글 작성 완료");
            window.location.reload();
          }).catch(response => { 
            // console.log("information response =" + response);
        });
        }
    
      }

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
        //console.log('count: ' + this.state.rows.count);
        return (

            <div>        
            <div className="layout_sub_cont"> 
          {
            this.state.TabTypes == 0 &&
            <div>
             <CardList returnType={this.handleClickTabTypes}                  
             request_no={this.state.request_no}     />
             </div>
          }             
           {/* {
             this.state.TabTypes == 1 && 
             <Sub_board_rewrite
              returnType={this.handleRewrite}            
              request_no={this.state.request_no}   
              request_title={this.state.request_title}                 
              request_contents={this.state.request_contents}
              returnPopupOpen = {this.handlePopupOpen} 
              returnTabClose = {this.handleClickTabClose}
             />
           } */}
        </div>
            
            
        </div>


        );
    }


}

export default sub_request;



