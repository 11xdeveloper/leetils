interface Scan {
	/** Partitions completed before the open one. */
	readonly done: number;
	/** Letters in the open partition, as a bitmask. */
	readonly mask: number;
	readonly size: number;
}

const bitCount = (mask: number): number => {
	let count = 0;
	for (let m = mask; m; m &= m - 1) count++;
	return count;
};

/**
 * 3003. Maximize the Number of Partitions After Operations
 *
 * Repeatedly cut off the longest prefix of `s` with at most `k` distinct
 * letters until `s` is empty. Returns the most cuts possible after changing
 * at most one letter of `s` first.
 *
 * The greedy cuts give the fewest partitions with at most `k` distinct
 * letters each, so scanning from either end gives the same count. Scan the
 * prefix before each index from the left and the suffix after it from the
 * right, keeping the completed partitions and the open one's letters. The
 * changed letter then either sits alone between two full partitions (when
 * both open ones already hold `k` letters and some letter is unused), joins
 * everything into one partition (when it all fits in `k` letters), or adds
 * nothing.
 *
 * @see https://leetcode.com/problems/maximize-the-number-of-partitions-after-operations/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximizeTheNumberOfPartitionsAfterOperations("accca", 2); // 3
 */
export const maximizeTheNumberOfPartitionsAfterOperations = (
	s: string,
	k: number,
): number => {
	const n = s.length;
	const scan = (order: number[]): Scan[] => {
		const result: Scan[] = [];
		let state: Scan = { done: 0, mask: 0, size: 0 };
		for (const i of order) {
			result[i] = state;
			const bit = 1 << (s.charCodeAt(i) - 97);
			if (state.mask & bit) continue;
			state =
				state.size + 1 > k
					? { done: state.done + 1, mask: bit, size: 1 }
					: { done: state.done, mask: state.mask | bit, size: state.size + 1 };
		}
		return result;
	};
	const indices = Array.from({ length: n }, (_, i) => i);
	const left = scan(indices);
	const right = scan(indices.toReversed());
	let best = 0;
	for (let i = 0; i < n; i++) {
		const l = left[i] ?? { done: 0, mask: 0, size: 0 };
		const r = right[i] ?? { done: 0, mask: 0, size: 0 };
		let partitions = l.done + r.done + 2;
		const together = bitCount(l.mask | r.mask);
		if (l.size === k && r.size === k && together < 26) partitions++;
		else if (Math.min(together + 1, 26) <= k) partitions--;
		best = Math.max(best, partitions);
	}
	return best;
};
