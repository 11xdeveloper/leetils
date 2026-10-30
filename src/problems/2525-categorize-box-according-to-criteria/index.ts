/**
 * 2525. Categorize Box According to Criteria
 *
 * A box is "Bulky" if any dimension is at least 10⁴ or its volume at
 * least 10⁹, and "Heavy" if its mass is at least 100. Returns "Both",
 * "Bulky", "Heavy" or "Neither".
 *
 * Check each rule directly.
 *
 * @see https://leetcode.com/problems/categorize-box-according-to-criteria/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * categorizeBoxAccordingToCriteria(1000, 35, 700, 300); // "Heavy"
 */
export const categorizeBoxAccordingToCriteria = (
	length: number,
	width: number,
	height: number,
	mass: number,
): string => {
	const bulky =
		Math.max(length, width, height) >= 10_000 ||
		length * width * height >= 1_000_000_000;
	const heavy = mass >= 100;
	if (bulky && heavy) return "Both";
	if (bulky) return "Bulky";
	if (heavy) return "Heavy";
	return "Neither";
};
