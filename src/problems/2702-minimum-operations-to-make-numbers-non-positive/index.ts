/**
 * 2702. Minimum Operations to Make Numbers Non-positive
 *
 * Each operation subtracts `x` from one chosen element and `y` from all
 * the others, where `x > y`. Returns the fewest operations to make every
 * element at most 0.
 *
 * Binary search the count `t`: every element loses at least `t · y`, and
 * each time it's chosen it loses `x - y` more, so it needs
 * `⌈(nums[i] - t · y) / (x - y)⌉` of the `t` choices.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-make-numbers-non-positive/
 * @difficulty Hard
 * @timeComplexity O(n log m), where `m` is the largest number
 * @spaceComplexity O(1)
 *
 * @example
 * minimumOperationsToMakeNumbersNonPositive([3, 4, 1, 7, 6], 4, 2); // 3
 */
export const minimumOperationsToMakeNumbersNonPositive = (
	nums: readonly number[],
	x: number,
	y: number,
): number => {
	const enough = (t: number): boolean => {
		let chosen = 0;
		for (const num of nums) {
			const rest = num - t * y;
			if (rest > 0) chosen += Math.ceil(rest / (x - y));
			if (chosen > t) return false;
		}
		return true;
	};
	let low = 0;
	let high = Math.max(...nums);
	while (low < high) {
		const mid = Math.floor((low + high) / 2);
		if (enough(mid)) high = mid;
		else low = mid + 1;
	}
	return low;
};
