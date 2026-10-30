/**
 * 2600. K Items With the Maximum Sum
 *
 * A bag holds `numOnes` items marked 1, `numZeros` marked 0 and
 * `numNegOnes` marked -1. Returns the largest sum of `k` items.
 *
 * Take the 1s first, then the 0s, then as many -1s as remain.
 *
 * @see https://leetcode.com/problems/k-items-with-the-maximum-sum/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * kItemsWithTheMaximumSum(3, 2, 0, 4); // 3
 */
export const kItemsWithTheMaximumSum = (
	numOnes: number,
	numZeros: number,
	_numNegOnes: number,
	k: number,
): number => {
	if (k <= numOnes) return k;
	if (k <= numOnes + numZeros) return numOnes;
	return numOnes - (k - numOnes - numZeros);
};
