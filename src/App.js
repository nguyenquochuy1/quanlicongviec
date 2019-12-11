import React from 'react';

import './App.css';
import TaskForm from './compoment/TaskForm';
import Control from './compoment/Control';
import TaskList from './compoment/TaskList';

class App extends React.Component {
  

  constructor(props) {
    super(props);
    this.state = { 
        tasks : []
     }
  }
  componentDidMount(){
    if(localStorage && localStorage.getItem('keytasks')){
        var nochangetask = localStorage.getItem('keytasks');
        return this.setState({
          tasks : nochangetask
        });
    }
  }
  
  onGenerateData = () => {
    //console.log('hien cmn thi ');
    var tasks2 = [  // id : unique , name , status 
      {
        id : this.generateID(),
        name : 'Hoc Lap trinh',
        status : true
      },

      {
        id : this.generateID(),
        name : 'Hoc Lap trinh',
        status : true
      },

      {
        id : this.generateID(),
        name : 'Hoc Lap trinh',
        status : true
      }
    ];
    //console.log(tasks);

    this.setState({
      tasks : tasks2 // set tasks trong state bang tasks trong ham onGenerateData
    });

    localStorage.setItem('keytasks',JSON.stringify(tasks2));
  }

  s4(){
    return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1); //floor la ham lam tron chu so.
  }
  generateID(){
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +this.s4() + '-' + 
    this.s4() + this.s4()  +this.s4() ;
  }

  render(){
    var { tasks } = this.state; // var tasks = this.state.tasks ; co the coi tasks la 1 doi tuong chu khong la bien 
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row mt-15">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            {/* this is a from  */}
            <TaskForm/>
          </div>
          <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">

            <button type="button" className="btn btn-primary">
              <span className="fa fa-plus mr-5" />Thêm Công Việc
            </button>

            <button 
              type="button" 
              className="btn btn-danger ml-5"
              onClick={this.onGenerateData}
              >
              Data Genergertor
            </button>
            
            {/* Search-Sort */}
            <Control/>
            
            {/* List */}
            <TaskList taskProps = {tasks}/>
            
          </div>
        </div>
      </div>
    );
  }
}

export default App;
