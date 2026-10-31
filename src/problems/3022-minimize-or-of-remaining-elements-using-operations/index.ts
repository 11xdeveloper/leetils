/**
 * 3022. Minimize OR of Remaining Elements Using Operations
 *
 * Up to `k` times, replace two neighbours with their bitwise AND. Returns
 * the smallest possible OR of what's left.
 *
 * Decide bits from the highest down, trying to force each one to zero
 * along with those already forced. Forcing a set of bits means splitting
 * the array into groups whose AND clears all of them, which costs one
 * operation per element merged into a group; greedily close each group as
 * soon as its AND clears the bits.
 *
 * @see https://leetcode.com/problems/minimize-or-of-remaining-elements-using-operations/
 * @difficulty Hard
 * @timeComplexity O(n log max)
 * @spaceComplexity O(1)
 *
 * @example
 * minimizeOrOfRemainingElementsUsingOperations([3, 5, 3, 2, 7], 2); // 3
 */
export const minimizeOrOfRemainingElementsUsingOperations = (
	nums: readonly number[],
	k: number,
): number => {
	let cleared = 0;
	for (let bit = 29; bit >= 0; bit--) {
		const target = cleared | (1 << bit);
		let operations = 0;
		let group = -1;
		for (const num of nums) {
			group &= num & target;
			if (group === 0) group = -1;
			else operations++;
		}
		if (operations <= k) cleared = target;
	}
	return (2 ** 30 - 1) & ~cleared;
};
