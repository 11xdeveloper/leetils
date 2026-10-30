/**
 * 2183. Count Array Pairs Divisible by K
 *
 * Counts the pairs `i < j` with `nums[i] · nums[j]` divisible by `k`.
 *
 * Only `gcd(num, k)` matters. Count the numbers by that gcd (a divisor of
 * `k`), then pair up gcds whose product is a multiple of `k`.
 *
 * @see https://leetcode.com/problems/count-array-pairs-divisible-by-k/
 * @difficulty Hard
 * @timeComplexity O(n log k + d^2) for d divisors of k
 * @spaceComplexity O(d)
 *
 * @example
 * countArrayPairsDivisibleByK([1, 2, 3, 4, 5], 2); // 7
 */
export const countArrayPairsDivisibleByK = (
	nums: readonly number[],
	k: number,
): number => {
	const gcd = (a: number, b: number): number => {
		while (b) [a, b] = [b, a % b];
		return a;
	};
	const byGcd = new Map<number, number>();
	for (const num of nums) {
		const g = gcd(num, k);
		byGcd.set(g, (byGcd.get(g) ?? 0) + 1);
	}
	const groups = [...byGcd];
	let pairs = 0;
	for (const [i, [a, countA]] of groups.entries()) {
		for (const [b, countB] of groups.slice(i)) {
			if ((a * b) % k) continue;
			pairs += a === b ? (countA * (countA - 1)) / 2 : countA * countB;
		}
	}
	return pairs;
};
