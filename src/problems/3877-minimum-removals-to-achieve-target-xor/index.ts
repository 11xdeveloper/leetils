/**
 * 3877. Minimum Removals to Achieve Target XOR
 *
 * The fewest elements to remove so the rest XOR to `target`, or -1.
 *
 * Keep the most elements: for each reachable XOR value, the largest
 * subset producing it, adding elements one at a time.
 *
 * @see https://leetcode.com/problems/minimum-removals-to-achieve-target-xor/
 * @difficulty Medium
 * @timeComplexity O(n · V)
 * @spaceComplexity O(V)
 *
 * @example
 * minimumRemovalsToAchieveTargetXor([1, 2, 3], 2); // 1
 */
export const minimumRemovalsToAchieveTargetXor = (
	nums: readonly number[],
	target: number,
): number => {
	let size = 1;
	while (size <= Math.max(target, ...nums)) size *= 2;
	let kept = new Int32Array(size).fill(-1);
	kept[0] = 0;
	for (const num of nums) {
		const next = Int32Array.from(kept);
		kept.forEach((count, x) => {
			if (count >= 0) next[x ^ num] = Math.max(next[x ^ num] ?? -1, count + 1);
		});
		kept = next;
	}
	const best = kept[target] ?? -1;
	return best < 0 ? -1 : nums.length - best;
};
