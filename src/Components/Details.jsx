import React from 'react';
import { Box, Button, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const Details = () => {
    const navigate = useNavigate();
    const [data, setData] = React.useState({});
    async function getUser(token) {
        try {
            let res = await fetch('https://brandbeyondserver.herokuapp.com/getuser', {
                method: "GET",
                headers: {
                    token
                }
            });
            res = await res.json();
            setData(res);
        } catch (error) {
            console.log(error);
        }
    }
    const handleLogout = () => {
        localStorage.removeItem('brandbeyond');
    }

    React.useEffect(() => {
        let token = localStorage.getItem('brandbeyond');
        if (!token)
            navigate("/login");
        else {
            getUser(token);
        }
    }, [handleLogout])
    return (
        <Box width="40%" margin="40px auto" position="relative">
            <Button position="absolute" right="0" top="0" colorScheme="red" onClick={handleLogout}>Logout</Button>
            <Heading size="lg" color="#256D85">{`Name:    ${data.name}`}</Heading>
            <Heading size="lg" color="#256D85">{`Age:    ${data.age}`}</Heading>
            <Heading size="lg" color="#256D85">{`Gender:    ${data.gender}`}</Heading>
            <Heading size="lg" color="#256D85">{`Email:    ${data.email}`}</Heading>
        </Box>
    )
}
