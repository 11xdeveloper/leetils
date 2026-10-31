/**
 * 3180. Maximum Total Reward Using Operations I
 *
 * Starting from a reward of 0, repeatedly pick an unpicked value greater
 * than the current reward and add it. Returns the largest reward possible.
 *
 * Picks happen in increasing order, and a value v can follow any reachable
 * reward below v, so the reward never reaches 2 · max. Keep a bitset of
 * reachable rewards and, for each distinct value v in order, copy the bits
 * below v up by v.
 *
 * @see https://leetcode.com/problems/maximum-total-reward-using-operations-i/
 * @difficulty Medium
 * @timeComplexity O(n log n + Σ v / 32), over distinct values v
 * @spaceComplexity O(max)
 *
 * @example
 * maximumTotalRewardUsingOperationsI([1, 6, 4, 3, 2]); // 11
 */
export const maximumTotalRewardUsingOperationsI = (
	rewardValues: readonly number[],
): number => {
	const values = [...new Set(rewardValues)].sort((a, b) => a - b);
	const max = values.at(-1) ?? 0;
	const words = new Uint32Array(((2 * max) >> 5) + 2);
	words[0] = 1;
	/** The 32 reachable bits starting at `start`, which may be negative. */
	const read = (start: number): number => {
		if (start <= -32) return 0;
		if (start < 0) return ((words[0] ?? 0) << -start) >>> 0;
		const word = start >> 5;
		const offset = start & 31;
		const low = (words[word] ?? 0) >>> offset;
		return offset === 0
			? low
			: (low | ((words[word + 1] ?? 0) << (32 - offset))) >>> 0;
	};
	for (const v of values)
		for (let word = v >> 5; word <= (2 * v - 1) >> 5; word++) {
			// Target bit q comes from source bit q - v, valid for v ≤ q < 2v.
			let bits = read(word * 32 - v);
			const from = Math.max(v - word * 32, 0);
			const to = Math.min(2 * v - word * 32, 32);
			const mask =
				to - from >= 32 ? 0xffffffff : (((1 << (to - from)) - 1) << from) >>> 0;
			bits = (bits & mask) >>> 0;
			words[word] = ((words[word] ?? 0) | bits) >>> 0;
		}
	for (let word = words.length - 1; word >= 0; word--) {
		const bits = words[word] ?? 0;
		if (bits) return word * 32 + 31 - Math.clz32(bits);
	}
	return 0;
};
