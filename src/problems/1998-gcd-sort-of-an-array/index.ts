/**
 * 1998. GCD Sort of an Array
 *
 * Elements sharing a factor greater than 1 may be swapped any number of
 * times. Returns whether `nums` can be sorted.
 *
 * Swappable elements form groups through shared primes: union each value
 * with its prime factors (from a smallest-prime-factor sieve). It's
 * sortable when every position's sorted value is in the same group as
 * its current value.
 *
 * @see https://leetcode.com/problems/gcd-sort-of-an-array/
 * @difficulty Hard
 * @timeComplexity O(M log log M + n log M) for the largest value M
 * @spaceComplexity O(M)
 *
 * @example
 * gcdSortOfAnArray([10, 5, 9, 3, 15]); // true
 */
export const gcdSortOfAnArray = (nums: readonly number[]): boolean => {
	const largest = Math.max(...nums);
	const smallestPrime = Array.from({ length: largest + 1 }, (_, i) => i);
	for (let p = 2; p * p <= largest; p++) {
		if (smallestPrime[p] !== p) continue;
		for (let multiple = p * p; multiple <= largest; multiple += p) {
			if (smallestPrime[multiple] === multiple) smallestPrime[multiple] = p;
		}
	}
	const parent = Array.from({ length: largest + 1 }, (_, i) => i);
	const find = (x: number) => {
		let root = x;
		while (parent[root] !== root) root = parent[root] ?? root;
		for (let node = x; node !== root; ) {
			const next = parent[node] ?? root;
			parent[node] = root;
			node = next;
		}
		return root;
	};
	for (const num of nums) {
		for (let rest = num; rest > 1; ) {
			const prime = smallestPrime[rest] ?? rest;
			parent[find(num)] = find(prime);
			while (rest % prime === 0) rest /= prime;
		}
	}
	const sorted = nums.toSorted((a, b) => a - b);
	return nums.every(
		(num, i) => num === sorted[i] || find(num) === find(sorted[i] ?? 0),
	);
};
