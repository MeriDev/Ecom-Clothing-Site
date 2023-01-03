import { useEffect } from 'react';

import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import './shop.styles.scss';

import CollectionPage from '../collection/collection.component';

import { Route, Routes } from 'react-router-dom';

import { onSnapshot, collection } from 'firebase/firestore';
import {
  db,
  convertCollectcionsSnapshotToObjects,
} from '../../firebase/firebase.utils';

import { updateCollections } from '../../Redux/shop/shop.actions';
import { connect } from 'react-redux';

const ShopPage = ({ updateCollections }) => {
  useEffect(() => {
    const collectionRef = collection(db, 'collections');

    const unsubscribeFromSnapShort = onSnapshot(
      collectionRef,
      async snapshot => {
        const collectionsMap = convertCollectcionsSnapshotToObjects(snapshot);
        updateCollections(collectionsMap);
        console.log(collectionsMap);
      }
    );
    return () => unsubscribeFromSnapShort();
  }, []);

  return (
    <div className="shop-page">
      <Routes>
        <Route index element={<CollectionOverview />} />
        <Route path=":category" element={<CollectionPage />} />
      </Routes>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
