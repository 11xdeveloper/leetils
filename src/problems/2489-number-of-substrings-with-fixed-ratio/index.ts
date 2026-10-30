/**
 * 2489. Number of Substrings With Fixed Ratio
 *
 * Counts the non-empty substrings of the binary string `s` whose zeros and
 * ones are in the ratio `num1 : num2` (coprime).
 *
 * A substring qualifies when `zeros · num2 - ones · num1` is 0, so count
 * equal values of that prefix quantity.
 *
 * @see https://leetcode.com/problems/number-of-substrings-with-fixed-ratio/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfSubstringsWithFixedRatio("0110011", 1, 2); // 4
 */
export const numberOfSubstringsWithFixedRatio = (
	s: string,
	num1: number,
	num2: number,
): number => {
	const seen = new Map([[0, 1]]);
	let [key, count] = [0, 0];
	for (const char of s) {
		key += char === "0" ? num2 : -num1;
		const before = seen.get(key) ?? 0;
		count += before;
		seen.set(key, before + 1);
	}
	return count;
};
