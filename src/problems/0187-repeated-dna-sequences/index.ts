/**
 * 187. Repeated DNA Sequences
 *
 * Returns every 10-letter substring of the DNA sequence `s` (made of A, C, G
 * and T) that occurs more than once, each listed once, in the order of its
 * second occurrence.
 *
 * Slides a 10-letter window along `s`, recording each window in a set; a
 * window already in the set is a repeat.
 *
 * @see https://leetcode.com/problems/repeated-dna-sequences/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * repeatedDnaSequences("AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"); // ["AAAAACCCCC", "CCCCCAAAAA"]
 */
export const repeatedDnaSequences = (s: string): string[] => {
	const seen = new Set<string>();
	const repeated = new Set<string>();

	for (let i = 0; i + 10 <= s.length; i++) {
		const window = s.slice(i, i + 10);
		if (seen.has(window)) repeated.add(window);
		else seen.add(window);
	}

	return [...repeated];
};
