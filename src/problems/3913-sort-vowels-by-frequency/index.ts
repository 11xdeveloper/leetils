/**
 * 3913. Sort Vowels by Frequency
 *
 * Rearranges only the vowels of `s` so they run from most frequent to
 * least, ties broken by which appears first.
 *
 * @see https://leetcode.com/problems/sort-vowels-by-frequency/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * sortVowelsByFrequency("aeiaaioooa"); // "aaaaoooiie"
 */
export const sortVowelsByFrequency = (s: string): string => {
	const isVowel = (c: string) => "aeiou".includes(c);
	const counts = new Map<string, number>();
	for (const c of s) if (isVowel(c)) counts.set(c, (counts.get(c) ?? 0) + 1);
	// Map keys keep first-occurrence order, and sort is stable.
	const order = [...counts]
		.sort((a, b) => b[1] - a[1])
		.flatMap(([c, count]) => new Array<string>(count).fill(c));
	let next = 0;
	return [...s].map((c) => (isVowel(c) ? (order[next++] ?? c) : c)).join("");
};
