import { describe, it, expect } from 'vitest';
import { courses } from './courses';

describe('courses data', () => {
  it('contains sample courses', () => {
    expect(courses.length).toBeGreaterThan(0);
  });
});
