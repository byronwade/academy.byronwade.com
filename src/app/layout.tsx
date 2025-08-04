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
                                        <ChakraProvider>
                                                <Box as="header" bg="gray.100" px={4} py={3} mb={6}>
                                                        <Flex
                                                                align="center"
                                                                justify="space-between"
                                                                maxW="6xl"
                                                                mx="auto"
                                                        >
                                                                <Heading size="md">
                                                                        Contractor Academy
                                                                </Heading>
                                                                <HStack spacing={4}>
                                                                        <ChakraLink as={NextLink} href="/">
                                                                                Home
                                                                        </ChakraLink>
                                                                        <ChakraLink as={NextLink} href="/courses">
                                                                                Courses
                                                                        </ChakraLink>
                                                                        <ChakraLink as={NextLink} href="/dashboard">
                                                                                Dashboard
                                                                        </ChakraLink>
                                                                        <ChakraLink as={NextLink} href="/about">
                                                                                About
                                                                        </ChakraLink>
                                                                        <ChakraLink as={NextLink} href="/contact">
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
