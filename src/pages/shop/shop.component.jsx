import { useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';

import { fetchCollectionsStart } from '../../Redux/shop/shop.actions';

import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectIsCollectionFetching } from '../../Redux/shop/shop-selector';

import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import CollectionPage from '../collection/collection.component';
import Spinner from '../../components/with-spinner/spinner.component';

const CollectionOverviewWithSpinner = Spinner(CollectionOverview);
const CollectionPageWithSpinner = Spinner(CollectionPage);

const ShopPage = ({ isCollectionFetching, fetchCollectionsStart }) => {
  useEffect(() => {
    fetchCollectionsStart();
  }, []);

  return (
    <div className="shop-page">
      <Routes>
        <Route
          index
          element={
            <CollectionOverviewWithSpinner isLoading={isCollectionFetching} />
          }
        />
        <Route
          path=":category"
          element={
            <CollectionPageWithSpinner isLoading={isCollectionFetching} />
          }
        />
      </Routes>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
});

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
