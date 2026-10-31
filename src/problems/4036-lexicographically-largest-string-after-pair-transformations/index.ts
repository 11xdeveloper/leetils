/**
 * 4036. Lexicographically Largest String After Pair Transformations
 *
 * Starting from x copies of "a", repeatedly merge two equal neighbouring
 * letters into the next letter (not past z). For each x, returns the
 * lexicographically largest result.
 *
 * Results are runs of a's merged into blocks of 2^j letters each, so pick
 * the largest block (letter) that fits what's left, again and again.
 *
 * @see https://leetcode.com/problems/lexicographically-largest-string-after-pair-transformations/
 * @difficulty Medium
 * @timeComplexity O(n · (x / 2²⁵ + 25))
 * @spaceComplexity O(1) per string
 *
 * @example
 * lexicographicallyLargestStringAfterPairTransformations([2, 5, 7]); // ["b", "ca", "cba"]
 */
export const lexicographicallyLargestStringAfterPairTransformations = (
	nums: readonly number[],
): string[] =>
	nums.map((x) => {
		let result = "";
		for (let left = x; left > 0; ) {
			let letter = 25;
			while (2 ** letter > left) letter--;
			result += String.fromCharCode(97 + letter);
			left -= 2 ** letter;
		}
		return result;
	});
