import React from 'react';
import logo from './logo.svg';
import AddNodeForm from './components/forms/AddNodeForm';
import { AddEdgeForm } from './components/forms/AddEdgeForm';
// import { NodeList } from './components/graph/NodeList';
import AppGraph from './components/graph/Graph'
import CyGraph from './components/graph/CyGraph'
import FnCyGraph from './components/graph/FnCyGraph'
import './App.css';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <div>
    <Layout>
      <Header>Header</Header>
      <Layout>
        <Sider>
          <h1 id="p">Add Nodes</h1>
          <AddNodeForm/>
          <h1 id="p">Add Edge</h1>
          <AddEdgeForm/>
        </Sider>
        <Content>
          <div className="canvas">
            <AppGraph/>
          </div>
          <div>
            <CyGraph/>
          </div>
          <div>
            <FnCyGraph/>
          </div>
          <div>
            {/* <NodeList/> */}
          </div>
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
    </div>
  );
}

export default App;
