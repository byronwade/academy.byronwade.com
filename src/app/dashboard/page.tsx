import { Box, Heading, Progress, Text, VStack } from '@chakra-ui/react';
import { courses } from '@/data/courses';

const userProgress: Record<string, number> = {
  'osha-safety': 40,
  'electrical-code': 20,
  'plumbing-basics': 0,
};

export default function DashboardPage() {
  return (
    <Box p={8} maxW="4xl" mx="auto">
      <Heading mb={6}>My Dashboard</Heading>
      <VStack spacing={6} align="stretch">
        {courses.map((course) => (
          <Box key={course.id}>
            <Text fontWeight="bold" mb={2}>
              {course.title}
            </Text>
            <Progress value={userProgress[course.id] ?? 0} />
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
