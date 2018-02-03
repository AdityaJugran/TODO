import React from "react";
import ReactDOM from "react-dom";
import data from "./data.json";
import styles from "./index.css";



class Todo extends React.Component {
  constructor() {
    super();
    this.state={
       data:data.data
    }
  }




  render(){
    const list=this.state.data.map((data,id)=>
    <li className="list-group-item" key={data.id}>
    <input type="checkbox" />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    {data.text}<span className="badge"></span></li>

  );

    return(
      <div id="wrapper">
      <h1>TODO</h1>
      <ul className="list-group">
      {list}
      </ul>
      </div>
    );
  }
}
ReactDOM.render(
  <Todo />,
  document.getElementById('root')
);
