import React from 'react';
import { Button, message } from 'antd';
import '../App.scss';

class Group extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      groups: {},
    };
  }

  handleOnClick = () => {
    this.handleGroup();
  };

  handleGroup = async () => {
    try {
      await fetch('http://localhost:8080/get-groups', {
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
    const { groups } = this.state.groups;
    return (
      <div className="group w">
        <h2>分组列表</h2>
        <Button type="primary" onClick={this.handleOnClick}>
          分组学员{groups}
        </Button>
      </div>
    );
  };
}

export default Group;
