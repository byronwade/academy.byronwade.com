"use client";
import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Heading,
  Text,
  VStack,
  Link as ChakraLink,
} from '@chakra-ui/react';
import type { Course } from '@/data/courses';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await fetch('/api/courses');
      if (res.ok) {
        const data = await res.json();
        setCourses(data);
      }
    };
    fetchCourses();
  }, []);

  return (
    <Box p={8} maxW="4xl" mx="auto">
      <Heading mb={6}>Courses</Heading>
      <VStack spacing={6} align="stretch">
        {courses.map((course) => (
          <Box key={course.id} p={4} borderWidth="1px" rounded="md" bg="gray.900">
            <ChakraLink
              as={NextLink}
              href={`/courses/${course.id}`}
              fontWeight="bold"
              color="teal.300"
            >
              {course.title}
            </ChakraLink>
            <Text>{course.description}</Text>
            <Text fontSize="sm" color="gray.400">
              Trade: {course.trade}
            </Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
