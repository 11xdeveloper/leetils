/**
 * 1434. Number of Ways to Wear Different Hats to Each Other
 *
 * Each of up to 10 people picks a hat (1–40) from their preferences, with
 * no two sharing. Returns the number of ways, modulo 10^9 + 7.
 *
 * Dynamic programming over hats, with the set of people already wearing one
 * as a bitmask: each hat goes to nobody or to one person who likes it and
 * has none yet.
 *
 * @see https://leetcode.com/problems/number-of-ways-to-wear-different-hats-to-each-other/
 * @difficulty Hard
 * @timeComplexity O(40 · 2^n · n)
 * @spaceComplexity O(2^n + 40n)
 *
 * @example
 * numberOfWaysToWearDifferentHatsToEachOther([[3, 5, 1], [3, 5]]); // 4
 */
export const numberOfWaysToWearDifferentHatsToEachOther = (
	hats: readonly (readonly number[])[],
): number => {
	const MOD = 1_000_000_007;
	const n = hats.length;
	const fans = Array.from({ length: 41 }, (): number[] => []);
	hats.forEach((liked, person) => {
		for (const hat of liked) fans[hat]?.push(person);
	});
	let ways = new Array<number>(1 << n).fill(0);
	ways[0] = 1;
	for (let hat = 1; hat <= 40; hat++) {
		const next = [...ways];
		ways.forEach((count, mask) => {
			if (count === 0) return;
			for (const person of fans[hat] ?? []) {
				if (mask & (1 << person)) continue;
				const to = mask | (1 << person);
				next[to] = ((next[to] ?? 0) + count) % MOD;
			}
		});
		ways = next;
	}
	return ways[(1 << n) - 1] ?? 0;
};
