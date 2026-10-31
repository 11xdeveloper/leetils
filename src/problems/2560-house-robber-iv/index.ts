/**
 * 2560. House Robber IV
 *
 * A robber takes from at least `k` houses, never two adjacent ones. Their
 * capability is the most they take from any one house. Returns the
 * smallest capability possible.
 *
 * Binary search the capability; for each, greedily rob every affordable
 * house not next to the last one robbed and see if that reaches `k`.
 *
 * @see https://leetcode.com/problems/house-robber-iv/
 * @difficulty Medium
 * @timeComplexity O(n log m), where `m` is the largest amount
 * @spaceComplexity O(1)
 *
 * @example
 * houseRobberIV([2, 3, 5, 9], 2); // 5
 */
export const houseRobberIV = (nums: readonly number[], k: number): number => {
	const enough = (capability: number): boolean => {
		let robbed = 0;
		for (let i = 0; i < nums.length; i++)
			if ((nums[i] ?? 0) <= capability) {
				robbed++;
				i++;
			}
		return robbed >= k;
	};
	let low = Math.min(...nums);
	let high = Math.max(...nums);
	while (low < high) {
		const mid = Math.floor((low + high) / 2);
		if (enough(mid)) high = mid;
		else low = mid + 1;
	}
	return low;
};
