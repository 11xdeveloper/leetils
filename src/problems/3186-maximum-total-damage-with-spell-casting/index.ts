/**
 * 3186. Maximum Total Damage With Spell Casting
 *
 * Cast spells with the given damage values, each at most once, but casting
 * damage d rules out every spell with damage d ± 1 or d ± 2. Returns the
 * largest total damage.
 *
 * Group equal damages (casting one, cast them all). Over the distinct
 * damages in order, either skip one or take its group plus the best total
 * among damages at least 3 below it.
 *
 * @see https://leetcode.com/problems/maximum-total-damage-with-spell-casting/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumTotalDamageWithSpellCasting([1, 1, 3, 4]); // 6
 */
export const maximumTotalDamageWithSpellCasting = (
	power: readonly number[],
): number => {
	const totals = new Map<number, number>();
	for (const damage of power)
		totals.set(damage, (totals.get(damage) ?? 0) + damage);
	const damages = [...totals.keys()].sort((a, b) => a - b);
	const best = new Float64Array(damages.length + 1);
	for (let i = 0, j = 0; i < damages.length; i++) {
		const damage = damages[i] ?? 0;
		while ((damages[j] ?? 0) < damage - 2) j++;
		best[i + 1] = Math.max(
			best[i] ?? 0,
			(best[j] ?? 0) + (totals.get(damage) ?? 0),
		);
	}
	return best[damages.length] ?? 0;
};
