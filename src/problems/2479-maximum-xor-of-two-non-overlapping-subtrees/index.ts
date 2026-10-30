/**
 * 2479. Maximum XOR of Two Non-Overlapping Subtrees
 *
 * Picks two nodes of a tree rooted at 0 whose subtrees don't overlap.
 * Returns the largest XOR of their subtree value sums, or 0.
 *
 * In a depth-first search, the subtrees finished before a node is entered
 * are exactly those disjoint from it. Query each subtree sum against a
 * binary trie of those, inserting each sum once its subtree is done. Sums
 * reach about 2^46, so bits are read arithmetically.
 *
 * @see https://leetcode.com/problems/maximum-xor-of-two-non-overlapping-subtrees/
 * @difficulty Hard
 * @timeComplexity O(n · B) for B = 47 bits
 * @spaceComplexity O(n · B)
 *
 * @example
 * maximumXorOfTwoNonOverlappingSubtrees(6, [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5]], [2, 8, 3, 6, 2, 5]); // 24
 */
export const maximumXorOfTwoNonOverlappingSubtrees = (
	n: number,
	edges: readonly (readonly number[])[],
	values: readonly number[],
): number => {
	const BITS = 47;
	const neighbours: number[][] = Array.from({ length: n }, () => []);
	for (const [a = 0, b = 0] of edges) {
		neighbours[a]?.push(b);
		neighbours[b]?.push(a);
	}
	const parent = new Array<number>(n).fill(-1);
	const order = [0];
	for (let head = 0; head < order.length; head++) {
		const node = order[head] ?? 0;
		for (const next of neighbours[node] ?? []) {
			if (next === parent[node]) continue;
			parent[next] = node;
			order.push(next);
		}
	}
	const sums = [...values];
	for (const node of order.toReversed()) {
		const up = parent[node] ?? -1;
		if (up !== -1) sums[up] = (sums[up] ?? 0) + (sums[node] ?? 0);
	}

	const children = [new Int32Array(2)];
	const bitOf = (value: number, bit: number): number =>
		Math.floor(value / 2 ** bit) % 2;
	const insert = (value: number): void => {
		let node = 0;
		for (let bit = BITS - 1; bit >= 0; bit--) {
			const b = bitOf(value, bit);
			const slots = children[node] ?? new Int32Array(2);
			if (!slots[b]) {
				slots[b] = children.length;
				children.push(new Int32Array(2));
			}
			node = slots[b] ?? 0;
		}
	};
	const bestXor = (value: number): number => {
		if (children.length === 1) return 0;
		let [node, result] = [0, 0];
		for (let bit = BITS - 1; bit >= 0; bit--) {
			const want = 1 - bitOf(value, bit);
			const slots = children[node] ?? new Int32Array(2);
			if (slots[want]) {
				result += 2 ** bit;
				node = slots[want] ?? 0;
			} else node = slots[1 - want] ?? 0;
		}
		return result;
	};

	let best = 0;
	const stack: [node: number, done: boolean][] = [[0, false]];
	for (let entry = stack.pop(); entry; entry = stack.pop()) {
		const [node, done] = entry;
		if (done) {
			insert(sums[node] ?? 0);
			continue;
		}
		best = Math.max(best, bestXor(sums[node] ?? 0));
		stack.push([node, true]);
		for (const next of neighbours[node] ?? [])
			if (next !== parent[node]) stack.push([next, false]);
	}
	return best;
};
