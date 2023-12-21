import { Button as CButton } from '@chakra-ui/react';

const Button = ({
  text,
  bgColor = '#0066FF',
  onClick,
  isBggradient,
  variant = 'solid',
  textColor = 'white',
  isLoading,
}) => {
  return (
    <CButton
      _hover={{ bg: bgColor }}
      isLoading={isLoading}
      variant={variant}
      onClick={onClick}
      size="md"
      backgroundColor={bgColor}
      color={textColor}
    >
      {text}
    </CButton>
  );
};

export default Button;
