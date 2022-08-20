import React from 'react';
import { Box, FormControl, FormLabel, Button, Input, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


export const Login = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [data, setData] = React.useState({
        email: "",
        password: ""
    });
    const { email, password } = data;
    const handleChange = (e) => {
        let { name, value } = e.target;
        setData({ ...data, [name]: value });
    }
    const handleLogin = async () => {
        try {
            let res = await fetch('https://brandbeyondserver.herokuapp.com/login', {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            res = await res.json();
            if (res.token) {
                localStorage.setItem('brandbeyond', res.token);
                toast({
                    title: 'Log In successful',
                    description: "Logged In successfully redirecting to homepage",
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                });
                navigate('../');
            }
            else {
                toast({
                    title: 'Invalid details',
                    description: "Wrond Login Details",
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
    React.useEffect(() => {
        let token = localStorage.getItem('brandbeyond');
        if (token)
            navigate("../");
    }, [])
    return (
        <Box width="50%" margin="50px auto">
            <FormControl padding="20px 0px">
                <FormLabel>Email</FormLabel>
                <Input value={email} type="text" name="email" placeholder='Enter email' onChange={handleChange} />
            </FormControl>
            <FormControl padding="20px 0px">
                <FormLabel>Password</FormLabel>
                <Input value={password} type="text" name="password" placeholder='Enter password' onChange={handleChange} />
            </FormControl>
            <Box display="flex" justifyContent="space-around">
                <Button colorScheme="green" onClick={handleLogin}>Login</Button>
                <Button colorScheme="blue" onClick={() => {
                    navigate("../signup");
                }}>Create an Account</Button>
            </Box>
        </Box>
    )
}
