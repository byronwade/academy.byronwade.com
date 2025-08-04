import NextLink from 'next/link';
import { Box, Button, Heading, Text, Stack } from '@chakra-ui/react';

export default function Home() {
  return (
    <Box p={8} textAlign="center">
      <Stack spacing={4} align="center">
        <Heading>Contractor Training Academy</Heading>
        <Text maxW="2xl">
          Upgrade your skills with interactive courses designed for licensed
          contractors. Earn continuing education credits and stay up to date
          with the latest codes and safety practices.
        </Text>
        <Button as={NextLink} href="/courses" colorScheme="blue">
          Browse Courses
        </Button>
      </Stack>
    </Box>
  );
}
