/**
 * 2459. Sort Array by Moving Items to Empty Space
 *
 * `nums` is a permutation of `0..n-1` where 0 is an empty space; an
 * operation moves any item into the space. Returns the fewest operations
 * to sort it, with the space either first or last.
 *
 * For each target layout, break the permutation into cycles. The cycle
 * holding the space costs its length minus one; any other cycle needs the
 * space brought in and out, costing its length plus one.
 *
 * @see https://leetcode.com/problems/sort-array-by-moving-items-to-empty-space/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * sortArrayByMovingItemsToEmptySpace([4, 2, 0, 3, 1]); // 3
 */
export const sortArrayByMovingItemsToEmptySpace = (
	nums: readonly number[],
): number => {
	const n = nums.length;
	const operations = (home: (value: number) => number): number => {
		const seen = new Uint8Array(n);
		let total = 0;
		for (let start = 0; start < n; start++) {
			if (seen[start]) continue;
			let [length, hasSpace] = [0, false];
			for (let i = start; !seen[i]; i = home(nums[i] ?? 0)) {
				seen[i] = 1;
				length++;
				if (nums[i] === 0) hasSpace = true;
			}
			if (length > 1) total += hasSpace ? length - 1 : length + 1;
		}
		return total;
	};
	return Math.min(
		operations((value) => value),
		operations((value) => (value === 0 ? n - 1 : value - 1)),
	);
};
