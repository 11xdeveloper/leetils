/**
 * 3273. Minimum Amount of Damage Dealt to Bob
 *
 * Every second, each living enemy deals its `damage` to Bob, then Bob deals
 * `power` to one enemy of his choice. Returns the least total damage Bob
 * takes before all enemies are dead.
 *
 * Enemy i takes ⌈health / power⌉ seconds to kill. By an exchange argument,
 * kill a before b when damage[a] · time[b] > damage[b] · time[a]. Each enemy
 * then deals its damage for every second until its kill. The total is
 * added up exactly with BigInt, though LeetCode's JavaScript signature
 * returns a number.
 *
 * @see https://leetcode.com/problems/minimum-amount-of-damage-dealt-to-bob/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumAmountOfDamageDealtToBob(4, [1, 2, 3, 4], [4, 5, 6, 8]); // 39
 */
export const minimumAmountOfDamageDealtToBob = (
	power: number,
	damage: readonly number[],
	health: readonly number[],
): number => {
	const time = health.map((h) => Math.ceil(h / power));
	const order = damage
		.map((_, i) => i)
		.sort(
			(a, b) =>
				(damage[b] ?? 0) * (time[a] ?? 0) - (damage[a] ?? 0) * (time[b] ?? 0),
		);
	let elapsed = 0;
	let total = 0n;
	for (const i of order) {
		elapsed += time[i] ?? 0;
		total += BigInt(damage[i] ?? 0) * BigInt(elapsed);
	}
	return Number(total);
};
