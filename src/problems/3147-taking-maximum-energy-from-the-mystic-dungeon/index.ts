/**
 * 3147. Taking Maximum Energy From the Mystic Dungeon
 *
 * Start at any magician, take their energy, jump `k` ahead, and repeat until
 * you fall off the end. Returns the most total energy.
 *
 * The total from i is `energy[i]` plus the total from i + k; fill these in
 * from the end and take the best.
 *
 * @see https://leetcode.com/problems/taking-maximum-energy-from-the-mystic-dungeon/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * takingMaximumEnergyFromTheMysticDungeon([5, 2, -10, -5, 1], 3); // 3
 */
export const takingMaximumEnergyFromTheMysticDungeon = (
	energy: readonly number[],
	k: number,
): number => {
	const n = energy.length;
	const total = new Float64Array(n);
	let best = Number.NEGATIVE_INFINITY;
	for (let i = n - 1; i >= 0; i--) {
		total[i] = (energy[i] ?? 0) + (i + k < n ? (total[i + k] ?? 0) : 0);
		best = Math.max(best, total[i] ?? 0);
	}
	return best;
};
