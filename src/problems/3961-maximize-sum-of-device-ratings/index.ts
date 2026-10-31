/**
 * 3961. Maximize Sum of Device Ratings
 *
 * A device's rating is its smallest unit. Each device may once move one of
 * its units to another device. Returns the largest total rating.
 *
 * With at least two devices of two or more units, every device can give
 * its smallest unit away, leaving its second smallest b. The units given
 * away all go to one device, which then rates the overall smallest unit
 * g; the best device to sacrifice is the one with the smallest b, so the
 * total is Σ b + g - min b. Otherwise moving units can't help.
 *
 * @see https://leetcode.com/problems/maximize-sum-of-device-ratings/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m)
 *
 * @example
 * maximizeSumOfDeviceRatings([[1, 2, 3], [4, 5, 6]]); // 6
 */
export const maximizeSumOfDeviceRatings = (
	units: readonly (readonly number[])[],
): number => {
	const smallestTwo = units.map((device) =>
		[...device].sort((a, b) => a - b).slice(0, 2),
	);
	const lowest = smallestTwo.map(([a = 0]) => a);
	if (units.length < 2 || (units[0]?.length ?? 0) < 2)
		return lowest.reduce((s, a) => s + a, 0);
	const second = smallestTwo.map(([, b = 0]) => b);
	return (
		second.reduce((s, b) => s + b, 0) +
		Math.min(...lowest) -
		Math.min(...second)
	);
};
