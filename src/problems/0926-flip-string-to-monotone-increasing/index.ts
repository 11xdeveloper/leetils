/**
 * 926. Flip String to Monotone Increasing
 *
 * Returns the fewest bit flips that make the binary string `s` monotone
 * increasing: some 0s followed by some 1s.
 *
 * Scanning left to right, `flips` is the fewest flips making the prefix
 * monotone. A 1 costs nothing; a 0 either gets flipped to 1 (one more
 * flip) or all the 1s so far get flipped to 0.
 *
 * @see https://leetcode.com/problems/flip-string-to-monotone-increasing/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * flipStringToMonotoneIncreasing("00110"); // 1
 */
export const flipStringToMonotoneIncreasing = (s: string): number => {
	let ones = 0;
	let flips = 0;
	for (const char of s) {
		if (char === "1") ones++;
		else flips = Math.min(flips + 1, ones);
	}
	return flips;
};
