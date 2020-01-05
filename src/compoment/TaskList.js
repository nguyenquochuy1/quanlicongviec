import React from 'react';
import TaskItem from './TaskItem';

class TaskList extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        fillterName : '',
        fillterStatus : -1 // Options : all : -1 kich hoat : 0 an : 1 
    };
  }

  onChange = (event) =>{
      var target = event.target;
      var name = target.name;
      var value = target.value;
      this.props.onFillter(
          name === 'fillterName' ? value : this.state.fillterName,
          name === 'fillterStatus' ? value : this.state.fillterStatus,
      );
      this.setState({
          [name] : value
      });

  }

  render(){
    // var { taskProps }  = this.props; // var tasks = this.props.taskProps
    // var {tasks} = this.props.taskProps;
    var tasks = this.props.taskProps;
    var {fillterName,fillterStatus } = this.state;
    var eleTasks = tasks.map((task,index) => {
        return <TaskItem key={task.newid} 
                         index={index} 
                         task = {task} 
                         onUpdateStatus={this.props.onUpdateStatus}
                         onDelete = {this.props.onDelete}
                         onUpdate = {this.props.onUpdate}
                         />
        });
    return (
        
        <div className="row mt-15">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <table className="table table-bordered table-hover mt-15">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Tên</th>
                        <th className="text-center">Trạng Thái</th>
                        <th className="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td />
                    <td>
                    <input type="text" 
                           className="form-control" 
                           name="fillterName"
                           value={fillterName}
                           onChange={this.onChange}
                    />
                    </td>
                    <td>
                    <select className="form-control" 
                            name="fillterStatus"
                            value={fillterStatus}
                            onChange={this.onChange}
                            >
                        <option value={-1}>Tất Cả</option>
                        <option value={0}>Ẩn</option>
                        <option value={1}>Kích Hoạt</option>
                    </select>
                    </td>
                    <td />
                </tr>
                    {eleTasks}
                </tbody>
            </table>
            </div>
      </div>
    );
  }
}

export default TaskList;
