export interface RepoApiInterface {
  'id': number;
  'name': string;
  'html_url': string;
  'updated_at': string;
  'description': unknown;
  // courseId: string
}

export interface CommitsApiInterface {
  'message': string;
  // courseId: string
}


export interface ApiErrorInterface {
  isError: boolean;
  errorCode: number;
  errorMessage: string;
}
