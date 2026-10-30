/**
 * 2614. Prime In Diagonal
 *
 * Returns the largest prime on either diagonal of a square matrix, or 0
 * if there is none.
 *
 * Test each diagonal value by trial division.
 *
 * @see https://leetcode.com/problems/prime-in-diagonal/
 * @difficulty Easy
 * @timeComplexity O(n √m), where `m` is the largest value
 * @spaceComplexity O(1)
 *
 * @example
 * primeInDiagonal([[1, 2, 3], [5, 17, 7], [9, 11, 10]]); // 17
 */
export const primeInDiagonal = (
	nums: readonly (readonly number[])[],
): number => {
	const isPrime = (x: number): boolean => {
		if (x < 2) return false;
		for (let d = 2; d * d <= x; d++) if (x % d === 0) return false;
		return true;
	};
	const n = nums.length;
	let best = 0;
	for (let i = 0; i < n; i++)
		for (const value of [nums[i]?.[i] ?? 0, nums[i]?.[n - 1 - i] ?? 0])
			if (value > best && isPrime(value)) best = value;
	return best;
};
