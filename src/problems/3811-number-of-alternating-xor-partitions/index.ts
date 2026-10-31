const MOD = 1_000_000_007;

/**
 * 3811. Number of Alternating XOR Partitions
 *
 * Counts the ways to cut `nums` into blocks whose XORs alternate
 * `target1`, `target2`, `target1`, …, modulo 1e9+7.
 *
 * A block from j to i has XOR P[i] ^ P[j] for prefix XORs P. Count
 * partitions of each prefix by the parity of their block count, summed
 * per prefix XOR, so each new prefix looks up the matching earlier ones.
 *
 * @see https://leetcode.com/problems/number-of-alternating-xor-partitions/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfAlternatingXorPartitions([1, 0, 0], 1, 0); // 3
 */
export const numberOfAlternatingXorPartitions = (
	nums: readonly number[],
	target1: number,
	target2: number,
): number => {
	// even[x]: partitions with an even number of blocks of prefixes with XOR x (the empty prefix counts).
	const even = new Map<number, number>([[0, 1]]);
	const odd = new Map<number, number>();
	let prefix = 0;
	let [lastOdd, lastEven] = [0, 0];
	for (const num of nums) {
		prefix ^= num;
		lastOdd = even.get(prefix ^ target1) ?? 0;
		lastEven = odd.get(prefix ^ target2) ?? 0;
		odd.set(prefix, ((odd.get(prefix) ?? 0) + lastOdd) % MOD);
		even.set(prefix, ((even.get(prefix) ?? 0) + lastEven) % MOD);
	}
	return (lastOdd + lastEven) % MOD;
};
