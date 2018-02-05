import React from "react";
import ReactDOM from "react-dom";
import data from "./data.json";
import styles from "./index.css";



class Todo extends React.Component {
  constructor() {
    super();
    this.state={
       data:data.data,
       text: ''
    }
  }

handleSubmit =(e) =>{
  e.preventDefault();
  if (!this.state.text.length) {
      return;
    }
    const newItem = {
      id: Date.now(),
      text: this.state.text,
      status:false
    };
    this.setState(prevState => ({
      data: prevState.data.concat(newItem),
      text: ''
    }));
    // console.log(this.state.data)
}
handleChange=(e)=> {
  // console.log(e.target.value);
    this.setState({ text: e.target.value });
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
      <br />
      <input type="text" placeholder="Task Name" className="form-control" onChange={this.handleChange} value={this.state.text}/>
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
