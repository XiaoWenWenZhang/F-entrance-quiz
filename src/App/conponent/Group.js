import React from 'react';
import { message } from 'antd';
import '../App.scss';
import '../../style/Group.css';
import GroupItem from './GroupItem';

class Group extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      groups: [],
    };
  }

  // TODO GTB-知识点: * 页面刷新的时候没有获取分组信息
  handleOnClick = (event) => {
    event.preventDefault();
    this.handleGroup();
  };

  handleGroup = async () => {
    // TODO GTB-工程实践: - 建议把数据请求提取到单独的service, URL 提取常量
    try {
      await fetch('http://localhost:8080/groups', {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
      })
        // eslint-disable-next-line consistent-return
        .then((Response) => {
          if (Response.status === 200) return Response.json();
          Promise.reject();
        })
        .then((jsonData) => {
          this.setState({
            groups: jsonData,
          });
        });
    } catch (e) {
      message.error('加载错误');
    }
  };

  render = () => {
    // TODO GTB-知识点: + 正确使用解构语法
    return (
      // TODO GTB-知识点: - css class 命名不规范，w是什么意思
      <div className="group-part">
        <div className="group-header">
          <h2 className="group-header-title">分组列表</h2>
          <button type="button" onClick={this.handleOnClick} className="group-button">
            分组学员
          </button>
        </div>
        <div className="group-main">
          {this.state.groups.map((group) => (
            <span className="group-items">
              <header className="group-name">{group.name}</header>
              <GroupItem students={group.students} />
            </span>
          ))}
        </div>
      </div>
    );
  };
}

export default Group;
