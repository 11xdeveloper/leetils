const DIRECTIONS = [
	[0, 1],
	[1, 1],
	[1, 0],
	[1, -1],
	[0, -1],
	[-1, -1],
	[-1, 0],
	[-1, 1],
];

const isPrime = (num: number): boolean => {
	if (num < 2) return false;
	for (let d = 2; d * d <= num; d++) if (num % d === 0) return false;
	return true;
};

/**
 * 3044. Most Frequent Prime
 *
 * From each cell of a digit grid, walk in each of the eight directions,
 * reading off a number after every step. Returns the prime above 10 read
 * most often (the largest on a tie), or -1 if there is none.
 *
 * Generate every such number, count the primes and pick the best.
 *
 * @see https://leetcode.com/problems/most-frequent-prime/
 * @difficulty Medium
 * @timeComplexity O(m · n · max(m, n) · √V), for numbers up to V
 * @spaceComplexity O(m · n · max(m, n))
 *
 * @example
 * mostFrequentPrime([[9, 7, 8], [4, 6, 5], [2, 8, 6]]); // 97
 */
export const mostFrequentPrime = (
	mat: readonly (readonly number[])[],
): number => {
	const counts = new Map<number, number>();
	for (let r = 0; r < mat.length; r++)
		for (let c = 0; c < (mat[r]?.length ?? 0); c++)
			for (const [dr = 0, dc = 0] of DIRECTIONS) {
				let num = mat[r]?.[c] ?? 0;
				for (
					let i = r + dr, j = c + dc;
					mat[i]?.[j] !== undefined;
					i += dr, j += dc
				) {
					num = num * 10 + (mat[i]?.[j] ?? 0);
					if (num > 10 && isPrime(num))
						counts.set(num, (counts.get(num) ?? 0) + 1);
				}
			}
	let best = -1;
	let bestCount = 0;
	for (const [prime, count] of counts)
		if (count > bestCount || (count === bestCount && prime > best)) {
			best = prime;
			bestCount = count;
		}
	return best;
};
