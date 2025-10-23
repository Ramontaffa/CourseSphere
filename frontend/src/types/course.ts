export type Course = {
  id: string;
  name: string;
  description: string;
  start_date: Date;
  end_date: Date;
  creator_id: string;
  instructors: string[];
};