type Settled<T> =
	| { status: "fulfilled"; value: T }
	| { status: "rejected"; reason: unknown };

/**
 * 2795. Parallel Execution of Promises for Individual Results Retrieval
 *
 * Start every asynchronous function at once and resolve, once they've all
 * settled, with each one's outcome in order: `{ status: "fulfilled", value
 * }` or `{ status: "rejected", reason }`. Like `Promise.allSettled`, but
 * without using it.
 *
 * Record each outcome in its slot and resolve when the last one arrives.
 *
 * @see https://leetcode.com/problems/parallel-execution-of-promises-for-individual-results-retrieval/
 * @difficulty Medium
 * @timeComplexity O(n) on top of the functions
 * @spaceComplexity O(n)
 *
 * @example
 * await parallelExecutionOfPromisesForIndividualResultsRetrieval([
 *   async () => 15,
 *   async () => {
 *     throw "Error";
 *   },
 * ]);
 * // [{ status: "fulfilled", value: 15 }, { status: "rejected", reason: "Error" }]
 */
export function parallelExecutionOfPromisesForIndividualResultsRetrieval<T>(
	functions: readonly (() => Promise<T>)[],
): Promise<Settled<T>[]> {
	return new Promise((resolve) => {
		const results = new Array<Settled<T>>(functions.length);
		let remaining = functions.length;
		if (remaining === 0) resolve(results);
		const settle = (i: number, outcome: Settled<T>): void => {
			results[i] = outcome;
			if (--remaining === 0) resolve(results);
		};
		functions.forEach((fn, i) => {
			fn().then(
				(value) => settle(i, { status: "fulfilled", value }),
				(reason: unknown) => settle(i, { status: "rejected", reason }),
			);
		});
	});
}
