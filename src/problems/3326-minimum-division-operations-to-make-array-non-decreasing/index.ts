/**
 * 3326. Minimum Division Operations to Make Array Non Decreasing
 *
 * An operation divides an element by its greatest proper divisor, which
 * leaves its smallest prime factor. Returns the fewest operations to make
 * `nums` non-decreasing, or -1.
 *
 * Work from the right, keeping each element as large as possible: only
 * reduce an element if it's bigger than the next, and one reduction is all
 * that can help, since a prime can't shrink further.
 *
 * @see https://leetcode.com/problems/minimum-division-operations-to-make-array-non-decreasing/
 * @difficulty Medium
 * @timeComplexity O(V log log V + n), for values up to V
 * @spaceComplexity O(V)
 *
 * @example
 * minimumDivisionOperationsToMakeArrayNonDecreasing([25, 7]); // 1
 */
export const minimumDivisionOperationsToMakeArrayNonDecreasing = (
	nums: readonly number[],
): number => {
	const max = Math.max(...nums);
	const smallestFactor = new Int32Array(max + 1);
	for (let p = 2; p <= max; p++) {
		if (smallestFactor[p]) continue;
		for (let multiple = p; multiple <= max; multiple += p)
			if (!smallestFactor[multiple]) smallestFactor[multiple] = p;
	}
	let operations = 0;
	let next = Number.POSITIVE_INFINITY;
	for (let i = nums.length - 1; i >= 0; i--) {
		let value = nums[i] ?? 0;
		if (value > next) {
			value = smallestFactor[value] ?? value;
			operations++;
			if (value > next) return -1;
		}
		next = value;
	}
	return operations;
};
