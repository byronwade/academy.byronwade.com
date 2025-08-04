'use client';
import NextLink from 'next/link';
import { Box, Heading, Text, VStack, Link as ChakraLink } from '@chakra-ui/react';
import type { Course } from '@/data/courses';

export default function CoursesList({ courses }: { courses: Course[] }) {
  return (
    <Box p={8} maxW="4xl" mx="auto">
      <Heading mb={6}>Courses</Heading>
      <VStack spacing={6} align="stretch">
        {courses.map((course) => (
          <Box key={course.id} p={4} borderWidth="1px" rounded="md">
            <ChakraLink as={NextLink} href={`/courses/${course.id}`} fontWeight="bold">
              {course.title}
            </ChakraLink>
            <Text>{course.description}</Text>
            <Text fontWeight="bold" mt={2}>
              ${course.price.toFixed(2)}
            </Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
