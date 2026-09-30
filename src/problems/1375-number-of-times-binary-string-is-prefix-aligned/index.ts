/**
 * 1375. Number of Times Binary String Is Prefix-Aligned
 *
 * Bits `1 … n` are turned on in the order `flips`. Returns how many times,
 * after a flip, exactly the first `i` bits are on.
 *
 * After `i` flips, `i` distinct bits are on, so they're the first `i`
 * exactly when the highest bit flipped so far is `i`.
 *
 * @see https://leetcode.com/problems/number-of-times-binary-string-is-prefix-aligned/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfTimesBinaryStringIsPrefixAligned([3, 2, 4, 1, 5]); // 2
 */
export const numberOfTimesBinaryStringIsPrefixAligned = (
	flips: readonly number[],
): number => {
	let [highest, count] = [0, 0];
	flips.forEach((bit, i) => {
		highest = Math.max(highest, bit);
		if (highest === i + 1) count++;
	});
	return count;
};
