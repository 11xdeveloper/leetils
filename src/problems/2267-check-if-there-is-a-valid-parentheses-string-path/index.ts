/**
 * 2267. Check if There Is a Valid Parentheses String Path
 *
 * Returns whether some path from the top-left to the bottom-right of the
 * parentheses `grid`, moving right or down, spells a valid parentheses
 * string.
 *
 * Track, for each cell, the set of open-bracket balances reachable there
 * without going negative.
 *
 * @see https://leetcode.com/problems/check-if-there-is-a-valid-parentheses-string-path/
 * @difficulty Hard
 * @timeComplexity O(m · n · (m + n))
 * @spaceComplexity O(n · (m + n))
 *
 * @example
 * checkIfThereIsAValidParenthesesStringPath([["(", "(", "("], [")", "(", ")"], ["(", "(", ")"], ["(", "(", ")"]]); // true
 */
export const checkIfThereIsAValidParenthesesStringPath = (
	grid: readonly (readonly string[])[],
): boolean => {
	const [m, n] = [grid.length, grid[0]?.length ?? 0];
	if ((m + n - 1) % 2) return false;
	const limit = m + n;
	let previous: Uint8Array[] = Array.from(
		{ length: n },
		() => new Uint8Array(limit + 1),
	);
	for (let r = 0; r < m; r++) {
		const current = Array.from({ length: n }, () => new Uint8Array(limit + 1));
		for (let c = 0; c < n; c++) {
			const step = grid[r]?.[c] === "(" ? 1 : -1;
			const reach = current[c] ?? new Uint8Array(0);
			if (r === 0 && c === 0) {
				if (step === 1) reach[1] = 1;
				continue;
			}
			const above = previous[c];
			const left = current[c - 1];
			for (let balance = 0; balance <= limit; balance++) {
				if (!above?.[balance] && !left?.[balance]) continue;
				const next = balance + step;
				if (next >= 0 && next <= limit) reach[next] = 1;
			}
		}
		previous = current;
	}
	return previous[n - 1]?.[0] === 1;
};
