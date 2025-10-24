import { CourseDetails } from "@/components/organisms/Course/CourseDetails/courseDetails";

export default function CourseDetailsPage({ params }: { params: { id: string } }) {
  
  return (
    <CourseDetails courseId={params.id} />
  );
}