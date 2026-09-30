/**
 * 887. Super Egg Drop
 *
 * With `k` identical eggs and a building of `n` floors, returns the fewest
 * drops that guarantee finding the highest floor an egg survives.
 *
 * Turns the question round: with `m` drops and `k` eggs, the most floors
 * that can be handled is `f(m, k) = f(m - 1, k - 1) + f(m - 1, k) + 1` (the
 * dropped egg either breaks, leaving the floors below, or survives, leaving
 * those above). The answer is the smallest `m` with `f(m, k) ≥ n`.
 *
 * @see https://leetcode.com/problems/super-egg-drop/
 * @difficulty Hard
 * @timeComplexity O(k · m) where m is the answer (at most n)
 * @spaceComplexity O(k)
 *
 * @example
 * superEggDrop(2, 6); // 3
 */
export const superEggDrop = (k: number, n: number): number => {
	const floors = new Array<number>(k + 1).fill(0);
	let drops = 0;
	while ((floors[k] ?? 0) < n) {
		drops++;
		for (let eggs = k; eggs >= 1; eggs--)
			floors[eggs] = (floors[eggs - 1] ?? 0) + (floors[eggs] ?? 0) + 1;
	}
	return drops;
};
