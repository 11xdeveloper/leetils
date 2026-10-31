/**
 * 3637. Trionic Array I
 *
 * Whether `nums` strictly increases, then strictly decreases, then
 * strictly increases again, each part taking at least one step.
 *
 * Walk each run in turn and check all three are non-empty and the walk
 * ends at the last element.
 *
 * @see https://leetcode.com/problems/trionic-array-i/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * trionicArrayI([1, 3, 5, 4, 2, 6]); // true
 */
export const trionicArrayI = (nums: readonly number[]): boolean => {
	const n = nums.length;
	let i = 0;
	const run = (rising: boolean): boolean => {
		const from = i;
		while (
			i + 1 < n &&
			(rising
				? (nums[i] ?? 0) < (nums[i + 1] ?? 0)
				: (nums[i] ?? 0) > (nums[i + 1] ?? 0))
		)
			i++;
		return i > from;
	};
	return run(true) && run(false) && run(true) && i === n - 1;
};
