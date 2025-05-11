interface PlaywrightError extends Error {
  code: string;
  selector?: string;
  value?: string;
  action?: string;
}

export class PWErrorHandler {
  static createError(message: string, code: string, details?: { selector?: string; value?: string; action?: string }): PlaywrightError {
    const error = new Error(message) as PlaywrightError;
    error.code = code;
    if (details) {
      error.selector = details.selector;
      error.value = details.value;
      error.action = details.action;
    }
    return error;
  }
}