import React, { Component } from "react";
import Search from "./Search";
import Users from "./Users";
import Modal from "./Modal";
import data from "./data.json";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: data,
      keyword: "",
      userEdit: null,
    };
  }

  _findIndex = (id) => this.state.userList.findIndex((user) => user.id === id);

  /**
   * Xoá user
   */
  handleDeleteUser = (user) => {
    //nhận data từ component UserItem

    const index = this._findIndex(user.id);
    if (index !== -1) {
      let userList = [...this.state.userList];
      userList.splice(index, 1);

      this.setState({
        userList,
      });
    }
  };

  /**
   * Add & Update user
   */
  handleSubmit = (user) => {
    let userList = [...this.state.userList];
    if (user.id) {
      //UPDATE
      const index = this._findIndex(user.id);
      if (index !== -1) {
        userList[index] = user;
      }
    } else {
      //ADD
      const userNew = { ...user, id: new Date().getTime() };
      userList.push(userNew);
    }

    this.setState({
      userList,
    });
  };

  handleGetKeyword = (keyword) => {
    this.setState({
      keyword,
    });
  };

  handleUserEdit = (user) => {
    this.setState({
      userEdit: user,
    });
  };

  render() {
    let { userList, keyword } = this.state;
    userList = this.state.userList.filter((user) => {
      return user.fullname.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
    });

    return (
      <div className="container">
        <h1 className="display-4 text-center my-3">User Management</h1>
        <div className="d-flex justify-content-between align-items-center">
          <Search getKeyword={this.handleGetKeyword} />
          <button
            className="btn btn-success"
            data-toggle="modal"
            data-target="#modelIdUser"
            onClick={() => {
              this.setState({
                userEdit: null,
              });
            }}
          >
            Add User
          </button>
        </div>
        <Users
          userList={userList}
          getUserDelete={this.handleDeleteUser}
          getUserEdit={this.handleUserEdit}
        />
        <Modal
          getUserSubmit={this.handleSubmit}
          userEdit={this.state.userEdit}
        />
      </div>
    );
  }
}

export default Home;
