import { Box, Text, Input } from '@chakra-ui/react';

const FormInput = ({
  name,
  value,
  onChange,
  label,
  placeholder,
  size = 'md',
  type,
  readOnly,
}) => {
  return (
    <Box>
      <Text mb="6px">{label}</Text>
      <Input
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        isDisabled={readOnly}
        size={size}
        type={type}
      />
    </Box>
  );
};

export default FormInput;
