/**
 * 359. Logger Rate Limiter
 *
 * Receives messages with timestamps in chronological order and decides
 * whether to print each: a message is printed unless the same message was
 * printed less than 10 seconds earlier.
 *
 * Remembers, for each message, the earliest time it may be printed again.
 *
 * @see https://leetcode.com/problems/logger-rate-limiter/
 * @difficulty Easy
 * @timeComplexity O(1) per message
 * @spaceComplexity O(m) where m is the number of distinct messages
 *
 * @example
 * const logger = new LoggerRateLimiter();
 * logger.shouldPrintMessage(1, "foo"); // true
 * logger.shouldPrintMessage(3, "foo"); // false
 * logger.shouldPrintMessage(11, "foo"); // true
 */
export class LoggerRateLimiter {
	readonly #nextAllowed = new Map<string, number>();

	shouldPrintMessage(timestamp: number, message: string): boolean {
		if (timestamp < (this.#nextAllowed.get(message) ?? 0)) return false;
		this.#nextAllowed.set(message, timestamp + 10);
		return true;
	}
}
