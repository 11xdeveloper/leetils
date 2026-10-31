const MOD = 1_000_000_007;
const CREATURES = "FWE";

/**
 * 3320. Count The Number of Winning Sequences
 *
 * Alice summons the creatures in `s` (Fire Dragon, Water Serpent, Earth
 * Golem); Bob summons one per round too, never the same twice in a row.
 * Fire beats Earth, Water beats Fire and Earth beats Water. Returns how many
 * sequences give Bob more points than Alice, modulo 10⁹ + 7.
 *
 * Dynamic programming over rounds, Bob's last creature and the point
 * difference.
 *
 * @see https://leetcode.com/problems/count-the-number-of-winning-sequences/
 * @difficulty Hard
 * @timeComplexity O(n²)
 * @spaceComplexity O(n)
 *
 * @example
 * countTheNumberOfWinningSequences("FFF"); // 3
 */
export const countTheNumberOfWinningSequences = (s: string): number => {
	const n = s.length;
	const width = 2 * n + 1;
	// ways[last * width + diff + n]: Bob's sequences so far.
	let ways = new Float64Array(3 * width);
	const beats = (a: number, b: number): boolean => (a - b + 3) % 3 === 1;
	for (let round = 0; round < n; round++) {
		const alice = CREATURES.indexOf(s.charAt(round));
		const next = new Float64Array(3 * width);
		for (let bob = 0; bob < 3; bob++) {
			const gain = beats(bob, alice) ? 1 : beats(alice, bob) ? -1 : 0;
			if (round === 0) {
				next[bob * width + n + gain] = 1;
				continue;
			}
			for (let last = 0; last < 3; last++) {
				if (last === bob) continue;
				for (let diff = 0; diff < width; diff++) {
					const count = ways[last * width + diff] ?? 0;
					if (count === 0) continue;
					const at = bob * width + diff + gain;
					next[at] = ((next[at] ?? 0) + count) % MOD;
				}
			}
		}
		ways = next;
	}
	let total = 0;
	for (let last = 0; last < 3; last++)
		for (let diff = n + 1; diff < width; diff++)
			total = (total + (ways[last * width + diff] ?? 0)) % MOD;
	return total;
};
