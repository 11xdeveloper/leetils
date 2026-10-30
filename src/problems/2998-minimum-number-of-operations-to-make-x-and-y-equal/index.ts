/**
 * 2998. Minimum Number of Operations to Make X and Y Equal
 *
 * Each operation divides `x` by 11 or by 5 when it's divisible, or adds
 * or subtracts 1. Returns the fewest operations to turn `x` into `y`.
 *
 * Breadth-first search. Going above `x + 11` never helps, since the
 * nearest multiple of 11 below that is just as reachable.
 *
 * @see https://leetcode.com/problems/minimum-number-of-operations-to-make-x-and-y-equal/
 * @difficulty Medium
 * @timeComplexity O(x)
 * @spaceComplexity O(x)
 *
 * @example
 * minimumNumberOfOperationsToMakeXAndYEqual(26, 1); // 3
 */
export const minimumNumberOfOperationsToMakeXAndYEqual = (
	x: number,
	y: number,
): number => {
	if (x <= y) return y - x;
	const limit = x + 11;
	const distance = new Int32Array(limit + 1).fill(-1);
	distance[x] = 0;
	const queue = [x];
	for (let head = 0; head < queue.length; head++) {
		const value = queue[head] ?? 0;
		const steps = (distance[value] ?? 0) + 1;
		if (value === y) return steps - 1;
		const next = [value - 1, value + 1];
		if (value % 11 === 0) next.push(value / 11);
		if (value % 5 === 0) next.push(value / 5);
		for (const other of next)
			if (other >= 0 && other <= limit && distance[other] === -1) {
				distance[other] = steps;
				queue.push(other);
			}
	}
	return x - y;
};
