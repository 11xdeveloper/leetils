/**
 * 294. Flip Game II
 *
 * In the Flip Game, players take turns flipping two consecutive `++` in
 * `currentState` into `--`, and a player who can't move loses. Returns
 * whether the first player can force a win.
 *
 * Each run of `+` is an independent game, so the Sprague–Grundy theorem
 * applies: the first player wins exactly when the XOR of the runs' Grundy
 * values is non-zero. A run of length `n` split by a move leaves runs of
 * `i` and `n - 2 - i`, and its Grundy value is the smallest non-negative
 * integer not among those splits' values. That's polynomial time, where
 * searching every sequence of moves is exponential.
 *
 * @see https://leetcode.com/problems/flip-game-ii/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * flipGameII("++++"); // true: flip the middle to leave "+--+"
 */
export const flipGameII = (currentState: string): boolean => {
	const runs = currentState.split("-").map((run) => run.length);
	const longest = Math.max(0, ...runs);

	const grundy = [0];
	for (let n = 1; n <= longest; n++) {
		const reachable = new Set<number>();
		for (let i = 0; i + 2 <= n; i++)
			reachable.add((grundy[i] ?? 0) ^ (grundy[n - 2 - i] ?? 0));
		let value = 0;
		while (reachable.has(value)) value++;
		grundy.push(value);
	}

	return runs.reduce((xor, run) => xor ^ (grundy[run] ?? 0), 0) !== 0;
};
