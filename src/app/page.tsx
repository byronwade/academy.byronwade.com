import NextLink from 'next/link';
import { Box, Button, Heading, Text, Stack } from '@chakra-ui/react';

export default function Home() {
  return (
    <Box py={24} textAlign="center">
      <Stack spacing={6} align="center">
        <Heading size="2xl">Contractor Training Academy</Heading>
        <Text maxW="2xl">
          Interactive learning for plumbing, HVAC, and electrical professionals
          with state‑specific code references.
        </Text>
        <Button as={NextLink} href="/courses" colorScheme="teal">
          Browse Courses
        </Button>
      </Stack>
    </Box>
  );
}
