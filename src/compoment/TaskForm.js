import React from 'react';

class TaskForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      name : '',
      status : false
    }
  }

  onCloseForm = () => {
    this.props.onCloseFormProp(); // nếu sử dụng return thì sẽ trả về giá trị của hàm.
  }
  
  onHandleChange = (event) =>{ // event la 1 tham so cua su kien đại diện cho 1 sư thay đổi nội dung input
    var target = event.target; 
    
    var name = target.name; // target.name lay name cua input gan vao bien name
    var value = target.value;// target.value lay value cua selectbox va input gắn vào biến value
    if (name === 'status') {
      value = target.value === 'true' ? true : false;
    }
    
    this.setState({
        [name] : value // tuy tung name cua input hoac selecbox de lay value 
    });

    // console.log(event);
    // console.log(target);
    // console.log(target.name);
    // console.log(target.value);

  }
  onSubmit = (event) => {
    event.preventDefault();
    //this.props.onSubmit(this.state.name,this.state.status === 'true' ? true : false );  // convert chuyển string thành giá trị boolean 
                                                                                          // truyền state ra ngoài tasklist bằng cách gán props
    this.props.onSubmit(this.state);                                                    
    this.onClear();
    this.onCloseForm();
                                                                                              
  }

  onClear = () => {
    this.setState({
      name : '',
      status : false
    });
  }

  render(){
    return (

      <div className="panel panel-warning">
          <div className="panel-heading">
            <h3 className="panel-title">Thêm Công Việc
              <span className="fa fa-times-circle text-right" onClick={this.onCloseForm} />
            </h3>
          </div>
          <div className="panel-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Tên :</label>
                <input 
                  type="text" 
                  className="form-control"
                  name = "name"
                  value = {this.state.name}
                  onChange = {this.onHandleChange}
                  />
              </div>
              <label>Trạng Thái :</label>
              <select 
                className="form-control"
                required="required"
                name = "status"
                value = {this.state.status}
                onChange = {this.onHandleChange}
              >
                <option value={true}>Kích Hoạt</option>
                <option value={false}>Ẩn</option>
              </select>
              <br />
              <div className="text-center">
                <button type="submit" className="btn btn-warning">Thêm</button>&nbsp;   
                <button type="button"  
                        className="btn btn-danger"
                        onClick = {this.onClear}
                        >Hủy Bỏ
                </button>
                {/* su kien cua nut submit chi co nut submit moi hieu duoc  */}
              </div>
            </form>
          </div>
      </div>
    );
  }
}

export default TaskForm;
