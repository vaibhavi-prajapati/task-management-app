import { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddTask from "./components/AddTask";
import EditTask from "./components/EditTask";
import ErrorBoundary from "./components/ErrorBoundary";
import TaskList from "./components/TaskList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ErrorBoundary>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<TaskList />} />
              <Route exact path="/tasks" element={<TaskList />} />
              <Route exact path="/task/:taskId" element={<EditTask />} />
              <Route exact path="/add-task" element={<AddTask />} />
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </div>
    );
  }
}
export default App;
