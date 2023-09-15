import './App.scss';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './com/Home';
import Join from './com/Join';
import Main from './com/Main';
import Ivan from './com/Ivan';
import Map from './com/Map';
import Context from './Context';
import Notice from './com/Notice';
import Noticedetail from './com/Noticedetail';
import Battle from './com/Battle';


function App() {
  return (
    <Context>
      <BrowserRouter basename=''>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/join' element={<Join />} />
          <Route path='/main' element={<Main />} />
          <Route path='/main/invan' element={<Ivan />} />
          <Route path='/main/map' element={<Map />} />
          <Route path='/notice' element = { <Notice /> } />
          <Route path='/notice/:id' element = { <Noticedetail /> } />
          <Route path='/battle' element = { <Battle /> } />
        </Routes>
      </BrowserRouter>
    </Context>
  );
}

export default App;
