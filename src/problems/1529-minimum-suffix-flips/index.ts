/**
 * 1529. Minimum Suffix Flips
 *
 * An operation flips every bit from some index to the end. Returns the
 * fewest operations turning all zeros into `target`.
 *
 * Going left to right, a flip is needed exactly where the target bit
 * differs from the one before it (taking a 0 before the start).
 *
 * @see https://leetcode.com/problems/minimum-suffix-flips/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumSuffixFlips("10111"); // 3
 */
export const minimumSuffixFlips = (target: string): number => {
	let [flips, current] = [0, "0"];
	for (const bit of target) {
		if (bit !== current) {
			flips++;
			current = bit;
		}
	}
	return flips;
};
