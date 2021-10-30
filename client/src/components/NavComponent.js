import {ReactNode, useEffect, useState} from 'react';
import {
    Box,
    Flex,
    Avatar,
    Link,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,
    Center, Input, Spinner,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import logoWhite from "../images/logo_white.png";
import logo from "../images/logo.png";
import githubWhite from "../images/github_white.png";
import github from "../images/github.png";

const NavLink = ({ children }) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={'#'}>
        {children}
    </Link>
);

export default function Nav(props) {
    const { colorMode, toggleColorMode } = useColorMode();

    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            props.onSearch(searchTerm);
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm])

    return (
        <>
            <Box bg={useColorModeValue('white', 'gray.900')} px={4} boxShadow="sm" position={"fixed"} width={"100vw"} zIndex={1000}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Box>
                        <img src={colorMode === 'light' ? logo : logoWhite} style={{height: 40}}/>
                    </Box>

                    <Flex alignItems={'center'}>
                        <Input placeholder="Search a React Library..." width={400}  onChange={(e) => setSearchTerm(e.target.value)} />
                        {props.isLoading && <Spinner size={"sm"} marginLeft={3}/>}
                    </Flex>

                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={3}>
                            <Button onClick={toggleColorMode}>
                                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            </Button>
                            <a href={"https://github.com/PHClement/awesome-react"} target={"_blank"}>
                                <Button>
                                    {colorMode === 'light' ? <img src={github} style={{height: 20}}/> : <img src={githubWhite}  style={{height: 20}}/>}
                                </Button>
                            </a>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}
