import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { AddNodeForm } from './components/forms/AddNodeForm';
import { AddEdgeForm } from './components/forms/AddEdgeForm';
import { NodeList } from './components/graph/GraphComponent';
import { AppGraph } from './components/graph/Graph'
import './App.css';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header>
      </Header>
      <Layout>
        <Sider>
          <p id="p">Add Node</p>
          <AddNodeForm/>
          <p id="p">Add Edge</p>
          <AddEdgeForm/>
        </Sider>
        <Content>
          <div id="canvas"></div>
          <NodeList/>
          <AppGraph/>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              {/* <Counter /> */}
              <p>
                Edit <code>src/App.js</code> and saaddde dto reload!
              </p>
              <span>
                <span>Learn </span>
                <a
                  className="App-link"
                  href="https://reactjs.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  React
                </a>
                <span>, </span>
                <a
                  className="App-link"
                  href="https://redux.js.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Redux
                </a>
                <span>, </span>
                <a
                  className="App-link"
                  href="https://redux-toolkit.js.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Redux Toolkit
                </a>
                ,<span> and </span>
                <a
                  className="App-link"
                  href="https://react-redux.js.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  React Redux
                </a>
              </span>
            </header>
          </div>
        </Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default App;
