export const AuthorErrors = {
  AUTHOR_NOT_FOUND: {
    code: "AUTHOR_NOT_FOUND",
    message: "Author not found",
    statusCode: 404,
  },
  AUTHOR_INVALID_DATA: {
    code: "AUTHOR_INVALID_DATA",
    message: "Invalid author data",
    statusCode: 422,
  },
  AUTHOR_EMAIL_ALREADY_EXISTS: {
    code: "AUTHOR_EMAIL_ALREADY_EXISTS",
    message: "Author email already exists",
    statusCode: 409,
  },
};
