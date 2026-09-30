/**
 * 763. Partition Labels
 *
 * Splits `s` into as many parts as possible so each letter appears in only
 * one part, and returns the parts' lengths in order.
 *
 * A part must reach at least as far as the last occurrence of every letter
 * in it. Scanning left to right, it extends the current part's end to each
 * letter's last occurrence and cuts when it reaches that end.
 *
 * @see https://leetcode.com/problems/partition-labels/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1), 26 positions
 *
 * @example
 * partitionLabels("ababcbacadefegdehijhklij"); // [9, 7, 8]
 */
export const partitionLabels = (s: string): number[] => {
	const last = new Map<string, number>();
	for (const [i, char] of [...s].entries()) last.set(char, i);

	const sizes: number[] = [];
	let start = 0;
	let end = 0;
	for (const [i, char] of [...s].entries()) {
		end = Math.max(end, last.get(char) ?? i);
		if (i === end) {
			sizes.push(end - start + 1);
			start = i + 1;
		}
	}
	return sizes;
};
