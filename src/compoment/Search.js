import React from 'react';

class Search extends React.Component {


    render(){
        return (
            <div className="input-group">
                    <input name="keyword" type="text" className="form-control" placeholder="Nhập từ khóa..." />
                    <span className="input-group-btn">
                        <button className="btn btn-primary" type="button">
                        <span className="fa fa-search mr-5" />Tìm
                        </button>
                    </span>
            </div>
        );
    }
}

export default Search;