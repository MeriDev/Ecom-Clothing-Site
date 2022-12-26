import { CustomButtonContainer } from './custom-button.styles';

const CustomBtn = ({ children, ...props }) => {
  return <CustomButtonContainer {...props}>{children}</CustomButtonContainer>;
};

export default CustomBtn;
