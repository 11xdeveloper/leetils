/**
 * 3020. Find the Maximum Number of Elements in Subset
 *
 * The largest subset of `nums` that can be arranged as `[x, x², x⁴, …,
 * x^(2^m), …, x⁴, x², x]`.
 *
 * Ones form any odd-length run on their own. For any other start `x`,
 * climb through squares while two copies are available, then end on a
 * single copy of the top, or drop back one step if the top is missing.
 *
 * @see https://leetcode.com/problems/find-the-maximum-number-of-elements-in-subset/
 * @difficulty Medium
 * @timeComplexity O(n log log max)
 * @spaceComplexity O(n)
 *
 * @example
 * findTheMaximumNumberOfElementsInSubset([5, 4, 1, 2, 2]); // 3
 */
export const findTheMaximumNumberOfElementsInSubset = (
	nums: readonly number[],
): number => {
	const counts = new Map<number, number>();
	for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);
	const ones = counts.get(1) ?? 0;
	let best = ones % 2 === 1 ? ones : Math.max(1, ones - 1);
	for (const start of counts.keys()) {
		if (start === 1) continue;
		let length = 0;
		let value = start;
		while ((counts.get(value) ?? 0) >= 2) {
			length += 2;
			value *= value;
		}
		best = Math.max(best, length + (counts.has(value) ? 1 : -1));
	}
	return best;
};
