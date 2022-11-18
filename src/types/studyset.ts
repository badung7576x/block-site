import { Moment } from 'moment';

export type Flashcard = {
  id: string;
  order: number;
  front_side: string;
  back_side: string;
  level: number;
  next_learn: Moment;
  created_at?: Moment;
  updated_at?: Moment;
};

export type Studyset = {
  id?: number;
  name?: string;
  description?: string;
  flashcards: Flashcard[];
};
