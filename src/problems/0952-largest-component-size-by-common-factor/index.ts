/**
 * 952. Largest Component Size by Common Factor
 *
 * The distinct positive `nums` are nodes, joined when they share a factor
 * greater than 1. Returns the size of the largest connected component.
 *
 * Union–find over numbers and primes: each number is joined with each of
 * its prime factors (found with a smallest-prime-factor sieve), so numbers
 * sharing a prime end up together.
 *
 * @see https://leetcode.com/problems/largest-component-size-by-common-factor/
 * @difficulty Hard
 * @timeComplexity O(M log log M + n log M) for the largest number M
 * @spaceComplexity O(M)
 *
 * @example
 * largestComponentSizeByCommonFactor([4, 6, 15, 35]); // 4
 */
export const largestComponentSizeByCommonFactor = (
	nums: readonly number[],
): number => {
	const max = Math.max(...nums);
	const smallestPrime = new Int32Array(max + 1);
	for (let i = 2; i <= max; i++) {
		if (smallestPrime[i]) continue;
		for (let multiple = i; multiple <= max; multiple += i)
			if (!smallestPrime[multiple]) smallestPrime[multiple] = i;
	}

	const parent = Int32Array.from({ length: max + 1 }, (_, i) => i);
	const find = (x: number): number => {
		while (parent[x] !== x) {
			const grandparent = parent[parent[x] ?? x] ?? x;
			parent[x] = grandparent;
			x = grandparent;
		}
		return x;
	};
	for (const num of nums) {
		for (let rest = num; rest > 1; ) {
			const prime = smallestPrime[rest] ?? rest;
			parent[find(num)] = find(prime);
			while (rest % prime === 0) rest /= prime;
		}
	}

	const sizes = new Map<number, number>();
	let largest = 0;
	for (const num of nums) {
		const root = find(num);
		const size = (sizes.get(root) ?? 0) + 1;
		sizes.set(root, size);
		largest = Math.max(largest, size);
	}
	return largest;
};
