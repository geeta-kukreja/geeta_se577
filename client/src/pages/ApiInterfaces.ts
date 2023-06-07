export interface RepoApiInterface {
  'id': number;
  'name': string;
  'html_url': string;
  'updated_at': string;
  'description': unknown;
  // 'stargazers': string[]
  // courseId: string
}

export interface GistApiInterface {
  'id': number;
  'html_url': string;
  'files':  string, 
  'type': string,
  'updated_at': string;
  'description': unknown;
  'buttonText': boolean;
  // courseId: string
}

export interface FavouritesApiInterface {
  'name':  string, 
  'url': string;
  // courseId: string
}



export interface ApiErrorInterface {
  isError: boolean;
  errorCode: number;
  errorMessage: string;
}
