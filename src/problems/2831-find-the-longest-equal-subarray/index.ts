/**
 * 2831. Find the Longest Equal Subarray
 *
 * After deleting at most `k` elements, returns the length of the longest
 * run of equal elements possible.
 *
 * For each value, slide a window over its positions; the elements to
 * delete are the others between the window's ends.
 *
 * @see https://leetcode.com/problems/find-the-longest-equal-subarray/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * findTheLongestEqualSubarray([1, 3, 2, 3, 1, 3], 3); // 3
 */
export const findTheLongestEqualSubarray = (
	nums: readonly number[],
	k: number,
): number => {
	const positions = new Map<number, number[]>();
	for (const [i, num] of nums.entries()) {
		const list = positions.get(num) ?? [];
		list.push(i);
		positions.set(num, list);
	}
	let best = 0;
	for (const list of positions.values()) {
		let left = 0;
		for (let right = 0; right < list.length; right++) {
			while ((list[right] ?? 0) - (list[left] ?? 0) - (right - left) > k)
				left++;
			best = Math.max(best, right - left + 1);
		}
	}
	return best;
};
