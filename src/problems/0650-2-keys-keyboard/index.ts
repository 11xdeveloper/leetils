/**
 * 650. 2 Keys Keyboard
 *
 * Starting with one `A` on screen, each step either copies everything on
 * screen or pastes the last copy. Returns the fewest steps to get exactly
 * `n` `A`s.
 *
 * Copying at `k` and then pasting `m - 1` times multiplies the count by `m`
 * in `m` steps. So the answer is the least total of factors whose product
 * is `n`, which is the sum of its prime factors (splitting a composite
 * factor never costs more).
 *
 * @see https://leetcode.com/problems/2-keys-keyboard/
 * @difficulty Medium
 * @timeComplexity O(√n)
 * @spaceComplexity O(1)
 *
 * @example
 * twoKeysKeyboard(3); // 3: copy, paste, paste
 */
export const twoKeysKeyboard = (n: number): number => {
	let steps = 0;
	for (let factor = 2; factor * factor <= n; factor++) {
		while (n % factor === 0) {
			steps += factor;
			n /= factor;
		}
	}
	return n > 1 ? steps + n : steps;
};
