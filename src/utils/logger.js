export const logger = {
  info: (msg, meta = {}) => {
    console.log(`ℹ️ INFO: ${msg}`, meta);
  },

  warn: (msg, meta = {}) => {
    console.warn(`⚠️ WARN: ${msg}`, meta);
  },

  error: (msg, meta = {}) => {
    console.error(`🔥 ERROR: ${msg}`, meta);
  },
};
