/**
 * 2835. Minimum Operations to Form Subsequence With Target Sum
 *
 * `nums` holds powers of two; an operation splits one greater than 1
 * into two halves. Returns the fewest operations after which some
 * subsequence sums to `target`, or -1.
 *
 * Go through the bits of `target` from the bottom. A needed bit uses a
 * piece of that size if there is one; otherwise split the smallest larger
 * piece down to it, one operation per halving. Spare small pieces pair up
 * into the next size.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-form-subsequence-with-target-sum/
 * @difficulty Hard
 * @timeComplexity O(n + 31²)
 * @spaceComplexity O(31)
 *
 * @example
 * minimumOperationsToFormSubsequenceWithTargetSum([1, 32, 1, 2], 12); // 2
 */
export const minimumOperationsToFormSubsequenceWithTargetSum = (
	nums: readonly number[],
	target: number,
): number => {
	if (nums.reduce((sum, num) => sum + num, 0) < target) return -1;
	const pieces = Array.from({ length: 32 }, () => 0);
	for (const num of nums) {
		const bit = Math.log2(num);
		pieces[bit] = (pieces[bit] ?? 0) + 1;
	}
	let operations = 0;
	for (let bit = 0; bit < 31; bit++) {
		if ((target >> bit) & 1) {
			if ((pieces[bit] ?? 0) > 0) pieces[bit] = (pieces[bit] ?? 0) - 1;
			else {
				let from = bit + 1;
				while ((pieces[from] ?? 0) === 0) from++;
				operations += from - bit;
				pieces[from] = (pieces[from] ?? 0) - 1;
				for (let b = bit; b < from; b++) pieces[b] = (pieces[b] ?? 0) + 1;
			}
		}
		pieces[bit + 1] =
			(pieces[bit + 1] ?? 0) + Math.floor((pieces[bit] ?? 0) / 2);
	}
	return operations;
};
