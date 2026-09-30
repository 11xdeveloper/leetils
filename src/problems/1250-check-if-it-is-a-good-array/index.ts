/**
 * 1250. Check If It Is a Good Array
 *
 * Returns whether some integer combination of the positive numbers in
 * `nums` adds up to 1.
 *
 * By Bézout's identity, the integer combinations of some numbers are
 * exactly the multiples of their greatest common divisor, so the array is
 * good when that divisor is 1.
 *
 * @see https://leetcode.com/problems/check-if-it-is-a-good-array/
 * @difficulty Hard
 * @timeComplexity O(n log(max))
 * @spaceComplexity O(1)
 *
 * @example
 * checkIfItIsAGoodArray([12, 5, 7, 23]); // true
 */
export const checkIfItIsAGoodArray = (nums: readonly number[]): boolean => {
	let divisor = 0;
	for (const num of nums) {
		let [a, b] = [divisor, num];
		while (b !== 0) [a, b] = [b, a % b];
		divisor = a;
		if (divisor === 1) return true;
	}
	return divisor === 1;
};
