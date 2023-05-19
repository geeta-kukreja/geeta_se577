export interface RepoApiInterface {
  'id': number;
  'name': string;
  'html_url': string;
  // last_update: string;
  'description': unknown;
  // courseId: string
}

export interface ApiErrorInterface {
  isError: boolean;
  errorCode: number;
  errorMessage: string;
}
