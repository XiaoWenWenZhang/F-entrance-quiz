import React from 'react';
import { Button, message, Input } from 'antd';
import '../App.scss';

class Student extends React.Component {
  constructor(props) {
    super(props);
    // TODO GTB-知识点: - 数据解构设计不合理，前后端数据交互没有想清楚
    this.state = {
      students: [],
      currentStudent: {
        id: null,
        name: '',
      },
      currentStudentName: '芈月',
      idCount: 1,
    };
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  saveStudent = async () => {
    try {
      const response = await fetch('http://localhost:8080/add-stydent', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state.currentStudent),
      });
      if (response.status === '201') {
        message.success('提交成功');
      }
    } catch (e) {
      message.error('提交失败');
    }
  };

  // TODO GTB-知识点: - students应该从后端API去获取，既然添加学员都是添加到后端的，学员数据就不应该在前端处理
  handleOnClick = (event) => {
    event.preventDefault();
    const currentStudent = {
      id: this.state.idCount,
      name: this.state.currentStudentName,
    };

    // TODO GTB-工程实践: - 没有删除无效注释
    // eslint-disable-next-line react/no-access-state-in-setstate
    const studentsTemp = this.state.students;
    const count = this.state.idCount;
    studentsTemp.unshift(currentStudent);
    this.setState({
      students: studentsTemp,
      idCount: count + 1,
    });

    this.saveStudent(currentStudent);
  };

  render = () => {
    const { students } = this.state;

    return (
      <div className="students w">
        <h2>学员列表</h2>
        <div className="student-list">
          {students.map((student) => (
            <span className="student">
              {student.id}
              {'.'}
              {student.name}
            </span>
          ))}
        </div>
        <Input
          type="text"
          placeholder="请输入学员名称"
          value={this.state.currentStudentName}
          onChange={this.handleOnChange}
        />
        <Button
          type="primary"
          disabled={!this.state.currentStudentName}
          onClick={this.handleOnClick}
        >
          添加
        </Button>
      </div>
    );
  };
}

export default Student;
