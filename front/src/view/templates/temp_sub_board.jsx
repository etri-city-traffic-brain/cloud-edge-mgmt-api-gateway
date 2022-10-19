import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import styles from '../../assets/css/style.css';
import config  from "../../js/config.js";
import history from '../../js/history.js';

import CardList from '../templates/temp_sub_board_write';
import Sub_board_rewrite from '../templates/temp_sub_board_rewrite';

var myrows = [

];

var myrows2 = [

];

myrows.sort((a, b) => (a.calories < b.calories ? -1 : 1));
class sub_board extends React.Component {
    constructor(...props) {
        super(...props);
        
        this.state.TabTypes = 0;

        this.handleClick = this.handleClick.bind(this);

        this.handleClickTabTypes = this.handleClickTabTypes.bind(this);

        this.handleRewrite = this.handleRewrite.bind(this);

        this.handlePopupOpen = this.handlePopupOpen.bind(this);

        this.handleReturnCardList = this.handleReturnCardList.bind(this);
        
        this.state.community_no = this.props.community_no;

        this.state.returnPopupOpen = this.props.returnPopupOpen;

        this.state.returnTabClose = this.props.returnTabClose;

        this.handleClickTabClose = this.handleClickTabClose.bind(this);
        
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
  
    handleClick(v) {
        this.state.page = v;
    }

    handlePopupOpen() {
        this.props.returnPopupOpen();
    }

    handleReturnCardList() {
        this.props.returnTabClose();
    }


    handleClickTabTypes(community_no) 
    {    
    //   console.log("information notice_no " + community_no)
      if(community_no == community_no)
      {
        this.setState(
          {
            TabTypes : 1,
            community_no : community_no,
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
            pagemax: 0,
        };

    componentDidMount = () => {
        this._getData();

    };

    handleRewrite(community_no){
        if(community_no==community_no){
            this.setState({                
                TabTypes : 1,
            })
        }
    }

   

    _getData = async () => {
        this.setState({
            fetching: true // requesting..
        });

        // var urlstring = config.serverpoint + '/boards/' + this.props.community_no;

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

var urlstring2 = config.serverpoint + '/boards/' + this.props.community_no  + '/comment';

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
                        community_reply_contents : "내용",
                        create_time : "2019.01.21",
                    }
                    var tempdatapack = eval('(' + JSON.stringify(dataPack) + ')');

                    tempdatapack.user_id = response.data[i].user_id;                   
                    tempdatapack.community_reply_contents = response.data[i].community_reply_contents;                   
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
                 community_no={this.state.community_no} 
                 returnTabClose = {this.handleClickTabClose}
                 />
                 </div>
              }             
               {/* {
                 this.state.TabTypes == 1 && 
                 <Sub_board_rewrite
                  returnType={this.handleRewrite}            
                  community_no={this.state.community_no}   
                  community_title={this.state.community_title}                 
                  community_contents={this.state.community_contents}
                  returnPopupOpen = {this.handlePopupOpen} 
                  returnTabClose = {this.handleClickTabClose}
                 />
               } */}
            </div>
                
                
            </div>

        );
    }


}

export default sub_board;



