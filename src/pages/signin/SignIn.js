import { Box, Center, Text, Image, Card, Flex, Stack } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import FormInput from '../../components/FormInput';
// import Constants from '../../constants';
import { useAuth } from '../../services';

const SignIn = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await signIn(form);
      navigate('/admin/dashboard', { replace: true });
    } catch (e) {}
    setIsLoading(false);
  };
  return (
    <Box display="flex" minH={'100vh'} bgColor={'#1B1B1B'}>
      <Card
        w="628px"
        minH="516px"
        margin="auto"
        padding="40px"
        bgColor={'#1B1B1B'}
        border="1px"
        borderColor={'white'}
      >
        <Image
          // src={Constants.CODEMASTERS_LOGO}
          src={window.location.origin + '/zeyslogo.png'}
          alignSelf="center"
          width="305px"
          height="90px"
        />
        <Text
          alignSelf="center"
          mt="25px"
          fontSize="20px"
          fontWeight="800"
          color="white"
        >
          SIGN IN
        </Text>
        <Text alignSelf="center" fontSize="20px" fontWeight="500" color="white">
          Enter your credentials to login
        </Text>
        <Box mt="40px" />
        <Flex direction="column" gap="16px">
          <FormInput
            name="email"
            value={form.email}
            onChange={handleChange}
            label="Email"
            placeholder="Enter your Email"
          />
          <FormInput
            name="password"
            value={form.password}
            onChange={handleChange}
            label="Password"
            type="password"
            placeholder="Enter your password"
          />
        </Flex>
        <Box mt="40px" />
        <Button
          text="Submit"
          isLoading={isLoading}
          onClick={handleSubmit}
          bgColor="#0066FF"
        />
        <Center mt="40px">
          <Stack direction="row" spacing="3px">
            <Text color="white">Forgot your password? </Text>
            <Text color="#0066FF">Reset Password</Text>
          </Stack>
        </Center>
      </Card>
    </Box>
  );
};

export default SignIn;
