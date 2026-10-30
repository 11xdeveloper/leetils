/** The interface LeetCode provides to read a huge array. */
interface BigArray {
	at(index: number): number;
	size(): number;
}

/**
 * 2936. Number of Equal Numbers Blocks
 *
 * In `nums`, all copies of each value sit next to each other. Returns the
 * number of maximal blocks of equal values.
 *
 * From each block's start, gallop forward by doubling steps to find where
 * the value changes, then binary search the exact end.
 *
 * @see https://leetcode.com/problems/number-of-equal-numbers-blocks/
 * @difficulty Medium
 * @timeComplexity O(b log n), where `b` is the number of blocks
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfEqualNumbersBlocks({ at: (i) => [1, 1, 3, 9, 9][i] ?? 0, size: () => 5 }); // 3
 */
export const numberOfEqualNumbersBlocks = (nums: BigArray): number => {
	const n = nums.size();
	let blocks = 0;
	for (let start = 0; start < n; ) {
		const value = nums.at(start);
		let step = 1;
		while (start + step < n && nums.at(start + step) === value) step *= 2;
		let low = start + Math.floor(step / 2);
		let high = Math.min(n, start + step);
		while (low + 1 < high) {
			const mid = Math.floor((low + high) / 2);
			if (nums.at(mid) === value) low = mid;
			else high = mid;
		}
		blocks++;
		start = high;
	}
	return blocks;
};
