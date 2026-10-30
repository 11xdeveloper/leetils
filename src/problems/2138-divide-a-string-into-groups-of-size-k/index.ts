/**
 * 2138. Divide a String Into Groups of Size k
 *
 * Splits `s` into groups of `k` characters, padding the last group with
 * `fill`.
 *
 * Pad the string, then slice.
 *
 * @see https://leetcode.com/problems/divide-a-string-into-groups-of-size-k/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * divideAStringIntoGroupsOfSizeK("abcdefghij", 3, "x"); // ["abc", "def", "ghi", "jxx"]
 */
export const divideAStringIntoGroupsOfSizeK = (
	s: string,
	k: number,
	fill: string,
): string[] => {
	const groups = Math.ceil(s.length / k);
	const padded = s.padEnd(groups * k, fill);
	return Array.from({ length: groups }, (_, i) =>
		padded.slice(i * k, (i + 1) * k),
	);
};
