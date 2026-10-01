/**
 * 1269. Number of Ways to Stay in the Same Place After Some Steps
 *
 * A pointer starts at index 0 of an array of length `arrLen` and each step
 * moves left, moves right or stays, never leaving the array. Returns how
 * many ways it can be back at index 0 after `steps` steps, modulo 10^9 + 7.
 *
 * Dynamic programming over positions, one step at a time. The pointer must
 * be able to walk back, so it never goes past index `steps / 2`, which
 * bounds the positions to track however long the array is.
 *
 * @see https://leetcode.com/problems/number-of-ways-to-stay-in-the-same-place-after-some-steps/
 * @difficulty Hard
 * @timeComplexity O(steps · min(steps, arrLen))
 * @spaceComplexity O(min(steps, arrLen))
 *
 * @example
 * numberOfWaysToStayInTheSamePlaceAfterSomeSteps(3, 2); // 4
 */
export const numberOfWaysToStayInTheSamePlaceAfterSomeSteps = (
	steps: number,
	arrLen: number,
): number => {
	const MOD = 1_000_000_007;
	const width = Math.min(arrLen, Math.floor(steps / 2) + 1);
	let ways = new Array<number>(width).fill(0);
	ways[0] = 1;
	for (let step = 0; step < steps; step++) {
		ways = ways.map(
			(stay, i) => (stay + (ways[i - 1] ?? 0) + (ways[i + 1] ?? 0)) % MOD,
		);
	}
	return ways[0] ?? 0;
};
