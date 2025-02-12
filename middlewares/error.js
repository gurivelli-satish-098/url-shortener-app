const httpStatus = require("http-status");
const ApiResponse = require("./response");

const isTrustedError = (error) => {
  return error instanceof BaseError && error.isOperational;
};

const errorMiddleware = (err, req, res, next) => {
  const errorContext = [];
  const request = req || {};
  errorContext.push(`method: ${request.method}`);
  errorContext.push(`url: ${request.originalUrl}`);
  errorContext.push(`body: ${JSON.stringify(request.body)}`);
  errorContext.push(`status: ${(err || {}).status}`);
  errorContext.push(`user: ${(request.user || {}).id}`);

  const errContextMessage = errorContext.join(" | ");

  if (errContextMessage && !errContextMessage.includes("/auth")) {
    // console.log(`[error context:] - ${errContextMessage}`);
  }

  if (!isTrustedError(err)) {
    // Forward to uncaughtException global error handler
    next(err);
    return;
  }

  const errorResponse = new ApiResponse({
    success: err.isOverrideSuccess || false,
    data: {
      process: err.isPublic || false,
    },
    message: err.message ? err.message : "Something went wrong.",
    status: err.status || httpStatus.INTERNAL_SERVER_ERROR,
    errors: err.data || [],
  });

  res.status(err.status).json(errorResponse);
};

module.exports = errorMiddleware;
