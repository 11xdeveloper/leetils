/**
 * 451. Sort Characters By Frequency
 *
 * Rearranges `s` so its characters are grouped and ordered by how often
 * they appear, most frequent first. Characters with equal counts may come in
 * any order; here they keep the order they first appear in.
 *
 * Counts each character, then buckets them by count so the output is built
 * without a comparison sort.
 *
 * @see https://leetcode.com/problems/sort-characters-by-frequency/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * sortCharactersByFrequency("tree"); // "eetr"
 */
export const sortCharactersByFrequency = (s: string): string => {
	const counts = new Map<string, number>();
	for (const char of s) counts.set(char, (counts.get(char) ?? 0) + 1);

	const byCount: string[][] = Array.from({ length: s.length + 1 }, () => []);
	for (const [char, count] of counts) byCount[count]?.push(char);

	let sorted = "";
	for (let count = s.length; count > 0; count--) {
		for (const char of byCount[count] ?? []) sorted += char.repeat(count);
	}
	return sorted;
};
