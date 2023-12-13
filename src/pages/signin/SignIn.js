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
      localStorage.setItem('accessToken', res.token);
      navigate('/admin/dashboard', { replace: true });
    } catch (e) {}
    setIsLoading(false);
  };
  return (
    <Box
      display="flex"
      minH={'100vh'}
      bgGradient="linear(to-r, #F94449 37.55%, #A62D31 184.78%)"
    >
      <Card w="628px" minH="516px" margin="auto" padding="40px">
        <Image
          // src={Constants.CODEMASTERS_LOGO}
          src={window.location.origin + '/codemasters_logo.png'}
          alignSelf="center"
          width="290px"
          height="32px"
        />
        <Text alignSelf="center" mt="25px" fontSize="20px" fontWeight="800">
          SIGN IN
        </Text>
        <Text
          alignSelf="center"
          fontSize="20px"
          fontWeight="500"
          color="#667085"
        >
          Enter your credentials to access your token
        </Text>
        <Box mt="40px" />
        <Flex direction="column" gap="16px">
          <FormInput
            name="email"
            value={form.email}
            onChange={handleChange}
            label="email"
            placeholder="Enter your Email"
          />
          <FormInput
            name="password"
            value={form.password}
            onChange={handleChange}
            label="password"
            type="password"
            placeholder="Enter your password"
          />
        </Flex>
        <Box mt="40px" />
        <Button
          text="Submit"
          isLoading={isLoading}
          onClick={handleSubmit}
          isBggradient
        />
        <Center mt="40px">
          <Stack direction="row" spacing="3px">
            <Text>Forgot your password? </Text>
            <Text color="#F94449">Reset Password</Text>
          </Stack>
        </Center>
      </Card>
    </Box>
  );
};

export default SignIn;
