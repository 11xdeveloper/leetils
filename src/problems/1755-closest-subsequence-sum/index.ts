/**
 * 1755. Closest Subsequence Sum
 *
 * Returns the smallest `|sum − goal|` over subsequences of `nums` (at most
 * 40 elements).
 *
 * Meet in the middle: list the subset sums of each half, sort one list,
 * and for each sum in the other binary-search the partner closest to the
 * rest of the goal.
 *
 * @see https://leetcode.com/problems/closest-subsequence-sum/
 * @difficulty Hard
 * @timeComplexity O(2^(n/2) · n)
 * @spaceComplexity O(2^(n/2))
 *
 * @example
 * closestSubsequenceSum([7, -9, 15, -2], -5); // 1
 */
export const closestSubsequenceSum = (
	nums: readonly number[],
	goal: number,
): number => {
	const sums = (part: readonly number[]) => {
		let result = [0];
		for (const num of part)
			result = [...result, ...result.map((sum) => sum + num)];
		return result;
	};
	const half = nums.length >> 1;
	const left = sums(nums.slice(0, half));
	const right = sums(nums.slice(half)).sort((a, b) => a - b);
	let best = Math.abs(goal);
	for (const sum of left) {
		const wanted = goal - sum;
		let [low, high] = [0, right.length];
		while (low < high) {
			const mid = (low + high) >>> 1;
			if ((right[mid] ?? 0) < wanted) low = mid + 1;
			else high = mid;
		}
		for (const index of [low - 1, low]) {
			const partner = right[index];
			if (partner !== undefined)
				best = Math.min(best, Math.abs(wanted - partner));
		}
		if (best === 0) return 0;
	}
	return best;
};
