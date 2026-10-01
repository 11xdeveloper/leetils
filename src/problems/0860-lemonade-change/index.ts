/**
 * 860. Lemonade Change
 *
 * Lemonade costs 5, and customers in line pay with 5, 10 or 20 bills.
 * Starting with no change, returns whether every customer can be given
 * correct change.
 *
 * Keeps count of 5s and 10s. A 20 is best changed with a 10 and a 5 when
 * possible, since 5s are more useful later.
 *
 * @see https://leetcode.com/problems/lemonade-change/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * lemonadeChange([5, 5, 5, 10, 20]); // true
 */
export const lemonadeChange = (bills: readonly number[]): boolean => {
	let fives = 0;
	let tens = 0;
	for (const bill of bills) {
		if (bill === 5) {
			fives++;
		} else if (bill === 10) {
			if (fives === 0) return false;
			fives--;
			tens++;
		} else if (tens > 0 && fives > 0) {
			tens--;
			fives--;
		} else if (fives >= 3) {
			fives -= 3;
		} else {
			return false;
		}
	}
	return true;
};
