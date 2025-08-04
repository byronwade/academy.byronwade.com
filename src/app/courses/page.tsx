import NextLink from 'next/link';
import {
  Box,
  Heading,
  Text,
  VStack,
  Link as ChakraLink,
} from '@chakra-ui/react';

export type Course = {
  id: string;
  title: string;
  description: string;
};

async function getCourses(): Promise<Course[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/courses`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch courses');
  }
  return res.json();
}

export default async function CoursesPage() {
  const courses = await getCourses();
  return (
    <Box p={8} maxW="4xl" mx="auto">
      <Heading mb={6}>Courses</Heading>
      <VStack spacing={6} align="stretch">
        {courses.map((course) => (
          <Box key={course.id} p={4} borderWidth="1px" rounded="md">
            <ChakraLink
              as={NextLink}
              href={`/courses/${course.id}`}
              fontWeight="bold"
            >
              {course.title}
            </ChakraLink>
            <Text>{course.description}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
