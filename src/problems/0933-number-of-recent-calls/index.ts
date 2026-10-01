/**
 * 933. Number of Recent Calls
 *
 * `ping(t)` records a request at time `t` (increasing) and returns how many
 * requests happened in the last 3000 milliseconds, `[t - 3000, t]`.
 *
 * Keeps the recent times in a queue, dropping those too old from the
 * front.
 *
 * @see https://leetcode.com/problems/number-of-recent-calls/
 * @difficulty Easy
 * @timeComplexity O(1) amortised per ping
 * @spaceComplexity O(3000)
 *
 * @example
 * const counter = new NumberOfRecentCalls();
 * [1, 100, 3001, 3002].map((t) => counter.ping(t)); // [1, 2, 3, 3]
 */
export class NumberOfRecentCalls {
	readonly #times: number[] = [];
	#head = 0;

	ping(t: number): number {
		this.#times.push(t);
		while ((this.#times[this.#head] ?? t) < t - 3000) this.#head++;
		return this.#times.length - this.#head;
	}
}
