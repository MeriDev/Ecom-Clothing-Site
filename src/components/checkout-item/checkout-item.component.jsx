import './checkout-item.styles.scss';
import { connect } from 'react-redux';
import {
  clearItemsFromCart,
  removeItemFromCart,
  addItemsToCart,
} from '../../Redux/cart/cart-actions';

const CheckoutItem = ({ cartItem, clearItem, RemoveItem, addItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <div className="checkout-item ">
      <div className="image-container">
        <img src={imageUrl} alt="checkout item" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => RemoveItem(cartItem)}>
          &#10094;
        </div>
        <div className="value"> {quantity}</div>
        <div className="arrow" onClick={() => addItem(cartItem)}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={() => clearItem(cartItem)}>
        &#10005;
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  clearItem: item => dispatch(clearItemsFromCart(item)),
  RemoveItem: item => dispatch(removeItemFromCart(item)),
  addItem: item => dispatch(addItemsToCart(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
