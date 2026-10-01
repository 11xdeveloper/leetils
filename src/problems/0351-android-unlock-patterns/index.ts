/**
 * 351. Android Unlock Patterns
 *
 * Counts the valid unlock patterns on a 3×3 grid of dots numbered 1 to 9
 * that use between `m` and `n` dots. A pattern visits distinct dots, and a
 * line between two dots can only pass over the centre of a dot already
 * visited.
 *
 * Backtracking from each start. `between[a][b]` names the dot a line from
 * `a` to `b` passes over, if any. By symmetry, starting at 1, 3, 7 or 9
 * gives the same count, as do 2, 4, 6 and 8, so only 1, 2 and 5 are
 * searched.
 *
 * @see https://leetcode.com/problems/android-unlock-patterns/
 * @difficulty Medium
 * @timeComplexity O(9!), a constant
 * @spaceComplexity O(1)
 *
 * @example
 * androidUnlockPatterns(1, 2); // 65
 */
export const androidUnlockPatterns = (m: number, n: number): number => {
	const between = Array.from({ length: 10 }, () =>
		new Array<number>(10).fill(0),
	);
	for (const [a, b, over] of [
		[1, 3, 2],
		[4, 6, 5],
		[7, 9, 8],
		[1, 7, 4],
		[2, 8, 5],
		[3, 9, 6],
		[1, 9, 5],
		[3, 7, 5],
	] as const) {
		(between[a] ?? [])[b] = over;
		(between[b] ?? [])[a] = over;
	}

	const visited = new Array<boolean>(10).fill(false);
	const count = (dot: number, length: number): number => {
		let patterns = length >= m ? 1 : 0;
		if (length === n) return patterns;
		visited[dot] = true;
		for (let next = 1; next <= 9; next++) {
			const over = between[dot]?.[next] ?? 0;
			if (!visited[next] && (over === 0 || visited[over]))
				patterns += count(next, length + 1);
		}
		visited[dot] = false;
		return patterns;
	};

	return 4 * count(1, 1) + 4 * count(2, 1) + count(5, 1);
};
