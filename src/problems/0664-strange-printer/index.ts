/**
 * 664. Strange Printer
 *
 * A printer prints a run of one character over any range in each turn,
 * covering what was there. Returns the fewest turns to print `s`.
 *
 * Interval DP. For `s[i..j]`, the character `s[i]` is printed across some
 * turn; the cheapest plan either prints it alone and then does the rest, or
 * extends that same turn to a later equal character `s[k]`, printing the
 * part between on top. `turns[i][j]` takes the best over those choices.
 *
 * @see https://leetcode.com/problems/strange-printer/
 * @difficulty Hard
 * @timeComplexity O(n^3)
 * @spaceComplexity O(n^2)
 *
 * @example
 * strangePrinter("aba"); // 2: print "aaa", then "b" in the middle
 */
export const strangePrinter = (s: string): number => {
	const n = s.length;
	const turns: number[][] = Array.from({ length: n + 1 }, () =>
		new Array<number>(n + 1).fill(0),
	);

	for (let i = n - 1; i >= 0; i--) {
		const row = turns[i] ?? [];
		for (let j = i; j < n; j++) {
			let best = 1 + (turns[i + 1]?.[j] ?? 0);
			for (let k = i + 1; k <= j; k++) {
				if (s.charAt(k) === s.charAt(i))
					best = Math.min(
						best,
						(turns[i + 1]?.[k - 1] ?? 0) + (turns[k]?.[j] ?? 0),
					);
			}
			row[j] = best;
		}
	}

	return turns[0]?.[n - 1] ?? 0;
};
