
import { useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchFilms } from './store/slices/filmsSlice';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { useSelector } from 'react-redux';
import UniquePage from './pages/UniquePage/UniquePage';

function App() {
  const disptach = useAppDispatch()
  const {page} = useAppSelector((state) => state.filmsData)
  useEffect(() => {
    window.scrollTo(0, 0)
    disptach(fetchFilms(page))
  }, [page])
  return (
    <div className="App">
     <Header />
     <Routes>
      <Route path='/' element={<HomePage /> }/>
      <Route path='/:id' element={<UniquePage />} />
     </Routes>
    </div>
  );
}

export default App;
