import { logger } from "../utils/logger.js";

export const errorHandler = (err, req, res, next) => {
  logger.error(err.message, {
    name: err.name,
    code: err.code,
    stack: err.stack,
  });

  // -------------------------------
  // 1. JSON parse error (body error)
  // -------------------------------
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      status: "error",
      message: "Invalid JSON format",
    });
  }

  // -------------------------------
  // 2. Zod validation error
  // -------------------------------
  if (err.name === "ZodError") {
    return res.status(422).json({
      status: "error",
      message: "Validation failed",
      issues: err.errors,
    });
  }

  // -------------------------------
  // 3. Prisma error handling
  // -------------------------------
  if (err.code?.startsWith("P")) {
    switch (err.code) {
      case "P2002":
        return res.status(409).json({
          status: "error",
          message: "Duplicate field: unique constraint failed",
          target: err.meta?.target,
        });

      case "P2025":
        return res.status(404).json({
          status: "error",
          message: "Record not found",
        });

      case "P2003":
        return res.status(400).json({
          status: "error",
          message: "Invalid relation or foreign key",
        });

      default:
        return res.status(500).json({
          status: "error",
          message: "Database error",
          detail: err.message,
        });
    }
  }

  // -------------------------------
  // 4. Error custom (buatan sendiri)
  // -------------------------------
  if (err.isCustomError) {
    return res.status(err.statusCode || 400).json({
      status: "error",
      message: err.message,
    });
  }

  // -------------------------------
  // 5. Default fallback
  // -------------------------------
  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
    detail: err.message,
  });
};
