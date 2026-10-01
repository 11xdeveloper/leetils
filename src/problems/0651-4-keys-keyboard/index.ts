/**
 * 651. 4 Keys Keyboard
 *
 * With keys that print `A`, select all, copy and paste, returns the most
 * `A`s that can be on screen after at most `n` key presses.
 *
 * `best[i]` is the most after `i` presses. Either the last press prints an
 * `A`, or the presses end with select all, copy and some pastes: spending
 * `b` presses that way multiplies what was there by `b - 1`.
 *
 * @see https://leetcode.com/problems/4-keys-keyboard/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * fourKeysKeyboard(7); // 9: A, A, A, select all, copy, paste, paste
 */
export const fourKeysKeyboard = (n: number): number => {
	const best = [0];
	for (let presses = 1; presses <= n; presses++) {
		let most = (best[presses - 1] ?? 0) + 1;
		for (let spent = 3; spent < presses; spent++)
			most = Math.max(most, (best[presses - spent] ?? 0) * (spent - 1));
		best.push(most);
	}
	return best[n] ?? 0;
};
