/**
 * 2516. Take K of Each Character From Left and Right
 *
 * Each minute you take the leftmost or rightmost character of `s`, which
 * holds only `a`, `b` and `c`. Returns the fewest minutes to take at least
 * `k` of each letter, or -1 if that's impossible.
 *
 * What's left is a contiguous window. Slide the longest window that still
 * leaves at least `k` of each letter outside it.
 *
 * @see https://leetcode.com/problems/take-k-of-each-character-from-left-and-right/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * takeKOfEachCharacterFromLeftAndRight("aabaaaacaabc", 2); // 8
 */
export const takeKOfEachCharacterFromLeftAndRight = (
	s: string,
	k: number,
): number => {
	const outside = [0, 0, 0];
	for (let i = 0; i < s.length; i++)
		outside[s.charCodeAt(i) - 97] = (outside[s.charCodeAt(i) - 97] ?? 0) + 1;
	if (outside.some((count) => count < k)) return -1;

	let longest = 0;
	let left = 0;
	for (let right = 0; right < s.length; right++) {
		const letter = s.charCodeAt(right) - 97;
		outside[letter] = (outside[letter] ?? 0) - 1;
		while ((outside[letter] ?? 0) < k) {
			const dropped = s.charCodeAt(left++) - 97;
			outside[dropped] = (outside[dropped] ?? 0) + 1;
		}
		longest = Math.max(longest, right - left + 1);
	}
	return s.length - longest;
};
