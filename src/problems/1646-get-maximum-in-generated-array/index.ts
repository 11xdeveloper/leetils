/**
 * 1646. Get Maximum in Generated Array
 *
 * Generates `nums[0 … n]` with `nums[0] = 0`, `nums[1] = 1`,
 * `nums[2i] = nums[i]` and `nums[2i + 1] = nums[i] + nums[i + 1]`, and
 * returns its maximum.
 *
 * Builds the array directly.
 *
 * @see https://leetcode.com/problems/get-maximum-in-generated-array/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * getMaximumInGeneratedArray(7); // 3
 */
export const getMaximumInGeneratedArray = (n: number): number => {
	const nums = [0, 1];
	for (let i = 2; i <= n; i++) {
		const half = Math.floor(i / 2);
		nums.push(
			i % 2 === 0
				? (nums[half] ?? 0)
				: (nums[half] ?? 0) + (nums[half + 1] ?? 0),
		);
	}
	return Math.max(...nums.slice(0, n + 1));
};
