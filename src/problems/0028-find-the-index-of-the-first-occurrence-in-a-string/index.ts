/**
 * 28. Find the Index of the First Occurrence in a String
 *
 * Returns the index of the first occurrence of `needle` in `haystack`, or -1
 * if it doesn't occur.
 *
 * Uses the Knuth–Morris–Pratt algorithm. It first records, for each prefix of
 * `needle`, the longest proper prefix that is also a suffix. On a mismatch,
 * that says how much of the match so far can be kept, so no character of
 * `haystack` is read twice.
 *
 * @see https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/
 * @difficulty Easy
 * @timeComplexity O(n + m)
 * @spaceComplexity O(m)
 *
 * @example
 * findTheIndexOfTheFirstOccurrenceInAString("sadbutsad", "sad"); // 0
 * findTheIndexOfTheFirstOccurrenceInAString("leetcode", "leeto"); // -1
 */
export const findTheIndexOfTheFirstOccurrenceInAString = (
	haystack: string,
	needle: string,
): number => {
	if (needle === "") return 0;

	// fallback[i] is the length of the longest proper prefix of
	// needle.slice(0, i + 1) that is also a suffix of it.
	const fallback = new Array<number>(needle.length).fill(0);
	let length = 0;
	for (let i = 1; i < needle.length; i++) {
		while (length > 0 && needle[i] !== needle[length]) {
			length = fallback[length - 1] ?? 0;
		}
		if (needle[i] === needle[length]) length++;
		fallback[i] = length;
	}

	let matched = 0;
	for (let i = 0; i < haystack.length; i++) {
		while (matched > 0 && haystack[i] !== needle[matched]) {
			matched = fallback[matched - 1] ?? 0;
		}
		if (haystack[i] === needle[matched]) matched++;
		if (matched === needle.length) return i - needle.length + 1;
	}

	return -1;
};
