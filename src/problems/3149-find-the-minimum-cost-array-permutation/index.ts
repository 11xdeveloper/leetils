/**
 * 3149. Find the Minimum Cost Array Permutation
 *
 * For a permutation `nums` of 0 to n - 1, find the permutation `perm`
 * minimising Σ |perm[i] - nums[perm[i + 1]]| taken cyclically, returning
 * the lexicographically smallest on a tie.
 *
 * The score is unchanged by rotation, so the smallest permutation starts at
 * 0. Bitmask dynamic programming gives the cheapest way to finish from
 * every (visited set, last element), and following it greedily, always
 * picking the smallest next element that stays optimal, builds the answer.
 *
 * @see https://leetcode.com/problems/find-the-minimum-cost-array-permutation/
 * @difficulty Hard
 * @timeComplexity O(2ⁿ · n²)
 * @spaceComplexity O(2ⁿ · n)
 *
 * @example
 * findTheMinimumCostArrayPermutation([1, 0, 2]); // [0, 1, 2]
 */
export const findTheMinimumCostArrayPermutation = (
	nums: readonly number[],
): number[] => {
	const n = nums.length;
	const full = (1 << n) - 1;
	const finish = new Float64Array((1 << n) * n).fill(Number.POSITIVE_INFINITY);
	const at = (mask: number, last: number): number => mask * n + last;
	const step = (last: number, next: number): number =>
		Math.abs(last - (nums[next] ?? 0));
	for (let last = 0; last < n; last++) finish[at(full, last)] = step(last, 0);
	for (let mask = full - 1; mask > 0; mask--) {
		if (!(mask & 1)) continue;
		for (let last = 0; last < n; last++) {
			if (!((mask >> last) & 1)) continue;
			let best = Number.POSITIVE_INFINITY;
			for (let next = 0; next < n; next++)
				if (!((mask >> next) & 1))
					best = Math.min(
						best,
						step(last, next) + (finish[at(mask | (1 << next), next)] ?? 0),
					);
			finish[at(mask, last)] = best;
		}
	}
	const perm = [0];
	for (let mask = 1, last = 0; mask !== full; ) {
		const target = finish[at(mask, last)] ?? 0;
		for (let next = 0; next < n; next++)
			if (
				!((mask >> next) & 1) &&
				step(last, next) + (finish[at(mask | (1 << next), next)] ?? 0) ===
					target
			) {
				perm.push(next);
				mask |= 1 << next;
				last = next;
				break;
			}
	}
	return perm;
};
