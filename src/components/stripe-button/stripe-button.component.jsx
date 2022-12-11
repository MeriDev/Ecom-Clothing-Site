import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    'pk_test_51MDpFMCWH8Sns5Po8v5e8iYWVahGPYDbRyaLaf3XfLwQP2qWXyTU2RTlOtGyo2uGzmZ4wkERVO2LmxJOTxi8CkEu00FJ8xhnUj';

  const onToken = token => {
    alert('Payement Successful');
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing"
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
