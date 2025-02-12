const { DatabaseError, InternalError, BaseError } = require("../utils/error");

class UserService {
  constructor(sql) {
    this.sql = sql;
  }

  upsertUser = async ({ email, isEmailVerfied = true }) => {
    try {
      if (!this.sql.User) throw new InternalError("User model is not found");
      return this.sql.User.create({ email, isEmailVerfied }, { email });
    } catch (error) {
      if (error instanceof BaseError) throw error;
      throw new DatabaseError(`Error in upsertUser - ${error.message}`, error);
    }
  };
}

module.exports = UserService;
