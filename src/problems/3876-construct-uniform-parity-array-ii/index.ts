/**
 * 3876. Construct Uniform Parity Array II
 *
 * Each `nums2[i]` is `nums1[i]`, or `nums1[i] - nums1[j]` for a smaller
 * `nums1[j]`. Whether `nums2` can be all odd or all even.
 *
 * All even needs every odd number to drop an odd smaller one, impossible
 * for the smallest odd, so there must be no odd numbers. All odd needs
 * every even number to drop a smaller odd one: the smallest odd must be
 * below every even number.
 *
 * @see https://leetcode.com/problems/construct-uniform-parity-array-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * constructUniformParityArrayII([2, 3]); // false
 */
export const constructUniformParityArrayII = (
	nums1: readonly number[],
): boolean => {
	let [oddLow, evenLow] = [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY];
	for (const x of nums1) {
		if (x % 2 === 1) oddLow = Math.min(oddLow, x);
		else evenLow = Math.min(evenLow, x);
	}
	return oddLow === Number.POSITIVE_INFINITY || oddLow < evenLow;
};
