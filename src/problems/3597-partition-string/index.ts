/**
 * 3597. Partition String
 *
 * Cut `s` into segments from the left: grow each segment one letter at a
 * time until it differs from every earlier segment, then start the next.
 * Returns the segments, dropping an unfinished last one.
 *
 * @see https://leetcode.com/problems/partition-string/
 * @difficulty Medium
 * @timeComplexity O(n√n)
 * @spaceComplexity O(n)
 *
 * @example
 * partitionString("abbccccd"); // ["a", "b", "bc", "c", "cc", "d"]
 */
export const partitionString = (s: string): string[] => {
	const seen = new Set<string>();
	const segments: string[] = [];
	let current = "";
	for (const letter of s) {
		current += letter;
		if (seen.has(current)) continue;
		seen.add(current);
		segments.push(current);
		current = "";
	}
	return segments;
};
