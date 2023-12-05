import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navigation/navbar';
import SignIn from './pages/signIn/SignIn';
import { CreatePost } from './pages/post/CreatePost';
import { Feed } from './pages/feed/Feed';
import { Volunteers } from './pages/volunteers/Volunteers';
import { getToken } from './assets/helpers';

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/signIn" element={<SignIn />} />
      {getToken() && <Route path='/' element={< Feed/>} />}
      {getToken() && <Route path='/createPost' element={<CreatePost />}></Route>}
      {getToken() && <Route path='/volunteers' element={<Volunteers />}></Route>}

    </Routes>
    </>
  );
}

export default App;