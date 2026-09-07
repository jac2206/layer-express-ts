export const PostErrors = {
  POST_NOT_FOUND: {
    code: "POST_NOT_FOUND",
    message: "Post not found",
    statusCode: 404,
  },
  POST_TITLE_ALREADY_EXISTS: {
    code: "POST_TITLE_ALREADY_EXISTS",
    message: "Post title already exists",
    statusCode: 409,
  },
  POST_CONTENT_TOO_SHORT: {
    code: "POST_CONTENT_TOO_SHORT",
    message: "Post content is too short",
    statusCode: 400,
  },
};
