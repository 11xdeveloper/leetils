/**
 * 2716. Minimize String Length
 *
 * An operation picks a character and deletes its closest equal neighbour
 * on one side. Returns the shortest length reachable.
 *
 * Copies of a letter can always be removed down to one, so the answer is
 * the number of distinct letters.
 *
 * @see https://leetcode.com/problems/minimize-string-length/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimizeStringLength("dddaaa"); // 2
 */
export const minimizeStringLength = (s: string): number => new Set(s).size;
