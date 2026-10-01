/**
 * 1803. Count Pairs With XOR in a Range
 *
 * Counts the pairs `i < j` with `low ≤ nums[i] XOR nums[j] ≤ high`.
 *
 * A binary trie of earlier numbers, each node counting how many pass
 * through it, answers "how many earlier numbers XOR with x to below
 * limit" by walking the limit's bits: wherever the limit has a 1, every
 * number on the side matching x's bit gives a smaller XOR. The answer is
 * that count for `high + 1` minus for `low`.
 *
 * @see https://leetcode.com/problems/count-pairs-with-xor-in-a-range/
 * @difficulty Hard
 * @timeComplexity O(15n)
 * @spaceComplexity O(15n)
 *
 * @example
 * countPairsWithXorInARange([1, 4, 2, 7], 2, 6); // 6
 */
export const countPairsWithXorInARange = (
	nums: readonly number[],
	low: number,
	high: number,
): number => {
	const BITS = 15;
	// children[2 · node + bit] and counts[node]; node 0 is the root.
	const children: number[] = [0, 0];
	const counts: number[] = [0];
	const below = (x: number, limit: number) => {
		let [node, total] = [0, 0];
		for (let bit = BITS - 1; bit >= 0 && node !== -1; bit--) {
			const xBit = (x >> bit) & 1;
			if ((limit >> bit) & 1) {
				const same = children[2 * node + xBit] ?? 0;
				if (same) total += counts[same] ?? 0;
				node = children[2 * node + 1 - xBit] || -1;
			} else {
				node = children[2 * node + xBit] || -1;
			}
		}
		return total;
	};
	let pairs = 0;
	for (const num of nums) {
		pairs += below(num, high + 1) - below(num, low);
		let node = 0;
		for (let bit = BITS - 1; bit >= 0; bit--) {
			const slot = 2 * node + ((num >> bit) & 1);
			if (!children[slot]) {
				children[slot] = counts.length;
				counts.push(0);
				children.push(0, 0);
			}
			node = children[slot] ?? 0;
			counts[node] = (counts[node] ?? 0) + 1;
		}
	}
	return pairs;
};
