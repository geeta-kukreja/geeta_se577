export interface RepoApiInterface {
  id: number;
  repo: string;
  url: string;
  last_update: string;
  description: string;
  // courseId: string
}

export interface ApiErrorInterface {
  isError: boolean;
  errorCode: number;
  errorMessage: string;
}
