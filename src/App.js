// import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import {Home} from './pages/HomePage';
import {Author} from './pages/AuthorPage';
import {Post} from './pages/PostPage';
function App() {
  return (
<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='authors/:id' element={<Author/>}/>
  <Route path='posts/:id' element={<Post/>}/>
</Routes>
  );
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
