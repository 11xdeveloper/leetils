/**
 * 2767. Partition String Into Minimum Beautiful Substrings
 *
 * A beautiful substring is the binary form of a power of 5, without
 * leading zeros. Returns the fewest beautiful substrings `s` splits into,
 * or -1 if it can't.
 *
 * Dynamic programming over prefixes, trying each power of 5 that fits.
 *
 * @see https://leetcode.com/problems/partition-string-into-minimum-beautiful-substrings/
 * @difficulty Medium
 * @timeComplexity O(n²)
 * @spaceComplexity O(n)
 *
 * @example
 * partitionStringIntoMinimumBeautifulSubstrings("1011"); // 2
 */
export const partitionStringIntoMinimumBeautifulSubstrings = (
	s: string,
): number => {
	const powers = new Set<string>();
	for (let p = 1; p < 2 ** s.length; p *= 5) powers.add(p.toString(2));
	const fewest = [0];
	for (let end = 1; end <= s.length; end++) {
		let best = Number.POSITIVE_INFINITY;
		for (let start = 0; start < end; start++)
			if (powers.has(s.slice(start, end)))
				best = Math.min(best, (fewest[start] ?? 0) + 1);
		fewest.push(best);
	}
	const answer = fewest[s.length] ?? Number.POSITIVE_INFINITY;
	return answer === Number.POSITIVE_INFINITY ? -1 : answer;
};
