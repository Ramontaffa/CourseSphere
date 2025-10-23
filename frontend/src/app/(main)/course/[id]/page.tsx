import { CourseDetails } from "@organisms/CourseDetails/courseDetails";

export default function CourseDetailsPage({ params }: { params: { id: string } }) {
  
  return (
    <CourseDetails courseId={params.id} />
  );
}