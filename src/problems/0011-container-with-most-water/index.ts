/**
 * 11. Container With Most Water
 *
 * Given line heights at each index, returns the most water a container made
 * from two of the lines can hold.
 *
 * Starts with the widest container and moves the shorter line inwards.
 * Moving the taller line can never help, because the width shrinks and the
 * height is still capped by the shorter line.
 *
 * @see https://leetcode.com/problems/container-with-most-water/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * containerWithMostWater([1, 8, 6, 2, 5, 4, 8, 3, 7]); // 49
 */
export const containerWithMostWater = (height: readonly number[]): number => {
	let left = 0;
	let right = height.length - 1;
	let most = 0;

	while (left < right) {
		const leftHeight = height[left] ?? 0;
		const rightHeight = height[right] ?? 0;
		most = Math.max(most, Math.min(leftHeight, rightHeight) * (right - left));

		if (leftHeight < rightHeight) left++;
		else right--;
	}

	return most;
};
