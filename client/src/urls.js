const BASE_URL = 'http://localhost:5000';

export const AUTH_URL = BASE_URL + '/api/auth';
export const AUTH_REGISTER_URL = AUTH_URL + '/register';
export const AUTH_LOGIN_URL = AUTH_URL + '/login';
export const AUTH_LOGOUT_URL = AUTH_URL + '/logout';

export const COMMENT_URL = BASE_URL + '/api/comments/';
export const POST_COMMENT_URL = postId => COMMENT_URL + `post?postId=${postId}`;
export const USER_COMMENT_URL = userId => COMMENT_URL + `user?userId=${userId}`;

export const LIKE_URL = BASE_URL + '/api/likes';
export const POST_LIKE_URL = postId => LIKE_URL + `/post?postId=${postId}`;
export const USER_LIKE_URL = userId => LIKE_URL + `/user?userId=${userId}`;
export const DELETE_LIKE_URL = postId => LIKE_URL + `?postId=${postId}`;

export const POST_URL = BASE_URL + '/api/posts';
export const GET_POST_URL = userId => POST_URL + `?userId=${userId}`;
export const DELETE_POST_URL = postId => POST_URL + `/${postId}`;

export const RELATIONSHIP_URL = BASE_URL + '/api/relationships';
export const QUERY_RELATIONSHIP_URL = userId => RELATIONSHIP_URL + `?userId=${userId}`;

export const USER_URL = BASE_URL + '/api/users';
export const QUERY_USER_URL = userId => USER_URL + `/${userId}`;

export const FILE_URL = BASE_URL + '/api/upload';
