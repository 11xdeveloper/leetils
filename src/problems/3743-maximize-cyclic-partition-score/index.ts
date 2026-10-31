/**
 * 3743. Maximize Cyclic Partition Score
 *
 * Split the circular array `nums` into at most `k` contiguous pieces, each
 * scoring its maximum minus its minimum. Returns the best total.
 *
 * A piece's score is the best single trade inside it, buying low and
 * selling high or the reverse, so on a line this is at most k
 * non-overlapping trades. Some best split cuts right before or right
 * after the global maximum: its piece can hand the elements on the far
 * side of the maximum from its minimum to the neighbouring piece without
 * losing anything. So solve the line from both of those starts.
 *
 * @see https://leetcode.com/problems/maximize-cyclic-partition-score/
 * @difficulty Hard
 * @timeComplexity O(n · k)
 * @spaceComplexity O(n + k)
 *
 * @example
 * maximizeCyclicPartitionScore([1, 2, 3, 3], 2); // 3
 */
export const maximizeCyclicPartitionScore = (
	nums: readonly number[],
	k: number,
): number => {
	const n = nums.length;
	const trades = Math.min(k, n);
	const NONE = Number.NEGATIVE_INFINITY;
	const line = (start: number): number => {
		let flat = new Array<number>(trades + 1).fill(NONE);
		let long = new Array<number>(trades + 1).fill(NONE);
		let short = new Array<number>(trades + 1).fill(NONE);
		flat[0] = 0;
		for (let step = 0; step < n; step++) {
			const price = nums[(start + step) % n] ?? 0;
			const nextFlat = flat.map((value, j) =>
				Math.max(value, (long[j] ?? NONE) + price, (short[j] ?? NONE) - price),
			);
			const nextLong = long.map((value, j) =>
				Math.max(value, j > 0 ? (flat[j - 1] ?? NONE) - price : NONE),
			);
			const nextShort = short.map((value, j) =>
				Math.max(value, j > 0 ? (flat[j - 1] ?? NONE) + price : NONE),
			);
			[flat, long, short] = [nextFlat, nextLong, nextShort];
		}
		return Math.max(...flat);
	};
	const top = nums.indexOf(Math.max(...nums));
	return Math.max(line(top), line((top + 1) % n));
};
