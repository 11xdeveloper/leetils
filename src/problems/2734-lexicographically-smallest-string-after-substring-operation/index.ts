/**
 * 2734. Lexicographically Smallest String After Substring Operation
 *
 * Exactly once, pick a non-empty substring and replace each letter with
 * the one before it, `a` becoming `z`. Returns the smallest result.
 *
 * Decrement the first run of letters other than `a`. If there are none,
 * the least harm is turning the last `a` into `z`.
 *
 * @see https://leetcode.com/problems/lexicographically-smallest-string-after-substring-operation/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * lexicographicallySmallestStringAfterSubstringOperation("cbabc"); // "baabc"
 */
export const lexicographicallySmallestStringAfterSubstringOperation = (
	s: string,
): string => {
	const start = s.search(/[^a]/);
	if (start === -1) return `${s.slice(0, -1)}z`;
	let end = start;
	while (end < s.length && s.charAt(end) !== "a") end++;
	const shifted = [...s.slice(start, end)]
		.map((c) => String.fromCharCode(c.charCodeAt(0) - 1))
		.join("");
	return s.slice(0, start) + shifted + s.slice(end);
};
