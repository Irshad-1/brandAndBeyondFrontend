import React from 'react';
import { Box, FormControl, FormLabel, Input, Button, RadioGroup, Radio, Stack, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [data, setData] = React.useState({
        name: "",
        age: 0,
        gender: "male",
        email: "",
        password: ""
    });
    const { name, age, gender, email, password } = data;
    const handleChange = (e) => {
        let { name, value } = e.target;
        setData({ ...data, [name]: value });
    }
    const handleSignUp = async () => {
        try {
            let res = await fetch('https://brandbeyondserver.herokuapp.com/createuser', {
                method: "POST",
                body: JSON.stringify({ name, age, gender, email, password }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            let data = await res.json();
            if (data.message)
                toast({
                    title: 'Email already Exist',
                    description: "User already exist with this email ID",
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                });
            else {
                toast({
                    title: 'Account created',
                    description: "Account created successfully going to login Page",
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                });
                navigate('../login');
            }

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Box width="50%" margin="50px auto">
            <FormControl padding="20px 0px">
                <FormLabel>Name</FormLabel>
                <Input value={name} type="text" name="name" placeholder='Enter name' onChange={handleChange} />
            </FormControl>
            <FormControl padding="20px 0px">
                <FormLabel>Age</FormLabel>
                <Input value={age} type="number" name="age" placeholder='Enter age' onChange={handleChange} />
            </FormControl>
            <FormControl padding="20px 0px">
                <FormLabel>Gender</FormLabel>
                <RadioGroup onChange={handleChange} value={gender} name="gender">
                    <Stack spacing="5" direction="row">
                        <Radio value="male">Male</Radio>
                        <Radio value="female">Female</Radio>
                    </Stack>
                </RadioGroup>
            </FormControl>
            <FormControl padding="20px 0px">
                <FormLabel>Email</FormLabel>
                <Input value={email} type="text" name="email" placeholder='Enter email' onChange={handleChange} />
            </FormControl>
            <FormControl padding="20px 0px">
                <FormLabel>Password</FormLabel>
                <Input value={password} type="text" name="password" placeholder='Enter password' onChange={handleChange} />
            </FormControl>
            <Button colorScheme="blue" onClick={handleSignUp}>Sign Up</Button>
        </Box>
    )
}
