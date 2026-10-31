/**
 * 3469. Find Minimum Cost to Remove Array Elements
 *
 * While three or more elements remain, remove two of the first three,
 * paying the larger. Then remove the rest, paying the largest. Returns the
 * smallest total cost.
 *
 * After each step the remaining array is one element left over from the
 * front, followed by an untouched suffix. Dynamic programming over (the
 * leftover element, where the suffix starts).
 *
 * @see https://leetcode.com/problems/find-minimum-cost-to-remove-array-elements/
 * @difficulty Medium
 * @timeComplexity O(n²)
 * @spaceComplexity O(n)
 *
 * @example
 * findMinimumCostToRemoveArrayElements([6, 2, 8, 4]); // 12
 */
export const findMinimumCostToRemoveArrayElements = (
	nums: readonly number[],
): number => {
	const n = nums.length;
	const at = (i: number): number => nums[i] ?? 0;
	// next[j]: cost to finish with nums[j] left over and the suffix starting at i + 2.
	let next = new Float64Array(n);
	for (let i = n % 2 === 1 ? n : n - 1; i >= 1; i -= 2) {
		const current = new Float64Array(n);
		for (let j = 0; j < i; j++) {
			if (i >= n) current[j] = at(j);
			else if (i === n - 1) current[j] = Math.max(at(j), at(i));
			else
				current[j] = Math.min(
					Math.max(at(i), at(i + 1)) + (next[j] ?? 0),
					Math.max(at(j), at(i + 1)) + (next[i] ?? 0),
					Math.max(at(j), at(i)) + (next[i + 1] ?? 0),
				);
		}
		next = current;
		if (i === 1) return current[0] ?? 0;
	}
	return next[0] ?? 0;
};
