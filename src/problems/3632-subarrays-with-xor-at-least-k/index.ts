/**
 * 3632. Subarrays with XOR at Least K
 *
 * Counts the subarrays of `nums` whose XOR is at least `k`.
 *
 * A subarray's XOR is the XOR of two prefix XORs. Keep earlier prefixes in
 * a binary trie and, for each new prefix, walk k's bits from the top: where
 * k has a 0, every prefix that makes this bit 1 counts, then follow those
 * that keep it 0; where k has a 1, follow those that make it 1. Prefixes
 * matching k all the way count too.
 *
 * @see https://leetcode.com/problems/subarrays-with-xor-at-least-k/
 * @difficulty Hard
 * @timeComplexity O(n log V)
 * @spaceComplexity O(n log V)
 *
 * @example
 * subarraysWithXorAtLeastK([3, 1, 2, 3], 2); // 6
 */
export const subarraysWithXorAtLeastK = (
	nums: readonly number[],
	k: number,
): number => {
	const BITS = 30;
	const children: number[] = [0, 0];
	const counts: number[] = [0];
	const insert = (value: number): void => {
		let node = 0;
		counts[0] = (counts[0] ?? 0) + 1;
		for (let bit = BITS; bit >= 0; bit--) {
			const b = (value >> bit) & 1;
			if (!children[2 * node + b]) {
				children[2 * node + b] = counts.length;
				counts.push(0);
				children.push(0, 0);
			}
			node = children[2 * node + b] ?? 0;
			counts[node] = (counts[node] ?? 0) + 1;
		}
	};
	let total = 0;
	let prefix = 0;
	insert(0);
	for (const num of nums) {
		prefix ^= num;
		let node = 0;
		for (let bit = BITS; bit >= 0 && node >= 0; bit--) {
			const b = (prefix >> bit) & 1;
			if ((k >> bit) & 1) node = children[2 * node + (1 - b)] || -1;
			else {
				total += counts[children[2 * node + (1 - b)] || -1] ?? 0;
				node = children[2 * node + b] || -1;
			}
		}
		if (node >= 0) total += counts[node] ?? 0;
		insert(prefix);
	}
	return total;
};
