/**
 * 2522. Partition String Into Substrings With Values at Most K
 *
 * Splits a string of digits 1–9 into substrings whose values are each at
 * most `k`. Returns the fewest substrings needed, or -1 if a single digit
 * already exceeds `k`.
 *
 * Greedily extend the current substring while its value stays within
 * `k`.
 *
 * @see https://leetcode.com/problems/partition-string-into-substrings-with-values-at-most-k/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * partitionStringIntoSubstringsWithValuesAtMostK("165462", 60); // 4
 */
export const partitionStringIntoSubstringsWithValuesAtMostK = (
	s: string,
	k: number,
): number => {
	let parts = 1;
	let value = 0;
	for (let i = 0; i < s.length; i++) {
		const digit = s.charCodeAt(i) - 48;
		if (digit > k) return -1;
		value = value * 10 + digit;
		if (value > k) {
			parts++;
			value = digit;
		}
	}
	return parts;
};
