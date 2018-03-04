import React from "react";
import ReactDOM from "react-dom";
import data from "./data.json";
import styles from "./index.css";
import classnames from "classnames/bind"

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state={
       data:data.data,
       text: '',
       update:'',
       active: false,
       editing:false

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
editData=(e)=>{
const cc = e.id
const edit = e.id +'edit'
document.getElementById(cc).style.display = "none";
document.getElementById(edit).style.display = "block";
}
removeData=(e)=>{
 var newSate = this.state.data;
 for(var i=0;i< newSate.length;i++){
   if(newSate[i].id==e.id){
     newSate.splice(i,1);
   }
 }
this.setState({
  data:newSate
})
}

handleSubmit =(e) =>{
  e.preventDefault();

  if ((!this.state.text.length) || (this.state.text.trim()=='')) {
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

handleSubmitUpdate =(e) =>{
const cc = e.id
const edit = e.id +'edit'

  if ((!this.state.update.length) || (this.state.update.trim()=='')) {
    document.getElementById(cc).style.display = "block";
    document.getElementById(edit).style.display = "none";
      return;
    }
    var newSate = this.state.data;
    for(var i=0;i< newSate.length;i++){
      if(newSate[i].id==e.id){
        newSate[i].text=this.state.update
      }
    }
    this.setState({
      data:newSate,
      update:''

    })
    document.getElementById(cc).style.display = "block";
    document.getElementById(edit).style.display = "none";
}

handleChange=(e)=> {
    this.setState({ text: e.target.value });
  }

  handleUpdate=(e)=> {

      this.setState({ update: e.target.value });
    }

  render(){

    const list=this.state.data.map((data,id)=>

    <li className="list-group-item" key={data.id}>

    <div id={data.id}>
    <div className= "checkboxDiv">
      <input type="checkbox" onClick={(e) => this.handleClick(data, e)}/>
    </div>

    <div className="titleDiv">
      <p onDoubleClick={(e) => this.editData(data,e)}>{data.text}</p>
    </div>
    <div className="buttonDiv">

        <button className="editButton btn btn-success" onClick={(e) => this.editData(data, e)}>Edit</button>&nbsp;
        <button className="btn btn-danger removeButton" onClick={(e) => this.removeData(data, e)}>Remove</button>

    </div>
    <div className="">
    <span className="badge">{data.badge}</span>
    </div>
    </div>

    <div id={data.id+'edit'} style={{display:'none'}}>
      <input type="text"  className="form-control" style={{width:'70%',float:'left'}} defaultValue={data.text} onChange={this.handleUpdate} required/>
    <button type="submit" className="btn btn-warning" onClick={(e) => this.handleSubmitUpdate(data, e)}>Save</button>
    </div>
    </li>
  );

let borderAlert = classnames({"alertBorder": this.state.active,"form-control":true});

    return(

      <div id="wrapper">
      <h1>TODO</h1>
      <ul className="list-group">
      <div className="mainContainer">
      {list}
      </div>
      </ul>
      <br />
      <br />
      <div>
      <input type="text" placeholder="Task Name" className={borderAlert} onChange={this.handleChange} value={this.state.text}/>
      <br /><br />

      <button className="buttonAlter btn btn-info" onClick={this.handleSubmit}> Add</button>
      </div>
      </div>
    );
  }
}
ReactDOM.render(
  <Todo />,
  document.getElementById('root')
);
