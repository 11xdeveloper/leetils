/**
 * 2380. Time Needed to Rearrange a Binary String
 *
 * Every second all "01" pairs become "10" at once. Returns the seconds
 * until none remain.
 *
 * Each 1 must pass every 0 before it, one per second, and can't overtake
 * the 1 ahead of it, so it finishes at least a second after that one.
 *
 * @see https://leetcode.com/problems/time-needed-to-rearrange-a-binary-string/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * timeNeededToRearrangeABinaryString("0110101"); // 4
 */
export const timeNeededToRearrangeABinaryString = (s: string): number => {
	let [zeros, seconds] = [0, 0];
	for (const char of s) {
		if (char === "0") zeros++;
		else if (zeros > 0) seconds = Math.max(seconds + 1, zeros);
	}
	return seconds;
};
