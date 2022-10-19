import React from 'react';


import history from '../js/history';

class clock extends React.Component 
{
  
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  getAlert() {
    alert("getAlert from Child 222");
  }

  componentWillMount()          //마운트 되기 시작전
  {
    var mysession = sessionStorage.getItem("mysession");

    if(mysession == "true") {
      // console.log("mysession : " + mysession);
    }
    else
    {
      history.push("/");
    }
  }

  componentDidUpdate()
  {
   
  }

  componentDidMount()             //마운트 되는 순간
  {
    this.timerID = setInterval(   //1초마다 갱신한다.
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount()          //언마운트 될때
  {
    clearInterval(this.timerID);
    
  }

  tick() {
    this.setState                 //상태 값을 바꿀 리스트
    (
      {date: new Date()}
    );
  }

  render() {
    return (
      <div>        
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
export default clock;