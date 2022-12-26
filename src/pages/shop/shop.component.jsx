import React from 'react';
import CollectionOverview from '../../components/header/collection-overview/collection-overview.component';
import './shop.styles.scss';
import { Route, Routes } from 'react-router-dom';
import CollectionPage from '../collection/collection.component';

const ShopPage = () => {
  return (
    <div className="shop-page">
      <Routes>
        <Route index element={<CollectionOverview />} />
        <Route path=":category" element={<CollectionPage />} />
      </Routes>
    </div>
  );
};

export default ShopPage;
