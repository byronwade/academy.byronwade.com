import { Box, Heading, Text } from '@chakra-ui/react';

export default function AboutPage() {
  return (
    <Box p={8} maxW="3xl" mx="auto">
      <Heading mb={4}>About Contractor Academy</Heading>
      <Text mb={2}>
        Contractor Academy provides interactive continuing education for
        tradespeople. Our mission is to make it simple for contractors to stay
        licensed and sharp through hands-on courses and up-to-date code
        reviews.
      </Text>
      <Text>
        Lessons are authored by industry experts and are broken down into
        digestible modules you can tackle at your own pace.
      </Text>
    </Box>
  );
}
