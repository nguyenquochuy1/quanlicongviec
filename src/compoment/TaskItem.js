import React from 'react';

class TaskItem extends React.Component {

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.newid);
    }
    onDelete = () =>{
        this.props.onDelete(this.props.task.newid);
    }
    onUpdate = () =>{
        this.props.onUpdate(this.props.task.newid);
        //this.props.onUpdate(this.props.index);
    }
    

    render(){
        var {task,index} = this.props; // dau ngoac {} giup bien props thanh 1 doi tuong ??
        //var index = this.props.index;
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{task.name}</td>
            <td className="text-center">   
                <span className={task.status === true ? 'label label-danger' : 'label label-success'} 
                      onClick = {this.onUpdateStatus}>
                    {task.status === true ? 'Kích hoạt' : 'Ẩn'}
                </span>
            </td>
            <td className="text-center">
                <button type="button" 
                        className="btn btn-warning"
                        onClick = {this.onUpdate}
                        >
                    <span className="fa fa-pencil mr-5" />Sửa
                </button>
                &nbsp;
                <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick = {this.onDelete}
                >
                    <span className="fa fa-trash mr-5" />Xóa
                </button>
            </td>
        </tr>
    );
  }
}

export default TaskItem;
