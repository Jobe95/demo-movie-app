export interface Show {
  id: number;
  name: string;
  genres: string[];
  premiered: string;
  rating: Rating;
  image: Image | null;
  summary: string;
}

export interface Rating {
  average: number | null;
}

export interface Image {
  medium: string;
  original: string;
}
