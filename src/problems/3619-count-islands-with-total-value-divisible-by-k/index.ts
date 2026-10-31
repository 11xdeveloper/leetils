/**
 * 3619. Count Islands With Total Value Divisible by K
 *
 * Positive cells of `grid` joined up, down, left and right form islands.
 * Counts the islands whose values add up to a multiple of `k`.
 *
 * Flood-fill each island, summing as it goes.
 *
 * @see https://leetcode.com/problems/count-islands-with-total-value-divisible-by-k/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m · n)
 *
 * @example
 * countIslandsWithTotalValueDivisibleByK([[3, 0, 3, 0], [0, 3, 0, 3], [3, 0, 3, 0]], 3); // 6
 */
export const countIslandsWithTotalValueDivisibleByK = (
	grid: readonly (readonly number[])[],
	k: number,
): number => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	const seen = new Uint8Array(m * n);
	let count = 0;
	for (let r = 0; r < m; r++)
		for (let c = 0; c < n; c++) {
			if (seen[r * n + c] || !grid[r]?.[c]) continue;
			seen[r * n + c] = 1;
			const stack = [r * n + c];
			let sum = 0;
			while (stack.length > 0) {
				const cell = stack.pop() ?? 0;
				const [cr, cc] = [Math.floor(cell / n), cell % n];
				sum += grid[cr]?.[cc] ?? 0;
				for (const [nr, nc] of [
					[cr + 1, cc],
					[cr - 1, cc],
					[cr, cc + 1],
					[cr, cc - 1],
				] as const)
					if (
						nr >= 0 &&
						nc >= 0 &&
						nr < m &&
						nc < n &&
						!seen[nr * n + nc] &&
						grid[nr]?.[nc]
					) {
						seen[nr * n + nc] = 1;
						stack.push(nr * n + nc);
					}
			}
			if (sum % k === 0) count++;
		}
	return count;
};
