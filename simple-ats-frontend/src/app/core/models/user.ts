export interface User {
  id: number;
  name: string;
  email: string;
  curriculum?: string;
}

export interface Curriculum {
  curriculum: string;
}
