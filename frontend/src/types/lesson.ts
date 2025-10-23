export type Lesson = {
  id: number;
  course_id: string;
  creator_id: string;
  title: string;
  content?: string;
  status: 'draft' | 'published' | 'archived';
  publish_date: Date;
  video_url: string;
  created_at: Date;
  updated_at: Date;
};