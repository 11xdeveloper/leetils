/**
 * 936. Stamping The Sequence
 *
 * Starting from a string of `?`s as long as `target`, each turn places
 * `stamp` fully inside, overwriting those letters. Returns the stamp
 * positions, in order, that produce `target` in at most `10 · target.length`
 * turns, or `[]` if it can't be done. Any valid sequence is accepted.
 *
 * Works backwards from `target`: repeatedly "un-stamps" any window matching
 * the stamp wherever it isn't already a `?`, turning it to `?`s. The last
 * stamp placed must match fully, and each earlier one only needs to match
 * the letters later stamps didn't cover. Reversed, the windows are the
 * answer.
 *
 * @see https://leetcode.com/problems/stamping-the-sequence/
 * @difficulty Hard
 * @timeComplexity O(n · (n - m) · m) for a target of length n and stamp of length m
 * @spaceComplexity O(n)
 *
 * @example
 * stampingTheSequence("abc", "ababc"); // [0, 2]
 */
export const stampingTheSequence = (
	stamp: string,
	target: string,
): number[] => {
	const current = [...target];
	const n = current.length;
	const m = stamp.length;
	const order: number[] = [];
	let remaining = n;

	for (let progress = true; progress && remaining > 0; ) {
		progress = false;
		for (let start = 0; start + m <= n; start++) {
			let matchesSomething = false;
			let fits = true;
			for (let k = 0; k < m && fits; k++) {
				const char = current[start + k];
				if (char === "?") continue;
				if (char !== stamp.charAt(k)) fits = false;
				else matchesSomething = true;
			}
			if (!fits || !matchesSomething) continue;
			for (let k = 0; k < m; k++) {
				if (current[start + k] !== "?") remaining--;
				current[start + k] = "?";
			}
			order.push(start);
			progress = true;
		}
	}

	return remaining === 0 && order.length <= 10 * n ? order.reverse() : [];
};
