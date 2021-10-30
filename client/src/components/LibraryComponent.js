import React from "react";
import {Badge, Box, Flex, Text, useColorModeValue} from "@chakra-ui/react";
import StringUtils from "../utils/StringUtils";

export default function LibraryComponent(props){
    return (
        <Flex marginTop={5} w="full" alignItems="center" justifyContent="center" cursor={"pointer"} onClick={() => props.onClick()}>
            <Box
                bg={useColorModeValue('white', 'gray.800')}
                width="lg"
                borderWidth="1px"
                rounded="lg"
                shadow="lg"
                position="relative">
                <Box p="6">
                    <Box d="flex" alignItems="baseline">
                        {props.package.package.hasOwnProperty("keywords") ?
                            StringUtils.filterKeywords(props.package.package.keywords).map((k, i) => {
                                if(i < 3) return (
                                    <Badge rounded="full" px="2" marginRight={1} fontSize="0.8em" key={"keyword-" + props.package.name + "-" + i}>
                                        {k}
                                    </Badge>
                                )
                            }) : (
                                <Badge rounded="full" px="2" fontSize="0.8em">
                                    React
                                </Badge>
                        )}
                    </Box>
                    <Flex mt="1" justifyContent="space-between" alignContent="center">
                        <Box
                            fontSize="2xl"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                            isTruncated>
                            {props.package.package.name ? props.package.package.name : 'Unknown package name'}  <Badge>{props.package.package.version}</Badge>
                        </Box>
                    </Flex>

                    <Flex justifyContent="space-between" alignContent="center">
                            <Text fontSize={"sm"} textAlign={"left"} color={useColorModeValue('gray.800', 'gray.400')}>{props.package.package.description}</Text>
                    </Flex>
                </Box>
            </Box>
        </Flex>
    );
}
