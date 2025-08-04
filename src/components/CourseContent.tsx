"use client";
import { useState } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Heading,
  Text,
  Select,
  Link as ChakraLink,
} from '@chakra-ui/react';
import type { Course } from '@/data/courses';

export default function CourseContent({ course }: { course: Course }) {
  const [state, setState] = useState('');
  const info = state ? course.states[state] : undefined;

  return (
    <Box>
      <Heading mb={4}>{course.title}</Heading>
      <Text mb={6}>{course.description}</Text>
      <Select
        placeholder="Select your state"
        mb={4}
        value={state}
        onChange={(e) => setState(e.target.value)}
      >
        {Object.keys(course.states).map((abbr) => (
          <option key={abbr} value={abbr}>
            {abbr}
          </option>
        ))}
      </Select>
      {info && (
        <Box p={4} borderWidth="1px" rounded="md" bg="gray.900" mb={4}>
          <Text fontWeight="bold">{info.codeSection}</Text>
          <Text>{info.guidance}</Text>
        </Box>
      )}
      <ChakraLink as={NextLink} href="/courses" color="teal.300">
        Back to courses
      </ChakraLink>
    </Box>
  );
}
