/**
 * 1707. Maximum XOR With an Element From Array
 *
 * For each query `[x, m]`, returns the largest `x XOR nums[j]` over
 * elements `nums[j] ≤ m`, or -1 if there are none.
 *
 * Offline: sort the numbers and the queries by `m`, insert numbers into a
 * binary trie as they become allowed, and greedily walk the trie choosing
 * the opposite bit of `x` where possible.
 *
 * @see https://leetcode.com/problems/maximum-xor-with-an-element-from-array/
 * @difficulty Hard
 * @timeComplexity O((n + q) · 30 + n log n + q log q)
 * @spaceComplexity O(30n)
 *
 * @example
 * maximumXorWithAnElementFromArray([0, 1, 2, 3, 4], [[3, 1], [1, 3], [5, 6]]); // [3, 3, 7]
 */
export const maximumXorWithAnElementFromArray = (
	nums: readonly number[],
	queries: readonly (readonly number[])[],
): number[] => {
	const BITS = 30;
	// children[2 · node + bit]; node 0 is the root.
	const children: number[] = [0, 0];
	const insert = (value: number) => {
		let node = 0;
		for (let bit = BITS - 1; bit >= 0; bit--) {
			const slot = 2 * node + ((value >> bit) & 1);
			if (!children[slot]) {
				children[slot] = children.length / 2;
				children.push(0, 0);
			}
			node = children[slot] ?? 0;
		}
	};
	const sorted = nums.toSorted((a, b) => a - b);
	const order = queries
		.map((_, i) => i)
		.sort((i, j) => (queries[i]?.[1] ?? 0) - (queries[j]?.[1] ?? 0));
	const answer = new Array<number>(queries.length).fill(-1);
	let next = 0;
	for (const i of order) {
		const [x = 0, m = 0] = queries[i] ?? [];
		for (; next < sorted.length && (sorted[next] ?? 0) <= m; next++)
			insert(sorted[next] ?? 0);
		if (next === 0) continue;
		let [node, best] = [0, 0];
		for (let bit = BITS - 1; bit >= 0; bit--) {
			const wanted = 1 - ((x >> bit) & 1);
			const preferred = children[2 * node + wanted] ?? 0;
			if (preferred) {
				best |= 1 << bit;
				node = preferred;
			} else {
				node = children[2 * node + 1 - wanted] ?? 0;
			}
		}
		answer[i] = best;
	}
	return answer;
};
