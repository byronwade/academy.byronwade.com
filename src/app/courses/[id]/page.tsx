import NextLink from 'next/link';
import { Box, Heading, Text, Link as ChakraLink, VStack } from '@chakra-ui/react';
import type { Course } from '@/data/courses';

async function getCourse(id: string): Promise<Course> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/courses/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch course');
  }
  return res.json();
}

export default async function CoursePage({
  params,
}: {
  params: { id: string };
}) {
  const course = await getCourse(params.id);
  return (
    <Box p={8} maxW="3xl" mx="auto">
      <Heading mb={4}>{course.title}</Heading>
      <Text fontWeight="bold" mb={2}>
        Cost: ${course.price.toFixed(2)}
      </Text>
      <Text mb={6}>{course.details}</Text>
      <Heading size="md" mb={4}>
        Chapters
      </Heading>
      <VStack spacing={4} align="stretch" mb={6}>
        {course.chapters.map((ch, idx) => (
          <Box key={idx} p={4} borderWidth="1px" rounded="md">
            <Text fontWeight="bold">{ch.title}</Text>
            <Text>{ch.description}</Text>
          </Box>
        ))}
      </VStack>
      <ChakraLink as={NextLink} href="/courses" color="blue.500">
        Back to courses
      </ChakraLink>
    </Box>
  );
}
