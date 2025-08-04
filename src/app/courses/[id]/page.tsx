import NextLink from 'next/link';
import { Box, Heading, Text, Link as ChakraLink } from '@chakra-ui/react';

export type Course = {
  id: string;
  title: string;
  description: string;
};

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
      <Text mb={6}>{course.description}</Text>
      <ChakraLink as={NextLink} href="/courses" color="blue.500">
        Back to courses
      </ChakraLink>
    </Box>
  );
}
