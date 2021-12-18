import 'bootstrap/dist/css/bootstrap.min.css';
import '@popperjs/core/dist/cjs/popper.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Home from './Home';
import Menu from './Menu';
import Task from './components/Task';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Router>
      <Menu/>
      <Routes>
        <Route exact path="/" element={[<Home/>, <Task admin={false}/>]}/>
        <Route exact path="/tasks" element={<Task admin={true}/>}/>
      </Routes>
    </Router>
  );

}

export default App;
