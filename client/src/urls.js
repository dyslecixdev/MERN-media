const BASE_URL = 'http://localhost:5000';

export const AUTH_URL = BASE_URL + '/api/auth';
export const AUTH_REGISTER_URL = AUTH_URL + '/register';
export const AUTH_LOGIN_URL = AUTH_URL + '/login';

export const COMMENT_URL = BASE_URL + '/api/comments';
export const GET_COMMENT_URL = postId => COMMENT_URL + `?postId=${postId}`;

export const POST_URL = BASE_URL + '/api/posts';

export const FILE_URL = BASE_URL + '/api/upload';
