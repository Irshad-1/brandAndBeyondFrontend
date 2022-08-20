import React from 'react';
import {
    Box, Table,
    Thead,
    Tbody, Tr,
    Th,
    Td,
} from "@chakra-ui/react";
import { useParams, useNavigate } from 'react-router-dom';

export const Admin = () => {
    const [data, setData] = React.useState([]);
    const navigate = useNavigate();
    const { apikey } = useParams();

    const getData = async (apikey) => {
        try {
            let res = await fetch(`https://brandbeyondserver.herokuapp.com/getall?apikey=${apikey}`);
            res = await res.json();
            if (res.message) {
                alert("Unauthorized access");
                navigate('../');
            }
            else {
                setData(res);
            }
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        getData(apikey);
    }, [])

    return (
        <Box width="80%" margin="40px auto">
            <Table colorScheme="facebook" variant="striped" >
                <Thead>
                    <Tr>
                        <Th>Id</Th>
                        <Th>Name</Th>
                        <Th>Age</Th>
                        <Th>Gender</Th>
                        <Th>Email</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((ele, index) => {
                        return (<Tr key={index}>
                            <Td>{index + 1}</Td>
                            <Td>{ele.name}</Td>
                            <Td>{ele.age}</Td>
                            <Td>{ele.gender}</Td>
                            <Td>{ele.email}</Td>
                        </Tr>)
                    })}
                </Tbody>
            </Table>
        </Box>
    )
}
