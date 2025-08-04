"use client";
import "./globals.css";
import NextLink from "next/link";
import {
  ChakraProvider,
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  VStack,
  Link as ChakraLink,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { RecoilRoot } from "recoil";
import theme from "@/theme";

export default function RootLayout({
        children,
}: {
        children: React.ReactNode;
}) {
        const { isOpen, onOpen, onClose } = useDisclosure();
        const links = [
                { href: "/", label: "Home" },
                { href: "/courses", label: "Courses" },
                { href: "/dashboard", label: "Dashboard" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
        ];

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
                                                                <IconButton
                                                                        aria-label="Open menu"
                                                                        icon={<HamburgerIcon />}
                                                                        variant="ghost"
                                                                        color="white"
                                                                        display={{ base: "flex", md: "none" }}
                                                                        onClick={onOpen}
                                                                />
                                                                <HStack
                                                                        as="nav"
                                                                        spacing={6}
                                                                        color="white"
                                                                        display={{ base: "none", md: "flex" }}
                                                                >
                                                                        {links.map((link) => (
                                                                                <ChakraLink
                                                                                        key={link.href}
                                                                                        as={NextLink}
                                                                                        href={link.href}
                                                                                        _hover={{ color: "gray.400" }}
                                                                                >
                                                                                        {link.label}
                                                                                </ChakraLink>
                                                                        ))}
                                                                </HStack>
                                                        </Flex>
                                                        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                                                                <DrawerOverlay />
                                                                <DrawerContent bg="black">
                                                                        <DrawerCloseButton color="white" />
                                                                        <DrawerBody>
                                                                                <VStack align="start" spacing={4} mt={10}>
                                                                                        {links.map((link) => (
                                                                                                <ChakraLink
                                                                                                        key={link.href}
                                                                                                        as={NextLink}
                                                                                                        href={link.href}
                                                                                                        onClick={onClose}
                                                                                                        color="white"
                                                                                                        _hover={{ color: "gray.400" }}
                                                                                                >
                                                                                                        {link.label}
                                                                                                </ChakraLink>
                                                                                        ))}
                                                                                </VStack>
                                                                        </DrawerBody>
                                                                </DrawerContent>
                                                        </Drawer>
                                                </Box>
                                                {children}
                                        </ChakraProvider>
                                </RecoilRoot>
                        </body>
                </html>
        );
}
