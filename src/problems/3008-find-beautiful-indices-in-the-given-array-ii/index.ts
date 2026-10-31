/**
 * 3008. Find Beautiful Indices in the Given Array II
 *
 * The indices `i` where `a` occurs in `s` with an occurrence of `b`
 * starting within `k` of it, in increasing order.
 *
 * Find both patterns' occurrences with the KMP failure function, then
 * sweep them together, moving a pointer through `b`'s occurrences to the
 * first one that isn't too far left of each `a`.
 *
 * @see https://leetcode.com/problems/find-beautiful-indices-in-the-given-array-ii/
 * @difficulty Hard
 * @timeComplexity O(n + |a| + |b|)
 * @spaceComplexity O(n + |a| + |b|)
 *
 * @example
 * findBeautifulIndicesInTheGivenArrayII("isawsquirrelnearmysquirrelhouseohmy", "my", "squirrel", 15); // [16, 33]
 */
export const findBeautifulIndicesInTheGivenArrayII = (
	s: string,
	a: string,
	b: string,
	k: number,
): number[] => {
	const starts = occurrences(s, a);
	const targets = occurrences(s, b);
	const result: number[] = [];
	let j = 0;
	for (const i of starts) {
		while (j < targets.length && (targets[j] ?? 0) < i - k) j++;
		if (j < targets.length && (targets[j] ?? 0) <= i + k) result.push(i);
	}
	return result;
};

/** The start indices of `pattern` in `text`, by KMP. */
const occurrences = (text: string, pattern: string): number[] => {
	const fail = new Int32Array(pattern.length);
	for (let i = 1, length = 0; i < pattern.length; i++) {
		while (length > 0 && pattern[i] !== pattern[length])
			length = fail[length - 1] ?? 0;
		if (pattern[i] === pattern[length]) length++;
		fail[i] = length;
	}
	const result: number[] = [];
	for (let i = 0, matched = 0; i < text.length; i++) {
		while (matched > 0 && text[i] !== pattern[matched])
			matched = fail[matched - 1] ?? 0;
		if (text[i] === pattern[matched]) matched++;
		if (matched === pattern.length) {
			result.push(i - matched + 1);
			matched = fail[matched - 1] ?? 0;
		}
	}
	return result;
};
