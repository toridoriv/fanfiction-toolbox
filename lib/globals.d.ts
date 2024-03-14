declare global {
  namespace FanfictionToolbox {
    /**
     * Represents a logger with at least the following methods: `debug`, `info`, `warn`
     * and `error`.
     */
    type Logger = Pick<Console, "debug" | "info" | "warn" | "error">;
  }
}

export {};
