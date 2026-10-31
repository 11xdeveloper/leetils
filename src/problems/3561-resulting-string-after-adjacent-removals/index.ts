/**
 * 3561. Resulting String After Adjacent Removals
 *
 * Repeatedly remove the leftmost pair of neighbouring letters that are
 * consecutive in the alphabet (which wraps, so 'a' and 'z' count). Returns
 * what's left.
 *
 * A stack: each letter cancels the top if they're consecutive.
 *
 * @see https://leetcode.com/problems/resulting-string-after-adjacent-removals/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * resultingStringAfterAdjacentRemovals("abc"); // "c"
 */
export const resultingStringAfterAdjacentRemovals = (s: string): string => {
	const stack: number[] = [];
	for (let i = 0; i < s.length; i++) {
		const letter = s.charCodeAt(i) - 97;
		const top = stack.at(-1);
		const gap = top === undefined ? 0 : Math.abs(top - letter);
		if (top !== undefined && (gap === 1 || gap === 25)) stack.pop();
		else stack.push(letter);
	}
	return String.fromCharCode(...stack.map((c) => 97 + c));
};
