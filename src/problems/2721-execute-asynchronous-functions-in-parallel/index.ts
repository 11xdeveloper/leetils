/**
 * 2721. Execute Asynchronous Functions in Parallel
 *
 * Start every asynchronous function at once and resolve with their results
 * in order once all have resolved, or reject with the first rejection, like
 * `Promise.all` but without using it.
 *
 * Store each result in its slot as it arrives and resolve when the count of
 * finished functions reaches the total.
 *
 * @see https://leetcode.com/problems/execute-asynchronous-functions-in-parallel/
 * @difficulty Medium
 * @timeComplexity O(n) on top of the functions
 * @spaceComplexity O(n)
 *
 * @example
 * await executeAsynchronousFunctionsInParallel([async () => 1, async () => 2]); // [1, 2]
 */
export function executeAsynchronousFunctionsInParallel<T>(
	functions: readonly (() => Promise<T>)[],
): Promise<T[]> {
	return new Promise((resolve, reject) => {
		const results = new Array<T>(functions.length);
		let remaining = functions.length;
		if (remaining === 0) resolve(results);
		functions.forEach((fn, i) => {
			fn().then((value) => {
				results[i] = value;
				if (--remaining === 0) resolve(results);
			}, reject);
		});
	});
}
