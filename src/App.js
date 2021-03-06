import React from 'react';

import './App.css';
import TaskForm from './compoment/TaskForm';
import Control from './compoment/Control';
import TaskList from './compoment/TaskList';
import TaskController from '../src/controller/TaskController';


class App extends React.Component {

  // myitem = new TaskController('item');

  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditing: []
    }
  }
  componentDidMount() {
    if (localStorage && localStorage.getItem('keytasks')) {
      var nochangetask = JSON.parse(localStorage.getItem('keytasks'));
      this.setState({
        tasks: nochangetask
      });
    }
  }


  // onGenerateData = () => {
  //   //console.log('hien cmn thi ');
  //   var tasks2 = [  // id : unique , name , status 
  //     {
  //       id : this.generateID(),
  //       name : 'Hoc Lap trinh',
  //       status : true
  //     },

  //     {
  //       id : this.generateID(),
  //       name : 'Di da banh ',
  //       status : true
  //     },

  //     {
  //       id : this.generateID(),
  //       name : 'Di nhat ban',
  //       status : false
  //     }
  //   ];
  //   //console.log(tasks);

  //   this.setState({
  //     tasks : tasks2 // set tasks trong state bang tasks trong ham onGenerateData
  //   });

  //   localStorage.setItem('keytasks',JSON.stringify(tasks2));
  // }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1); //floor la ham lam tron chu so.
  }
  generateID() {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
      this.s4() + this.s4() + this.s4();
  }

  onToggleForm = (id) => {
    // if (this.state.isDisplayForm && this.state.taskEditing !== null) {
    //   console.log('aaaa')
    //   this.setState({
    //     isDisplayForm : true,
    //     taskEditing : [] 
    //   });
    // } else {
    //   console.log('cccc')
    //   this.setState({
    //     isDisplayForm : !this.state.isDisplayForm,
    //     taskEditing : [] 
    //   });
    // }
    this.setState({
      isDisplayForm : !this.state.isDisplayForm,
      taskEditing : [] 
    });
    
  }
  onCloseForm = () => {
    this.setState({
      isDisplayForm: false
    });
  }

  onShowForm = (taskEditing) => {
    this.setState({
      isDisplayForm: true,
      taskEditing: taskEditing
    });
  }

  onSubmit = (data) => {
    // console.log(data);
    var {tasks} = this.state;
    data.newid = this.generateID(); // task
    tasks.push(data); // day data vao task3(task)
    this.setState({
      tasks : tasks  // new : this.state.old kieu nhu update task
    });

    //const taskEditing = tasks.find(o => o.newid === data.newid);
    // if(taskEditing === undefined){
    //   console.log(taskEditing)
    //   this.setState({
    //     tasks: !tasks
    //   });
    // }else{
    //   //console.log('ah hi hi');
    // }

    localStorage.setItem('keytasks', JSON.stringify(tasks));

  }



  // onUpdateStatus = (id) => {
  //   // console.log(id);
  //   var {tasks} = this.state;
  //   var index = this.findIndex(id);
  //   console.log(index);
  //   if (index !== -1) {
  //     //tasks[index].status  = !tasks[index].status;

  //     this.setState({
  //       tasks : tasks
  //     });
  //   }
  // }

  onUpdateStatus = (id) => {
    const { tasks } = this.state;
    const newTasks = tasks.map(task => {
      if (task.newid === id) {
        task.status = !task.status
      }
      return task;
    });
    this.setState({
      tasks: newTasks  // mang tasks trong state = newTasks 
    });
  }

  // findIndex = (id) => {
  //   // console.log(id);
  //   var {tasks} = this.state;
  //   var result = -1 ;
  //   tasks.forEach((task , index)=>{
  //     if (task.newid === id) {

  //        result = index;

  //     }
  //     return result;
  //   });
  // }

  onDelete = (id) => {
    const { tasks } = this.state;
    const newTasks = tasks.filter(task => task.newid !== id); //loc lay id khong duoc chon, roi gan cho mang task 
    this.setState({
      //tasks: newTasks  // mang tasks trong state = newTasks
      tasks: newTasks 
    });
    this.onCloseForm();
    localStorage.setItem('keytasks', JSON.stringify(newTasks))
  }

  onUpdate = (id) => {
    const {tasks} = this.state;

    const taskEditing = tasks.find(o => o.newid === id); // ham find giup tim id cua nguoi dung chon  === 

    this.onShowForm(taskEditing);
  }

  onFillter = (fillterName,fillterStatus) =>{
    console.log(fillterName - fillterStatus);
    
    //const {tasks} = this.state
    
  }

  render() {

    var tasksApp = this.state.tasks;
    var isDisplayForm = this.state.isDisplayForm;
    var taskEditing = this.state.taskEditing;

    var elemTaskForm = isDisplayForm && (
      <TaskForm
        key={taskEditing.newid}
        onSubmit={this.onSubmit}
        onCloseFormProp={this.onCloseForm}
        task={taskEditing}
      />
    );

    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row mt-15">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            {/* this is a from  */}
            {elemTaskForm}
          </div>
          <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>

            <button type="button" className="btn btn-primary" onClick={this.onToggleForm}>
              <span className="fa fa-plus mr-5" /> Thêm Công Việc
            </button>

            {/* <button 
              type="button" 
              className="btn btn-danger ml-5"
              onClick={this.onGenerateData}
              >
              Data Genergertor
            </button> */}

            {/* Search-Sort */}
            <Control />

            {/* List */}
            <TaskList 
              taskProps={tasksApp}
              onUpdateStatus={this.onUpdateStatus}
              onDelete={this.onDelete}
              onUpdate={this.onUpdate}
              onFillter={this.onFillter}
            />
            


          </div>
        </div>
      </div>
    );
  }
}


export default App;
