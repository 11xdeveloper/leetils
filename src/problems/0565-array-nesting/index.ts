/**
 * 565. Array Nesting
 *
 * `nums` is a permutation of 0 to n - 1. The set starting at `k` is
 * `{nums[k], nums[nums[k]], …}`, followed until a value repeats. Returns the
 * size of the largest such set.
 *
 * A permutation splits into disjoint cycles, and each set is a whole cycle,
 * so it walks every cycle once, marking indices as visited.
 *
 * @see https://leetcode.com/problems/array-nesting/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * arrayNesting([5, 4, 0, 3, 1, 6, 2]); // 4: {5, 6, 2, 0}
 */
export const arrayNesting = (nums: readonly number[]): number => {
	const visited = new Uint8Array(nums.length);
	let largest = 0;

	for (let start = 0; start < nums.length; start++) {
		let size = 0;
		for (let i = start; !visited[i]; i = nums[i] ?? 0) {
			visited[i] = 1;
			size++;
		}
		largest = Math.max(largest, size);
	}

	return largest;
};
