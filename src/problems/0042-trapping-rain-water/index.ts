/**
 * 42. Trapping Rain Water
 *
 * Given the heights of a row of bars, each 1 wide, returns how much rain
 * water collects between them.
 *
 * The water above a bar is capped by the shorter of the tallest bars to its
 * left and right. Two pointers move inwards from both ends, always advancing
 * the side with the shorter maximum so far: that maximum is then known to be
 * the cap for the bar being passed.
 *
 * @see https://leetcode.com/problems/trapping-rain-water/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * trappingRainWater([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]); // 6
 */
export const trappingRainWater = (height: readonly number[]): number => {
	let left = 0;
	let right = height.length - 1;
	let leftMax = 0;
	let rightMax = 0;
	let water = 0;

	while (left <= right) {
		leftMax = Math.max(leftMax, height[left] ?? 0);
		rightMax = Math.max(rightMax, height[right] ?? 0);

		if (leftMax <= rightMax) {
			water += leftMax - (height[left] ?? 0);
			left++;
		} else {
			water += rightMax - (height[right] ?? 0);
			right--;
		}
	}

	return water;
};
