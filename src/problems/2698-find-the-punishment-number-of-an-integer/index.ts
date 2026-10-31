/**
 * 2698. Find the Punishment Number of an Integer
 *
 * The punishment number of `n` sums `i²` over the `i` from 1 to `n` whose
 * square's decimal digits can be cut into pieces summing to `i`. Returns
 * it.
 *
 * Squares have at most 7 digits, so try every way of cutting each.
 *
 * @see https://leetcode.com/problems/find-the-punishment-number-of-an-integer/
 * @difficulty Medium
 * @timeComplexity O(n · 2⁶)
 * @spaceComplexity O(1)
 *
 * @example
 * findThePunishmentNumberOfAnInteger(10); // 182
 */
export const findThePunishmentNumberOfAnInteger = (n: number): number => {
	const splits = (rest: number, target: number): boolean => {
		if (rest === target) return true;
		if (rest < target || target < 0) return false;
		for (let power = 10; power <= rest; power *= 10)
			if (splits(Math.floor(rest / power), target - (rest % power)))
				return true;
		return false;
	};
	let total = 0;
	for (let i = 1; i <= n; i++) if (splits(i * i, i)) total += i * i;
	return total;
};
