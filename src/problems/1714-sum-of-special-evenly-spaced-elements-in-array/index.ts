const MOD = 1_000_000_007;

/**
 * 1714. Sum Of Special Evenly-Spaced Elements In Array
 *
 * For each query `[x, y]`, returns the sum of `nums[j]` over `j ≥ x` with
 * `j − x` divisible by `y`, modulo 10^9 + 7.
 *
 * Square-root decomposition. A large step touches at most √n elements, so
 * sum directly. Queries with the same small step share one suffix-sum
 * array (`suffix[i] = nums[i] + suffix[i + y]`), built once per step.
 *
 * @see https://leetcode.com/problems/sum-of-special-evenly-spaced-elements-in-array/
 * @difficulty Hard
 * @timeComplexity O((n + q) · √n)
 * @spaceComplexity O(n + q)
 *
 * @example
 * sumOfSpecialEvenlySpacedElementsInArray([0, 1, 2, 3, 4, 5, 6, 7], [[0, 3], [5, 1], [4, 2]]); // [9, 18, 10]
 */
export const sumOfSpecialEvenlySpacedElementsInArray = (
	nums: readonly number[],
	queries: readonly (readonly number[])[],
): number[] => {
	const n = nums.length;
	const threshold = Math.ceil(Math.sqrt(n));
	const answer = new Array<number>(queries.length).fill(0);
	const byStep = new Map<number, number[]>();
	for (const [i, [x = 0, y = 1]] of queries.entries()) {
		if (y > threshold) {
			let sum = 0;
			for (let j = x; j < n; j += y) sum = (sum + (nums[j] ?? 0)) % MOD;
			answer[i] = sum;
		} else {
			const group = byStep.get(y) ?? [];
			group.push(i);
			byStep.set(y, group);
		}
	}
	const suffix = new Array<number>(n).fill(0);
	for (const [y, group] of byStep) {
		for (let i = n - 1; i >= 0; i--)
			suffix[i] = ((nums[i] ?? 0) + (suffix[i + y] ?? 0)) % MOD;
		for (const i of group) answer[i] = suffix[queries[i]?.[0] ?? 0] ?? 0;
	}
	return answer;
};
