import React, { Component } from 'react';
import logo from './logo.svg';

import './App.css';

class App extends Component {

  state = {
    list: []
  }

  componentDidMount() {
    fetch('https://www.fanyongfeng.com/api/list').then(res => {
      res.json().then((result) => {
        this.setState({
          list: result.data
        })
      }).catch(err => {
        console.log(err);
      })
    })
  }

  render() {
    let {list} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {
          list.map(item => {
            return (
              <div key={item.name}>{item.name}</div>
            )
          })
        }
      </div>
    );
  }
}

export default App;
