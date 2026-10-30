/**
 * 2967. Minimum Cost to Make Array Equalindromic
 *
 * Changing an element to `y` costs `|nums[i] - y|`. Returns the cheapest
 * way to make every element the same palindromic number below 10⁹.
 *
 * The cost is convex with its minimum at the median, so the best
 * palindrome is the nearest one on either side of it. Find those by
 * mirroring the median's first half, nudged up and down by one.
 *
 * @see https://leetcode.com/problems/minimum-cost-to-make-array-equalindromic/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumCostToMakeArrayEqualindromic([10, 12, 13, 14, 15]); // 11
 */
export const minimumCostToMakeArrayEqualindromic = (
	nums: readonly number[],
): number => {
	const sorted = nums.toSorted((a, b) => a - b);
	const median = sorted[(sorted.length - 1) >> 1] ?? 0;

	const digits = String(median);
	const halfLength = Math.ceil(digits.length / 2);
	const half = Number(digits.slice(0, halfLength));
	const candidates = [10 ** (digits.length - 1) - 1, 10 ** digits.length + 1];
	for (const h of [half - 1, half, half + 1]) {
		if (h <= 0) continue;
		const front = String(h);
		const mirrored = [...front].reverse().join("");
		candidates.push(
			Number(front + mirrored.slice(digits.length % 2 === 1 ? 1 : 0)),
		);
	}
	const valid = candidates.filter((p) => p >= 1 && p < 1_000_000_000);
	const below = Math.max(...valid.filter((p) => p <= median));
	const above = Math.min(...valid.filter((p) => p >= median));
	const cost = (y: number): number =>
		sorted.reduce((sum, x) => sum + Math.abs(x - y), 0);
	return Math.min(cost(below), cost(above));
};
