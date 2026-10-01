/**
 * 1813. Sentence Similarity III
 *
 * Returns whether inserting one (possibly empty) run of words into one of
 * the sentences makes them equal.
 *
 * The shorter sentence must split into a common prefix and a common suffix
 * of the longer one, so match words from both ends.
 *
 * @see https://leetcode.com/problems/sentence-similarity-iii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * sentenceSimilarityIII("My name is Haley", "My Haley"); // true
 */
export const sentenceSimilarityIII = (
	sentence1: string,
	sentence2: string,
): boolean => {
	const [a, b] = [sentence1.split(" "), sentence2.split(" ")];
	const [shorter, longer] = a.length <= b.length ? [a, b] : [b, a];
	let prefix = 0;
	while (prefix < shorter.length && shorter[prefix] === longer[prefix])
		prefix++;
	let suffix = 0;
	while (
		suffix < shorter.length - prefix &&
		shorter.at(-1 - suffix) === longer.at(-1 - suffix)
	)
		suffix++;
	return prefix + suffix === shorter.length;
};
