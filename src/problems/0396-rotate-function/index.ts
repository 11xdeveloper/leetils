/**
 * 396. Rotate Function
 *
 * With `arr_k` being `nums` rotated clockwise by `k`, and
 * `F(k) = 0·arr_k[0] + 1·arr_k[1] + … + (n-1)·arr_k[n-1]`, returns the
 * largest of `F(0)` to `F(n - 1)`.
 *
 * Rotating once adds every element's value to the sum, except the element
 * that wraps from the end to the front, whose weight drops from `n - 1` to
 * 0. So `F(k) = F(k - 1) + sum - n · nums[n - k]`, and each value follows
 * from the last in O(1).
 *
 * @see https://leetcode.com/problems/rotate-function/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * rotateFunction([4, 3, 2, 6]); // 26
 */
export const rotateFunction = (nums: readonly number[]): number => {
	const n = nums.length;
	const sum = nums.reduce((total, num) => total + num, 0);
	let value = nums.reduce((total, num, i) => total + i * num, 0);
	let best = value;

	for (let k = 1; k < n; k++) {
		value += sum - n * (nums[n - k] ?? 0);
		best = Math.max(best, value);
	}

	return best;
};
