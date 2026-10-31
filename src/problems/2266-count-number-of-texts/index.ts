/**
 * 2266. Count Number of Texts
 *
 * On a phone keypad, pressing a key `k` times types its `k`-th letter (keys
 * 7 and 9 have four letters, the others three). Counts the texts that the
 * key presses `pressedKeys` could mean, modulo 10^9 + 7.
 *
 * `ways[i]` counts readings of the first `i` presses: the last letter used
 * the final 1 to 3 (or 4) presses, all of the same key.
 *
 * @see https://leetcode.com/problems/count-number-of-texts/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * countNumberOfTexts("22233"); // 8
 */
export const countNumberOfTexts = (pressedKeys: string): number => {
	const MOD = 1_000_000_007;
	const n = pressedKeys.length;
	const ways = new Array<number>(n + 1).fill(0);
	ways[0] = 1;
	for (let i = 1; i <= n; i++) {
		const key = pressedKeys[i - 1];
		const letters = key === "7" || key === "9" ? 4 : 3;
		for (let run = 1; run <= letters && run <= i; run++) {
			if (pressedKeys[i - run] !== key) break;
			ways[i] = ((ways[i] ?? 0) + (ways[i - run] ?? 0)) % MOD;
		}
	}
	return ways[n] ?? 0;
};
