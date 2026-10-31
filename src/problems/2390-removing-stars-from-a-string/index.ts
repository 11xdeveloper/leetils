/**
 * 2390. Removing Stars From a String
 *
 * Each `*` removes itself and the closest non-star character to its left.
 * Returns the string after every removal.
 *
 * @see https://leetcode.com/problems/removing-stars-from-a-string/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * removingStarsFromAString("leet**cod*e"); // "lecoe"
 */
export const removingStarsFromAString = (s: string): string => {
	const stack: string[] = [];
	for (const char of s) {
		if (char === "*") stack.pop();
		else stack.push(char);
	}
	return stack.join("");
};
