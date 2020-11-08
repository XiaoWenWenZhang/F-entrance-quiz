import React, { Component } from 'react';
import './App.scss';
import Group from './conponent/Group';
import Student from './conponent/Student';

class App extends Component {
  render() {
    return (
      <div data-testid="app" className="App ">
        <div className="page-heart">
          <Group />
          <Student />
        </div>
        {/* TODO GTB-知识点： 第一层组件划分合理 */}
      </div>
    );
  }
}

export default App;
// TODO GTB-工程实践: - 没有小步提交，commit信息不可读
