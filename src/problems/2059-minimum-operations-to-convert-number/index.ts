/**
 * 2059. Minimum Operations to Convert Number
 *
 * Starting from `start`, an operation adds, subtracts or XORs any of the
 * distinct `nums`, but can only continue from values in `[0, 1000]`.
 * Returns the fewest operations to reach `goal`, or -1.
 *
 * Breadth-first search over the values 0 to 1000, stopping as soon as an
 * operation produces `goal` (which may lie outside that range).
 *
 * @see https://leetcode.com/problems/minimum-operations-to-convert-number/
 * @difficulty Medium
 * @timeComplexity O(1000 · n)
 * @spaceComplexity O(1000)
 *
 * @example
 * minimumOperationsToConvertNumber([2, 4, 12], 2, 12); // 2
 */
export const minimumOperationsToConvertNumber = (
	nums: readonly number[],
	start: number,
	goal: number,
): number => {
	const steps = new Array<number>(1001).fill(-1);
	steps[start] = 0;
	const queue = [start];
	for (let head = 0; head < queue.length; head++) {
		const x = queue[head] ?? 0;
		const taken = (steps[x] ?? 0) + 1;
		for (const num of nums) {
			for (const next of [x + num, x - num, x ^ num]) {
				if (next === goal) return taken;
				if (next < 0 || next > 1000 || steps[next] !== -1) continue;
				steps[next] = taken;
				queue.push(next);
			}
		}
	}
	return -1;
};
