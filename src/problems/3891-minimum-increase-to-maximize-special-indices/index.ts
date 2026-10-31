/**
 * 3891. Minimum Increase to Maximize Special Indices
 *
 * An inner index is special if it beats both neighbours; increments are
 * the only operation. Returns the fewest increments that make as many
 * indices special as possible.
 *
 * Special indices can't be adjacent, and making i special only needs
 * raising `nums[i]` above both neighbours, independently of the others.
 * So pick a largest set of non-adjacent inner indices of least total
 * cost, by dynamic programming on (count, cost).
 *
 * @see https://leetcode.com/problems/minimum-increase-to-maximize-special-indices/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumIncreaseToMaximizeSpecialIndices([5, 2, 1, 4, 3]); // 4
 */
export const minimumIncreaseToMaximizeSpecialIndices = (
	nums: readonly number[],
): number => {
	type Plan = readonly [count: number, cost: number];
	const better = (a: Plan, b: Plan): Plan =>
		a[0] > b[0] || (a[0] === b[0] && a[1] < b[1]) ? a : b;
	// skip: best with index i - 1 not special; take: with it special.
	let skip: Plan = [0, 0];
	let take: Plan = [Number.NEGATIVE_INFINITY, 0];
	for (let i = 1; i + 1 < nums.length; i++) {
		const need = Math.max(
			0,
			Math.max(nums[i - 1] ?? 0, nums[i + 1] ?? 0) + 1 - (nums[i] ?? 0),
		);
		[skip, take] = [better(skip, take), [skip[0] + 1, skip[1] + need]];
	}
	return better(skip, take)[1];
};
