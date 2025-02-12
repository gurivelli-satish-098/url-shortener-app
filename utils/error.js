const HttpStatus = require("http-status");

/**
 * Response normalized error
 * @extends Error
 */
class BaseError extends Error {
  constructor(message, data, status, isOperational = true, isPublic, isOverrideSuccess = false) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.isPublic = isPublic;
    this.isOperational = isOperational;
    this.data = data;
    this.isOverrideSuccess = isOverrideSuccess;

    Error.captureStackTrace(this);
  }
}

/**
 * Class representing unauthorized error.
 * @extends BaseError
 */
class AuthorizationError extends BaseError {
  /**
   * Creates a ValidationError error.
   * @param {string} message - Error message.
   * @param data - Error data
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor(message, data = null, status = HttpStatus.FORBIDDEN, isPublic = true) {
    super(message, data, status, true, isPublic);
  }
}

/**
 * Class representing unauthorized error.
 * @extends BaseError
 */
class AuthenticationError extends BaseError {
  /**
   * Creates a ValidationError error.
   * @param {string} message - Error message.
   * @param data - Error data
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor(message, data = null, status = HttpStatus.UNAUTHORIZED, isPublic = true) {
    super(message, data, status, true, isPublic);
  }
}

/**
 * Class representing a service level error.
 * @extends BaseError
 */
class InternalError extends BaseError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param data - Error data
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   * @param {boolean} isOverrideSuccess - Whether to override request success.
   */
  constructor(
    message,
    data = null,
    status = HttpStatus.INTERNAL_SERVER_ERROR,
    isPublic = false,
    isOverrideSuccess = false
  ) {
    super(message, data, status, true, isPublic, isOverrideSuccess);
  }
}

/**
 * Class representing a DB level error.
 * @extends BaseError
 */
class DatabaseError extends BaseError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param data - Error data
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   * @param {boolean} isOverrideSuccess - Whether to override request success.
   */
  constructor(
    message,
    data = null,
    status = HttpStatus.INTERNAL_SERVER_ERROR,
    isPublic = false,
    isOverrideSuccess = false
  ) {
    super(message, data, status, true, isPublic, isOverrideSuccess);
  }
}

/**
 * Class representing a validation error.
 * @extends BaseError
 */
class ValidationError extends BaseError {
  /**
   * Creates a ValidationError error.
   * @param {string} message - Error message.
   * @param data - Error data
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor(message, data = null, status = HttpStatus.BAD_REQUEST, isPublic = true) {
    super(message, data, status, true, isPublic);
  }
}

module.exports = {
  BaseError,
  AuthorizationError,
  AuthenticationError,
  InternalError,
  DatabaseError,
  ValidationError,
};
