/**
 * 1681. Minimum Incompatibility
 *
 * Splits `nums` (at most 16 elements) into `k` equal-sized groups with no
 * repeated value inside a group. Returns the smallest possible sum of each
 * group's maximum minus minimum, or -1 if no split exists.
 *
 * First find every valid group as a bitmask, with its incompatibility.
 * Then `best[mask]` is the cheapest way to split the elements in `mask`;
 * to avoid counting orders, a new group always contains the lowest
 * element not yet used.
 *
 * @see https://leetcode.com/problems/minimum-incompatibility/
 * @difficulty Hard
 * @timeComplexity O(3^n)
 * @spaceComplexity O(2^n)
 *
 * @example
 * minimumIncompatibility([6, 3, 8, 1, 3, 1, 2, 2], 4); // 6
 */
export const minimumIncompatibility = (
	nums: readonly number[],
	k: number,
): number => {
	const n = nums.length;
	const size = n / k;
	const full = (1 << n) - 1;
	const cost = new Int32Array(1 << n).fill(-1);
	for (let mask = 1; mask <= full; mask++) {
		const members = nums.filter((_, i) => mask & (1 << i));
		if (members.length !== size || new Set(members).size !== size) continue;
		cost[mask] = Math.max(...members) - Math.min(...members);
	}
	const best = new Array<number>(1 << n).fill(Infinity);
	best[0] = 0;
	for (let mask = 0; mask < full; mask++) {
		const current = best[mask] ?? Infinity;
		if (current === Infinity) continue;
		const rest = full ^ mask;
		const lowest = rest & -rest;
		const others = rest ^ lowest;
		for (let sub = others; ; sub = (sub - 1) & others) {
			const group = sub | lowest;
			const groupCost = cost[group] ?? -1;
			if (groupCost >= 0)
				best[mask | group] = Math.min(
					best[mask | group] ?? Infinity,
					current + groupCost,
				);
			if (sub === 0) break;
		}
	}
	const answer = best[full] ?? Infinity;
	return answer === Infinity ? -1 : answer;
};
