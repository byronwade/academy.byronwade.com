import { Box, Heading, Text, Link } from '@chakra-ui/react';

export default function ContactPage() {
  return (
    <Box p={8} maxW="3xl" mx="auto">
      <Heading mb={4}>Contact Us</Heading>
      <Text mb={2}>
        Have questions about courses or enterprise plans? Reach out and we will
        get back to you shortly.
      </Text>
      <Text>
        Email us at{' '}
        <Link href="mailto:support@contractoracademy.test" color="blue.500">
          support@contractoracademy.test
        </Link>
      </Text>
    </Box>
  );
}
