import './collection.styles.scss';
import CollectionItem from '../../components/collection-item/collection-item.component';
import { connect } from 'react-redux';
import { selectShopCollections } from '../../Redux/shop/shop-selector';
import { useParams } from 'react-router-dom';

const CollectionPage = ({ collection }) => {
  const { category } = useParams();
  const { title, items } = collection[category];

  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  collection: selectShopCollections(state),
});

export default connect(mapStateToProps)(CollectionPage);
