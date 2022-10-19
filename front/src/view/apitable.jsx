import React from 'react';



class apitable extends React.Component 
{
  constructor(props) {
    super(props);
    
  }

  componentDidMount()             //마운트 되는 순간
  {
  
  }

  
  componentWillUnmount()          //언마운트 될때
  {
    
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
       
      </div>
    );
  }

}
export default apitable;