"use client";
import "./globals.css";
import NextLink from "next/link";
import {
  ChakraProvider,
  Box,
  Flex,
  Heading,
  HStack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import theme from "@/theme";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head />
                        <body>
                                <RecoilRoot>
                                <ChakraProvider theme={theme}>
                                                <Box
                                                        as="header"
                                                        bg="black"
                                                        borderBottom="1px solid"
                                                        borderColor="gray.800"
                                                        px={6}
                                                        py={4}
                                                >
                                                        <Flex
                                                                align="center"
                                                                justify="space-between"
                                                                maxW="6xl"
                                                                mx="auto"
                                                        >
                                                                <Heading size="md" color="white">
                                                                        Contractor Academy
                                                                </Heading>
                                                                <HStack spacing={6} color="white">
                                                                        <ChakraLink
                                                                                as={NextLink}
                                                                                href="/"
                                                                                _hover={{ color: "gray.400" }}
                                                                        >
                                                                                Home
                                                                        </ChakraLink>
                                                                        <ChakraLink
                                                                                as={NextLink}
                                                                                href="/courses"
                                                                                _hover={{ color: "gray.400" }}
                                                                        >
                                                                                Courses
                                                                        </ChakraLink>
                                                                        <ChakraLink
                                                                                as={NextLink}
                                                                                href="/dashboard"
                                                                                _hover={{ color: "gray.400" }}
                                                                        >
                                                                                Dashboard
                                                                        </ChakraLink>
                                                                        <ChakraLink
                                                                                as={NextLink}
                                                                                href="/about"
                                                                                _hover={{ color: "gray.400" }}
                                                                        >
                                                                                About
                                                                        </ChakraLink>
                                                                        <ChakraLink
                                                                                as={NextLink}
                                                                                href="/contact"
                                                                                _hover={{ color: "gray.400" }}
                                                                        >
                                                                                Contact
                                                                        </ChakraLink>
                                                                </HStack>
                                                        </Flex>
                                                </Box>
                                                {children}
                                        </ChakraProvider>
                                </RecoilRoot>
                        </body>
                </html>
        );
}
