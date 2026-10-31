/**
 * 3215. Count Triplets with Even XOR Set Bits II
 *
 * Count the triplets (one element from each of `a`, `b` and `c`) whose XOR
 * has an even number of set bits.
 *
 * The parity of the set bits of a XOR is the XOR of the parities, so count
 * the even and odd elements of each array and combine.
 *
 * @see https://leetcode.com/problems/count-triplets-with-even-xor-set-bits-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * countTripletsWithEvenXorSetBitsII([1], [2], [3]); // 1
 */
export const countTripletsWithEvenXorSetBitsII = (
	a: readonly number[],
	b: readonly number[],
	c: readonly number[],
): number => {
	const parities = (nums: readonly number[]): [even: number, odd: number] => {
		let odd = 0;
		for (const num of nums) {
			let bits = 0;
			for (let v = num; v; v &= v - 1) bits++;
			odd += bits & 1;
		}
		return [nums.length - odd, odd];
	};
	const [ea, oa] = parities(a);
	const [eb, ob] = parities(b);
	const [ec, oc] = parities(c);
	return ea * eb * ec + ea * ob * oc + oa * eb * oc + oa * ob * ec;
};
