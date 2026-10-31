/**
 * 3785. Minimum Swaps to Avoid Forbidden Values
 *
 * Swap elements of `nums` (any two positions) until no `nums[i]` equals
 * `forbidden[i]`. Returns the fewest swaps, or -1.
 *
 * Only the bad positions, where they're equal, need to move. Two bad
 * positions with different values fix each other in one swap. If one
 * value v fills more than half the bad positions, its leftovers each need
 * a swap with a good position that neither holds v nor forbids it.
 *
 * @see https://leetcode.com/problems/minimum-swaps-to-avoid-forbidden-values/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumSwapsToAvoidForbiddenValues([1, 2, 3], [3, 2, 1]); // 1
 */
export const minimumSwapsToAvoidForbiddenValues = (
	nums: readonly number[],
	forbidden: readonly number[],
): number => {
	const badByValue = new Map<number, number>();
	let bad = 0;
	nums.forEach((num, i) => {
		if (num === forbidden[i]) {
			bad++;
			badByValue.set(num, (badByValue.get(num) ?? 0) + 1);
		}
	});
	if (bad === 0) return 0;
	let [worst, worstValue] = [0, 0];
	for (const [value, count] of badByValue)
		if (count > worst) [worst, worstValue] = [count, value];
	if (2 * worst <= bad) return Math.ceil(bad / 2);
	let helpers = 0;
	nums.forEach((num, i) => {
		if (
			num !== forbidden[i] &&
			num !== worstValue &&
			forbidden[i] !== worstValue
		)
			helpers++;
	});
	return helpers >= 2 * worst - bad ? worst : -1;
};
