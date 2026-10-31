/**
 * 3676. Count Bowl Subarrays
 *
 * Counts subarrays of at least three distinct values whose two ends are
 * both larger than everything between them.
 *
 * Those are the pairs a monotonic stack meets: sweeping right, each value
 * pairs with every smaller value it pops and with the larger value left on
 * top. Keep the pairs that aren't neighbours.
 *
 * @see https://leetcode.com/problems/count-bowl-subarrays/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * countBowlSubarrays([5, 1, 2, 3, 4]); // 3
 */
export const countBowlSubarrays = (nums: readonly number[]): number => {
	const stack: number[] = [];
	let count = 0;
	nums.forEach((num, r) => {
		while (stack.length > 0 && (nums[stack.at(-1) ?? 0] ?? 0) < num)
			if (r - (stack.pop() ?? r) >= 2) count++;
		if (stack.length > 0 && r - (stack.at(-1) ?? r) >= 2) count++;
		stack.push(r);
	});
	return count;
};
