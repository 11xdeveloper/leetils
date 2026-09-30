/**
 * 1013. Partition Array Into Three Parts With Equal Sum
 *
 * Returns whether `arr` can be cut into three non-empty consecutive parts
 * with equal sums.
 *
 * Each part must sum to a third of the total. Scanning prefix sums, it
 * greedily closes a part each time the running sum reaches that; finding
 * two such cuts before the last element is enough.
 *
 * @see https://leetcode.com/problems/partition-array-into-three-parts-with-equal-sum/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * partitionArrayIntoThreePartsWithEqualSum([0, 2, 1, -6, 6, -7, 9, 1, 2, 0, 1]); // true
 */
export const partitionArrayIntoThreePartsWithEqualSum = (
	arr: readonly number[],
): boolean => {
	const total = arr.reduce((a, b) => a + b, 0);
	if (total % 3 !== 0) return false;
	let running = 0;
	let parts = 0;
	for (let i = 0; i < arr.length - 1 && parts < 2; i++) {
		running += arr[i] ?? 0;
		if (running === ((parts + 1) * total) / 3) parts++;
	}
	return parts === 2;
};
