import React, { useEffect } from 'react';
import './App.scss';
import { HomePage } from './pages/HomePage';
import { Header } from './components/Header/Header';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer';
import { ItemsPage } from './pages/ItemsPage/ItemsPage';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchProducts } from './features/productsSlice';
import FullPageLoader from './components/Loader/FullPageLoader';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const { status } = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <>
      <Header></Header>

      <div className="container">
        {status === 'loading' ? (
          <FullPageLoader />
        ) : (
          <Routes>
            <Route path="" element={<HomePage />}></Route>
            <Route path="home" element={<Navigate to="/" replace />}></Route>
            <Route
              path="phones"
              element={
                <ItemsPage
                  pageName="Mobile Phones"
                  title="Phones"
                  totalModels={24}
                />
              }
            ></Route>
            <Route
              path="tablets"
              element={
                <ItemsPage
                  pageName="Tablets"
                  title="Tablets"
                  totalModels={103}
                />
              }
            ></Route>
            <Route
              path="accessories"
              element={
                <ItemsPage
                  pageName="Accessories"
                  title="Accessories"
                  totalModels={122}
                />
              }
            ></Route>
            <Route path="favorites" element={<FavoritesPage />}></Route>
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>
        )}

        <Footer />
      </div>
    </>
  );
};

export default App;
