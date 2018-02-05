import React from "react";
import ReactDOM from "react-dom";
import data from "./data.json";
import styles from "./index.css";
import classnames from "classnames/bind"

class Todo extends React.Component {
  constructor() {
    super();
    this.state={
       data:data.data,
       text: '',
       active: false
    }
  }

  handleClick=(e)=> {

    const change = e.status === false?true:false;
    const badges = e.badge === ""?"complete":"";
    e.badge = badges;
    e.status = change
    this.setState({
      status:change,
      badge:badges
    });

  }

handleSubmit =(e) =>{
  e.preventDefault();
  if (!this.state.text.length) {
       this.setState({active: true});
      return;
    }
    this.setState({active: false});
    const newItem = {
      id: Date.now(),
      text: this.state.text,
      status:false,
      badge:""
    };
    this.setState(prevState => ({
      data: prevState.data.concat(newItem),
      text: ''
    }));
}


handleChange=(e)=> {
    this.setState({ text: e.target.value });
  }
  render(){
    const list=this.state.data.map((data,id)=>
    <li className="list-group-item" key={data.id}>
    <input type="checkbox" onClick={(e) => this.handleClick(data, e)}/>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    {data.text}<span className="badge">{data.badge}</span></li>

  );

let borderAlert = classnames({"alertBorder": this.state.active,"form-control":true});
    return(

      <div id="wrapper">
      <h1>TODO</h1>
      <ul className="list-group">
      {list}
      </ul>
      <br />
      <input type="text" placeholder="Task Name" className={borderAlert} onChange={this.handleChange} value={this.state.text}/>
      <br /><br />

      <button className="buttonAlter btn btn-info" onClick={this.handleSubmit}> Add</button>
      </div>
    );
  }
}
ReactDOM.render(
  <Todo />,
  document.getElementById('root')
);
