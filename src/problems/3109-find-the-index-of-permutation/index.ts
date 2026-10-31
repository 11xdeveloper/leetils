const MOD = 1_000_000_007;

const multiply = (a: number, b: number): number =>
	(((a * Math.floor(b / 65536)) % MOD) * 65536 + a * (b % 65536)) % MOD;

/**
 * 3109. Find the Index of Permutation
 *
 * The 0-based position of the permutation `perm` of 1 to n among all
 * permutations of 1 to n in lexicographic order, modulo 10⁹ + 7.
 *
 * Each position contributes (unused values smaller than it) × (remaining
 * positions)!. Count unused smaller values with a Fenwick tree.
 *
 * @see https://leetcode.com/problems/find-the-index-of-permutation/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * findTheIndexOfPermutation([3, 1, 2]); // 4
 */
export const findTheIndexOfPermutation = (perm: readonly number[]): number => {
	const n = perm.length;
	const tree = new Int32Array(n + 1);
	const factorial = [1];
	for (let i = 1; i <= n; i++)
		factorial.push(multiply(factorial[i - 1] ?? 1, i));
	let index = 0;
	perm.forEach((value, i) => {
		let usedBelow = 0;
		for (let j = value - 1; j > 0; j -= j & -j) usedBelow += tree[j] ?? 0;
		index =
			(index + multiply(value - 1 - usedBelow, factorial[n - 1 - i] ?? 1)) %
			MOD;
		for (let j = value; j <= n; j += j & -j) tree[j] = (tree[j] ?? 0) + 1;
	});
	return index;
};
