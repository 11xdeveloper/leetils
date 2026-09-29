/**
 * 440. K-th Smallest in Lexicographical Order
 *
 * Returns the `k`th number, counting from 1, among 1 to `n` sorted in
 * lexicographic (dictionary) order.
 *
 * The numbers form a trie of digit prefixes, walked in preorder. From the
 * current prefix, it counts how many numbers up to `n` start with it, level
 * by level. If that's fewer than the steps left, the whole subtree is
 * skipped by moving to the next prefix; otherwise it descends into the
 * prefix's first child.
 *
 * @see https://leetcode.com/problems/k-th-smallest-in-lexicographical-order/
 * @difficulty Hard
 * @timeComplexity O(log^2 n)
 * @spaceComplexity O(1)
 *
 * @example
 * kThSmallestInLexicographicalOrder(13, 2); // 10: the order is 1, 10, 11, 12, 13, 2, …
 */
export const kThSmallestInLexicographicalOrder = (
	n: number,
	k: number,
): number => {
	const countWithPrefix = (prefix: number): number => {
		let count = 0;
		for (
			let low = prefix, high = prefix;
			low <= n;
			low *= 10, high = high * 10 + 9
		) {
			count += Math.min(n, high) - low + 1;
		}
		return count;
	};

	let current = 1;
	let remaining = k - 1;
	while (remaining > 0) {
		const count = countWithPrefix(current);
		if (count <= remaining) {
			remaining -= count;
			current++;
		} else {
			remaining--;
			current *= 10;
		}
	}

	return current;
};
