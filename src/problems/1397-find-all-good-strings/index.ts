/**
 * 1397. Find All Good Strings
 *
 * Counts the strings of length `n` from `s1` to `s2` (alphabetically,
 * inclusive) that don't contain `evil`, modulo 10^9 + 7.
 *
 * Digit dynamic programming with a Knuth–Morris–Pratt automaton for `evil`:
 * counts strings up to a bound, letter by letter, tracking how much of
 * `evil` the string currently ends with and whether it's still equal to the
 * bound so far. The answer is the count up to `s2`, minus the count up to
 * `s1`, plus `s1` itself if it's good.
 *
 * @see https://leetcode.com/problems/find-all-good-strings/
 * @difficulty Hard
 * @timeComplexity O(26 · n · m) for evil of length m
 * @spaceComplexity O(26 · m)
 *
 * @example
 * findAllGoodStrings(2, "aa", "da", "b"); // 51
 */
export const findAllGoodStrings = (
	n: number,
	s1: string,
	s2: string,
	evil: string,
): number => {
	const MOD = 1_000_000_007;
	const m = evil.length;
	const failure = new Array<number>(m).fill(0);
	for (let i = 1, k = 0; i < m; i++) {
		while (k > 0 && evil[i] !== evil[k]) k = failure[k - 1] ?? 0;
		if (evil[i] === evil[k]) k++;
		failure[i] = k;
	}
	// step[state][letter] is how much of evil is matched after appending the letter.
	const step = Array.from({ length: m }, (_, state) =>
		Array.from({ length: 26 }, (_, letter) => {
			const char = String.fromCharCode(97 + letter);
			let k = state;
			while (k > 0 && evil[k] !== char) k = failure[k - 1] ?? 0;
			return evil[k] === char ? k + 1 : 0;
		}),
	);

	const countUpTo = (bound: string): number => {
		// free[state] counts prefixes already below the bound; tight tracks the one equal to it.
		let free = new Array<number>(m).fill(0);
		let tight = 0;
		for (let i = 0; i < n; i++) {
			const next = new Array<number>(m).fill(0);
			free.forEach((ways, state) => {
				if (ways === 0) return;
				for (let letter = 0; letter < 26; letter++) {
					const to = step[state]?.[letter] ?? 0;
					if (to < m) next[to] = ((next[to] ?? 0) + ways) % MOD;
				}
			});
			if (tight !== -1) {
				const limit = bound.charCodeAt(i) - 97;
				for (let letter = 0; letter < limit; letter++) {
					const to = step[tight]?.[letter] ?? 0;
					if (to < m) next[to] = ((next[to] ?? 0) + 1) % MOD;
				}
				const to = step[tight]?.[limit] ?? 0;
				tight = to < m ? to : -1;
			}
			free = next;
		}
		const total = free.reduce((sum, ways) => (sum + ways) % MOD, 0);
		return (total + (tight !== -1 ? 1 : 0)) % MOD;
	};

	const s1IsGood = s1.includes(evil) ? 0 : 1;
	return (((countUpTo(s2) - countUpTo(s1) + s1IsGood) % MOD) + MOD) % MOD;
};
