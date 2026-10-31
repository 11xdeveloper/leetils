/**
 * 3223. Minimum Length of String After Operations
 *
 * Repeatedly pick a letter with a copy on each side and delete the nearest
 * copy on each side. Returns the shortest the string can get.
 *
 * Each letter's count drops by two at a time while it's at least 3, ending
 * at 1 if it was odd or 2 if it was even.
 *
 * @see https://leetcode.com/problems/minimum-length-of-string-after-operations/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumLengthOfStringAfterOperations("abaacbcbb"); // 5
 */
export const minimumLengthOfStringAfterOperations = (s: string): number => {
	const counts = new Array<number>(26).fill(0);
	for (let i = 0; i < s.length; i++)
		counts[s.charCodeAt(i) - 97] = (counts[s.charCodeAt(i) - 97] ?? 0) + 1;
	return counts.reduce(
		(total, count) => total + (count === 0 ? 0 : count % 2 === 1 ? 1 : 2),
		0,
	);
};
