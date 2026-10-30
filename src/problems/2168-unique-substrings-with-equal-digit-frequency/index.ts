/**
 * 2168. Unique Substrings With Equal Digit Frequency
 *
 * Counts the distinct substrings of the digit string `s` in which every
 * digit present appears equally often.
 *
 * Insert every substring into a trie, one start at a time, so each
 * distinct substring is a trie node created once. Track digit counts as
 * a substring grows: it qualifies when the most frequent count times the
 * number of distinct digits equals its length.
 *
 * @see https://leetcode.com/problems/unique-substrings-with-equal-digit-frequency/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n^2)
 *
 * @example
 * uniqueSubstringsWithEqualDigitFrequency("1212"); // 5
 */
export const uniqueSubstringsWithEqualDigitFrequency = (s: string): number => {
	const children = new Map<number, number>();
	let nodes = 1;
	let count = 0;
	for (let start = 0; start < s.length; start++) {
		const counts = new Array<number>(10).fill(0);
		let [distinct, most, node] = [0, 0, 0];
		for (let end = start; end < s.length; end++) {
			const digit = s.charCodeAt(end) - 48;
			const seen = (counts[digit] ?? 0) + 1;
			counts[digit] = seen;
			if (seen === 1) distinct++;
			most = Math.max(most, seen);
			const key = node * 10 + digit;
			const child = children.get(key);
			if (child !== undefined) {
				node = child;
				continue;
			}
			node = nodes++;
			children.set(key, node);
			if (most * distinct === end - start + 1) count++;
		}
	}
	return count;
};
