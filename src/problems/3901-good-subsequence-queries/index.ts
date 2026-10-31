/**
 * 3901. Good Subsequence Queries
 *
 * A subsequence is good if it's shorter than `nums` and its gcd is
 * exactly `p`. After each update `[i, value]`, check whether one exists;
 * returns how many checks succeed.
 *
 * Only multiples of p can take part, and taking all of them gives the
 * smallest gcd, kept in a segment tree. That works if it's p and they
 * aren't the whole array. If they are, some n - 1 of them must still have
 * gcd p, which only fails for n ≤ 7: if every element were essential,
 * each would be divisible by n - 1 distinct primes, too large past that.
 *
 * @see https://leetcode.com/problems/good-subsequence-queries/
 * @difficulty Hard
 * @timeComplexity O((n + q) log n log V)
 * @spaceComplexity O(n)
 *
 * @example
 * goodSubsequenceQueries([4, 8, 12, 16], 2, [[0, 3], [2, 6]]); // 1
 */
export const goodSubsequenceQueries = (
	nums: readonly number[],
	p: number,
	queries: readonly (readonly number[])[],
): number => {
	const n = nums.length;
	const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
	let size = 1;
	while (size < n) size *= 2;
	const tree = new Int32Array(2 * size);
	const set = (i: number, value: number): void => {
		let node = i + size;
		tree[node] = value % p === 0 ? value : 0;
		for (node >>= 1; node > 0; node >>= 1)
			tree[node] = gcd(tree[2 * node] ?? 0, tree[2 * node + 1] ?? 0);
	};
	const values = [...nums];
	values.forEach((value, i) => {
		set(i, value);
	});
	let multiples = values.filter((value) => value % p === 0).length;
	let good = 0;
	for (const [index = 0, value = 0] of queries) {
		multiples +=
			(value % p === 0 ? 1 : 0) - ((values[index] ?? 0) % p === 0 ? 1 : 0);
		values[index] = value;
		set(index, value);
		if (tree[1] !== p) continue;
		if (multiples < n || n >= 8) {
			good++;
			continue;
		}
		const found = values.some(
			(_, skip) =>
				values.reduce((g, x, i) => (i === skip ? g : gcd(g, x)), 0) === p,
		);
		if (found) good++;
	}
	return good;
};
