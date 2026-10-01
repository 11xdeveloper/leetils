/**
 * 1664. Ways to Make a Fair Array
 *
 * Counts the indices whose removal leaves `nums` with equal sums at even
 * and odd indices.
 *
 * Removing index `i` swaps the parity of every later element, so compare
 * the even sum before `i` plus the odd sum after it with the reverse,
 * using running totals.
 *
 * @see https://leetcode.com/problems/ways-to-make-a-fair-array/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * waysToMakeAFairArray([2, 1, 6, 4]); // 1
 */
export const waysToMakeAFairArray = (nums: readonly number[]): number => {
	let [evenAfter, oddAfter] = [0, 0];
	for (const [i, num] of nums.entries()) {
		if (i % 2 === 0) evenAfter += num;
		else oddAfter += num;
	}
	let [evenBefore, oddBefore, ways] = [0, 0, 0];
	for (const [i, num] of nums.entries()) {
		if (i % 2 === 0) evenAfter -= num;
		else oddAfter -= num;
		if (evenBefore + oddAfter === oddBefore + evenAfter) ways++;
		if (i % 2 === 0) evenBefore += num;
		else oddBefore += num;
	}
	return ways;
};
