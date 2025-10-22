export type Course = {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  creator_id: number;
  instructors: number[];
};