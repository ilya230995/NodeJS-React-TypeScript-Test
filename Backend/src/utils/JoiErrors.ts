export const TEXT = {
  ERRORS: {
    requiredField: (requiredValue: string) =>
      `Field "${requiredValue}" is required`,

    userExists: "User already exist",
    userDoesntExists: "User not found",
    productExists: "Product already exist",
    productDoesntExists: "Product not found",
    somethingWentWrong: "Something went wrong",
    incorrectEmailFormat: "Wrong email format",
    incorrectPasswordFormat: "Incorrect password format",
  },
};
export const JOI_ERRORS = {
  "string.email": "Wrong email format",
  "any.required": "Field {{#label}} is required",
};
