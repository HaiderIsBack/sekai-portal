
export type Seminar = {
  id: number;
  title: string;
  country: string;
  city: string;
  date: string;
  participants: number;
  category: string;
  event_type: string;
  flag: string;
  image_name: string | null;
  created_at: string;
}

export type SeminarInfo = {
  id: number;
  title: string;
  country: string;
  date: string;
  flag: string;
}