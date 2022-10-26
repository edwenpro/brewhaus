import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ClipLoader, PulseLoader } from 'react-spinners';
import Detail from './pages/detail/Detail';
import Home from './pages/home/Home';
import { selectLoadingStatus } from './selector/rootSelector';

const Router = () => {
  const isLoading = useSelector(selectLoadingStatus);
  return (
    <BrowserRouter>
      <div className='loadingSpinner'>
        <PulseLoader
          color='#36d7b7'
          loading={isLoading}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
