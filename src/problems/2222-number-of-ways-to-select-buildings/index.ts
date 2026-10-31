/**
 * 2222. Number of Ways to Select Buildings
 *
 * Counts the ways to pick three buildings, in order along the street,
 * with no two consecutive picks of the same type: "010" or "101".
 *
 * Count subsequences of each pattern prefix as the street is scanned.
 *
 * @see https://leetcode.com/problems/number-of-ways-to-select-buildings/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfWaysToSelectBuildings("001101"); // 6
 */
export const numberOfWaysToSelectBuildings = (s: string): number => {
	// [zeros, ones, "01"s, "10"s, "010"s and "101"s].
	let [zeros, ones, zeroOnes, oneZeros, ways] = [0, 0, 0, 0, 0];
	for (const char of s) {
		if (char === "0") {
			ways += zeroOnes;
			oneZeros += ones;
			zeros++;
		} else {
			ways += oneZeros;
			zeroOnes += zeros;
			ones++;
		}
	}
	return ways;
};
