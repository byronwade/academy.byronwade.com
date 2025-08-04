"use client";
import { useEffect, useState } from 'react';
import { Box, Spinner } from '@chakra-ui/react';
import CourseContent from '@/components/CourseContent';
import type { Course } from '@/data/courses';

export default function CoursePage({ params }: { params: { id: string } }) {
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await fetch(`/api/courses/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setCourse(data);
      }
    };
    fetchCourse();
  }, [params.id]);

  if (!course) {
    return (
      <Box p={8} maxW="3xl" mx="auto" textAlign="center">
        <Spinner />
      </Box>
    );
  }

  return (
    <Box p={8} maxW="3xl" mx="auto">
      <CourseContent course={course} />
    </Box>
  );
}
