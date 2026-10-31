/**
 * 2170. Minimum Operations to Make the Array Alternating
 *
 * An array is alternating when `nums[i - 2] === nums[i]` and
 * `nums[i - 1] !== nums[i]`. An operation changes one element. Returns the
 * fewest operations to make `nums` alternating.
 *
 * Keep the most common value at even indices and at odd ones; if they
 * clash, the better of using either side's runner-up.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-make-the-array-alternating/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumOperationsToMakeTheArrayAlternating([3, 1, 3, 2, 4, 3]); // 3
 */
export const minimumOperationsToMakeTheArrayAlternating = (
	nums: readonly number[],
): number => {
	/** The two most common values at indices of the given parity. */
	const topTwo = (parity: number): [value: number, count: number][] => {
		const counts = new Map<number, number>();
		for (let i = parity; i < nums.length; i += 2) {
			const num = nums[i] ?? 0;
			counts.set(num, (counts.get(num) ?? 0) + 1);
		}
		return [...counts, [-1, 0] as [number, number]]
			.sort((a, b) => b[1] - a[1])
			.slice(0, 2);
	};
	const evens = topTwo(0);
	const odds = topTwo(1);
	let kept = 0;
	for (const [even, evenCount] of evens) {
		for (const [odd, oddCount] of odds) {
			if (even !== odd || even === -1)
				kept = Math.max(kept, evenCount + oddCount);
		}
	}
	return nums.length - kept;
};
