/**
 * 1787. Make the XOR of All Segments Equal to Zero
 *
 * Returns the fewest elements of `nums` (values below 2^10) to change so
 * every length-`k` segment XORs to 0.
 *
 * That forces `nums[i] = nums[i + k]`, so the array is determined by one
 * value per residue class `i mod k`, and those `k` values must XOR to 0.
 * Dynamic programming over the classes tracks the cheapest cost for each
 * running XOR: a class either keeps one of its existing values (costing
 * the elements that differ) or takes any value at all (costing every
 * element, from the cheapest previous state).
 *
 * @see https://leetcode.com/problems/make-the-xor-of-all-segments-equal-to-zero/
 * @difficulty Hard
 * @timeComplexity O(1024 · n)
 * @spaceComplexity O(1024 + n)
 *
 * @example
 * makeTheXorOfAllSegmentsEqualToZero([3, 4, 5, 2, 1, 7, 3, 4, 7], 3); // 3
 */
export const makeTheXorOfAllSegmentsEqualToZero = (
	nums: readonly number[],
	k: number,
): number => {
	const VALUES = 1024;
	let cost = new Array<number>(VALUES).fill(Infinity);
	cost[0] = 0;
	for (let residue = 0; residue < k; residue++) {
		const counts = new Map<number, number>();
		let size = 0;
		for (let i = residue; i < nums.length; i += k) {
			counts.set(nums[i] ?? 0, (counts.get(nums[i] ?? 0) ?? 0) + 1);
			size++;
		}
		const cheapest = Math.min(...cost);
		const next = new Array<number>(VALUES).fill(cheapest + size);
		for (let xor = 0; xor < VALUES; xor++) {
			for (const [value, count] of counts) {
				const candidate = (cost[xor ^ value] ?? Infinity) + size - count;
				if (candidate < (next[xor] ?? Infinity)) next[xor] = candidate;
			}
		}
		cost = next;
	}
	return cost[0] ?? 0;
};
