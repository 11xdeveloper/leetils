/**
 * 744. Find Smallest Letter Greater Than Target
 *
 * Returns the first letter in the sorted array `letters` that is greater
 * than `target`, or `letters[0]` if there's none.
 *
 * Binary search for the first letter past `target`, wrapping to the start.
 *
 * @see https://leetcode.com/problems/find-smallest-letter-greater-than-target/
 * @difficulty Easy
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * findSmallestLetterGreaterThanTarget(["c", "f", "j"], "c"); // "f"
 */
export const findSmallestLetterGreaterThanTarget = (
	letters: readonly string[],
	target: string,
): string => {
	let low = 0;
	let high = letters.length;
	while (low < high) {
		const mid = (low + high) >>> 1;
		if ((letters[mid] ?? "") <= target) low = mid + 1;
		else high = mid;
	}
	return letters[low % letters.length] ?? "";
};
