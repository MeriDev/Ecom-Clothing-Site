import './collection-item.styles.scss';
import { connect } from 'react-redux';
import CustomBtn from '../custom-button/custom-button-component';
import { addItemsToCart } from '../../Redux/cart/cart-actions';

const CollectionItem = ({ item, addItemsToCart }) => {
  const { name, price, imageUrl } = item;

  return (
    <div className="collection-item">
      <div
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
        className="image"
      ></div>
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <CustomBtn
        className="custom-button"
        onClick={() => addItemsToCart(item)}
        inverted
      >
        Add to Cart
      </CustomBtn>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  addItemsToCart: item => dispatch(addItemsToCart(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
