/**
 * 3695. Maximize Alternating Sum Using Swaps
 *
 * Swap elements at any listed pair of indices, any number of times, to
 * maximise the alternating sum (even indices added, odd subtracted).
 * Returns that maximum.
 *
 * Swaps can arrange each connected group of indices freely, so put the
 * group's largest values on its even indices.
 *
 * @see https://leetcode.com/problems/maximize-alternating-sum-using-swaps/
 * @difficulty Hard
 * @timeComplexity O(n log n + m α(n))
 * @spaceComplexity O(n)
 *
 * @example
 * maximizeAlternatingSumUsingSwaps([1, 2, 3], [[0, 2], [1, 2]]); // 4
 */
export const maximizeAlternatingSumUsingSwaps = (
	nums: readonly number[],
	swaps: readonly (readonly number[])[],
): number => {
	const n = nums.length;
	const parent = Array.from({ length: n }, (_, i) => i);
	const find = (x: number): number => {
		while (parent[x] !== x) {
			parent[x] = parent[parent[x] ?? x] ?? x;
			x = parent[x] ?? x;
		}
		return x;
	};
	for (const [a = 0, b = 0] of swaps) parent[find(a)] = find(b);
	const groups = new Map<number, { values: number[]; even: number }>();
	nums.forEach((num, i) => {
		const root = find(i);
		const group = groups.get(root) ?? { values: [], even: 0 };
		group.values.push(num);
		if (i % 2 === 0) group.even++;
		groups.set(root, group);
	});
	let total = 0;
	for (const { values, even } of groups.values()) {
		values.sort((a, b) => b - a);
		values.forEach((value, i) => {
			total += i < even ? value : -value;
		});
	}
	return total;
};
