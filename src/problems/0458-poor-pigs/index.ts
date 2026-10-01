/**
 * 458. Poor Pigs
 *
 * One of `buckets` buckets is poisoned, and a pig that drinks it dies
 * `minutesToDie` minutes later. Returns the fewest pigs needed to find the
 * bucket within `minutesToTest` minutes.
 *
 * With `t = ⌊minutesToTest / minutesToDie⌋` rounds, each pig has `t + 1`
 * outcomes: it dies in one of the rounds or survives. So `p` pigs tell apart
 * `(t + 1)^p` buckets, arranged as a `p`-dimensional grid with one pig per
 * dimension. The answer is the smallest `p` where that covers `buckets`.
 *
 * @see https://leetcode.com/problems/poor-pigs/
 * @difficulty Hard
 * @timeComplexity O(log buckets)
 * @spaceComplexity O(1)
 *
 * @example
 * poorPigs(4, 15, 30); // 2
 */
export const poorPigs = (
	buckets: number,
	minutesToDie: number,
	minutesToTest: number,
): number => {
	const outcomes = Math.floor(minutesToTest / minutesToDie) + 1;
	let pigs = 0;
	for (let covered = 1; covered < buckets; covered *= outcomes) pigs++;
	return pigs;
};
