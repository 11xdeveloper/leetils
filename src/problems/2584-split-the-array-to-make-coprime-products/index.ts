/**
 * 2584. Split the Array to Make Coprime Products
 *
 * Returns the smallest index `i` such that the product of `nums[0..i]`
 * and the product of the rest are coprime, or -1 if there is none.
 *
 * Note each prime's last occurrence. Scanning from the left, a split is
 * valid once every prime seen so far has no later occurrence.
 *
 * @see https://leetcode.com/problems/split-the-array-to-make-coprime-products/
 * @difficulty Hard
 * @timeComplexity O(n √m), where `m` is the largest number
 * @spaceComplexity O(n)
 *
 * @example
 * splitTheArrayToMakeCoprimeProducts([4, 7, 8, 15, 3, 5]); // 2
 */
export const splitTheArrayToMakeCoprimeProducts = (
	nums: readonly number[],
): number => {
	const primesOf = (x: number): number[] => {
		const primes: number[] = [];
		for (let p = 2; p * p <= x; p++)
			if (x % p === 0) {
				primes.push(p);
				while (x % p === 0) x /= p;
			}
		if (x > 1) primes.push(x);
		return primes;
	};
	const factors = nums.map(primesOf);
	const last = new Map<number, number>();
	for (const [i, primes] of factors.entries())
		for (const p of primes) last.set(p, i);

	let reach = 0;
	for (let i = 0; i < nums.length - 1; i++) {
		for (const p of factors[i] ?? []) reach = Math.max(reach, last.get(p) ?? 0);
		if (reach === i) return i;
	}
	return -1;
};
