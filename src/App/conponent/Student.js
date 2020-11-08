import React from 'react';
import { message } from 'antd';
import '../../style/Student.css';

class Student extends React.Component {
  constructor(props) {
    super(props);
    // TODO GTB-知识点: - 数据解构设计不合理，前后端数据交互没有想清楚
    this.state = {
      students: [],
      studentName: '+ 添加学员',
    };
  }

  componentDidMount = () => {
    this.getStudents();
  };

  getStudents = async () => {
    try {
      await fetch('http://localhost:8080/students', {
        method: 'GET',
      })
        .then((Response) => {
          if (Response.status === 200) return Response.json();
          Promise.reject();
          return 0;
        })
        .then((jsonData) => {
          this.setState({
            students: jsonData,
          });
        });
    } catch (e) {
      message.error(e);
    }
  };

  handleCommit = (e) => {
    if (e.keyCode === 13) {
      this.saveStudent();
    }
  };

  saveStudent = async () => {
    try {
      await fetch('http://localhost:8080/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state.studentName),
      })
        .then(() =>
          this.setState({
            studentName: '',
          })
        )
        .then(this.getStudents);
    } catch (e) {
      message.error('提交失败');
    }
  };

  handleOnChange = (event) => {
    this.setState({
      studentName: event.target.value,
    });
  };

  // TODO GTB-知识点: - students应该从后端API去获取，既然添加学员都是添加到后端的，学员数据就不应该在前端处理
  handleFocus = () => {
    this.setState({
      studentName: '',
    });
  };

  handleBlur = () => {
    this.setState({
      studentName: '+ 添加学员',
    });
  };

  render = () => {
    const { students } = this.state;

    return (
      <div className="student">
        <h2 className="student-header">学员列表</h2>
        <div className="student-main">
          {students.map((student) => (
            <span className="student-item">
              {student.id}. {student.name}
            </span>
          ))}
          <input
            className="student-item add-student"
            onFocus={this.handleFocus}
            name="studentName"
            value={this.state.studentName}
            onKeyUp={this.handleCommit}
            onChange={this.handleOnChange}
            onBlur={this.handleBlur}
          />
        </div>
      </div>
    );
  };
}

export default Student;
