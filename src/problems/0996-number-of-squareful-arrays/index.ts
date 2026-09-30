/**
 * 996. Number of Squareful Arrays
 *
 * Counts the distinct permutations of `nums` in which every pair of
 * neighbours sums to a perfect square.
 *
 * Backtracking over distinct values with their remaining counts, so equal
 * values aren't permuted among themselves. Each step only extends with a
 * value forming a square sum with the last one.
 *
 * @see https://leetcode.com/problems/number-of-squareful-arrays/
 * @difficulty Hard
 * @timeComplexity O(n!) in the worst case
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfSquarefulArrays([1, 17, 8]); // 2: [1, 8, 17] and [17, 8, 1]
 */
export const numberOfSquarefulArrays = (nums: readonly number[]): number => {
	const counts = new Map<number, number>();
	for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);
	const values = [...counts.keys()];
	const isSquare = (x: number): boolean => Number.isInteger(Math.sqrt(x));

	const count = (last: number | undefined, remaining: number): number => {
		if (remaining === 0) return 1;
		let total = 0;
		for (const value of values) {
			const left = counts.get(value) ?? 0;
			if (left === 0 || (last !== undefined && !isSquare(last + value)))
				continue;
			counts.set(value, left - 1);
			total += count(value, remaining - 1);
			counts.set(value, left);
		}
		return total;
	};
	return count(undefined, nums.length);
};
