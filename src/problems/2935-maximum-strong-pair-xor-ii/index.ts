const BITS = 20;

/**
 * 2935. Maximum Strong Pair XOR II
 *
 * A pair `x, y` (possibly the same element twice) is strong if
 * `|x - y| <= min(x, y)`. Returns the largest XOR of a strong pair, for
 * arrays too long to check every pair.
 *
 * With `x <= y`, strong means `y <= 2x`. Sort, slide a window of partners
 * for each `y`, and keep the window in a binary trie with counts so the
 * best XOR is a greedy walk.
 *
 * @see https://leetcode.com/problems/maximum-strong-pair-xor-ii/
 * @difficulty Hard
 * @timeComplexity O(n log n + n · 20)
 * @spaceComplexity O(n · 20)
 *
 * @example
 * maximumStrongPairXorII([500, 520, 2500, 3000]); // 1020
 */
export const maximumStrongPairXorII = (nums: readonly number[]): number => {
	const sorted = nums.toSorted((a, b) => a - b);
	// Node i's children are at children[2i] and children[2i + 1]; 0 means none.
	const children = [0, 0];
	const counts = [0];
	const update = (value: number, change: number): void => {
		let node = 0;
		for (let bit = BITS - 1; bit >= 0; bit--) {
			const slot = 2 * node + ((value >> bit) & 1);
			if (!children[slot]) {
				children[slot] = counts.length;
				counts.push(0);
				children.push(0, 0);
			}
			node = children[slot] ?? 0;
			counts[node] = (counts[node] ?? 0) + change;
		}
	};
	const bestXor = (value: number): number => {
		let node = 0;
		let xor = 0;
		for (let bit = BITS - 1; bit >= 0; bit--) {
			const want = 1 - ((value >> bit) & 1);
			const preferred = children[2 * node + want] ?? 0;
			if (preferred && (counts[preferred] ?? 0) > 0) {
				xor |= 1 << bit;
				node = preferred;
			} else node = children[2 * node + (1 - want)] ?? 0;
		}
		return xor;
	};

	let best = 0;
	let left = 0;
	for (const y of sorted) {
		update(y, 1);
		while (2 * (sorted[left] ?? 0) < y) update(sorted[left++] ?? 0, -1);
		best = Math.max(best, bestXor(y));
	}
	return best;
};
