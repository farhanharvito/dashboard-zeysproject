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
  const hasValue = value && value.trim() !== '';

  return (
    <Box>
      <Text mb="6px" color={hasValue ? '#0066FF' : 'white'}>
        {label}
      </Text>
      <Input
        placeholder={placeholder}
        name={name}
        value={value}
        readOnly={readOnly}
        onChange={onChange}
        isDisabled={readOnly}
        size={size}
        type={type}
        color={hasValue ? '#0066FF' : 'white'} // Set the input text color based on input value
      />
    </Box>
  );
};

export default FormInput;
