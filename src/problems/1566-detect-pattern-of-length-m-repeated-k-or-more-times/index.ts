/**
 * 1566. Detect Pattern of Length M Repeated K or More Times
 *
 * Returns whether some block of `m` elements appears `k` or more times back
 * to back in `arr`.
 *
 * A block repeats exactly when each element matches the one `m` places
 * later, so look for a run of `m(k − 1)` such matches.
 *
 * @see https://leetcode.com/problems/detect-pattern-of-length-m-repeated-k-or-more-times/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * detectPatternOfLengthMRepeatedKOrMoreTimes([1, 2, 1, 2, 1, 1, 1, 3], 2, 2); // true
 */
export const detectPatternOfLengthMRepeatedKOrMoreTimes = (
	arr: readonly number[],
	m: number,
	k: number,
): boolean => {
	let run = 0;
	for (let i = 0; i + m < arr.length; i++) {
		run = arr[i] === arr[i + m] ? run + 1 : 0;
		if (run === m * (k - 1)) return true;
	}
	return false;
};
