/**
 * 796. Rotate String
 *
 * Returns whether `s` can become `goal` by repeatedly moving its first
 * character to the end.
 *
 * The rotations of `s` are exactly the substrings of `s + s` of its length.
 *
 * @see https://leetcode.com/problems/rotate-string/
 * @difficulty Easy
 * @timeComplexity O(n) on average for the substring search
 * @spaceComplexity O(n)
 *
 * @example
 * rotateString("abcde", "cdeab"); // true
 */
export const rotateString = (s: string, goal: string): boolean =>
	s.length === goal.length && (s + s).includes(goal);
