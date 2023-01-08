import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

const Spinner =
  WrappedComponent =>
  ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };

export default Spinner;
