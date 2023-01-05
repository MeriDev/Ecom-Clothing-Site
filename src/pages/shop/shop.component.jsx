import { useEffect, useState } from 'react';

import './shop.styles.scss';

import { Route, Routes } from 'react-router-dom';

import { onSnapshot, collection, getDocs } from 'firebase/firestore';
import {
  db,
  convertCollectcionsSnapshotToObjects,
} from '../../firebase/firebase.utils';

import { updateCollections } from '../../Redux/shop/shop.actions';
import { connect } from 'react-redux';

import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import CollectionPage from '../collection/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({ updateCollections }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeFromSnapShot = () =>
      getDocs(collection(db, 'collections')).then(async snapshot => {
        const collectionsMap = convertCollectcionsSnapshotToObjects(snapshot);
        updateCollections(collectionsMap);

        setLoading(false);
      });

    // const collectionRef = collection(db, 'collections');
    // const unsubscribeFromSnapShot = onSnapshot(
    //   collectionRef,
    //   async snapshot => {
    //     const collectionsMap = convertCollectcionsSnapshotToObjects(snapshot);
    //     updateCollections(collectionsMap);

    //     setLoading(false);
    //   }
    // );
    return () => unsubscribeFromSnapShot();
  }, []);

  return (
    <div className="shop-page">
      <Routes>
        <Route
          index
          element={<CollectionOverviewWithSpinner loading={loading} />}
        />
        <Route
          path=":category"
          element={<CollectionPageWithSpinner loading={loading} />}
        />
      </Routes>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
