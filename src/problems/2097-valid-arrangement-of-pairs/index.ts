/**
 * 2097. Valid Arrangement of Pairs
 *
 * Orders `pairs` so each pair's end equals the next pair's start. A valid
 * arrangement is guaranteed to exist.
 *
 * Treat pairs as directed edges and find an Eulerian path with
 * Hierholzer's algorithm, starting at the node with one more outgoing
 * than incoming edge if there is one.
 *
 * @see https://leetcode.com/problems/valid-arrangement-of-pairs/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * validArrangementOfPairs([[5, 1], [4, 5], [11, 9], [9, 4]]); // [[11, 9], [9, 4], [4, 5], [5, 1]]
 */
export const validArrangementOfPairs = (
	pairs: readonly (readonly number[])[],
): number[][] => {
	const outgoing = new Map<number, number[]>();
	const balance = new Map<number, number>();
	for (const [start = 0, end = 0] of pairs) {
		const ends = outgoing.get(start);
		if (ends) ends.push(end);
		else outgoing.set(start, [end]);
		balance.set(start, (balance.get(start) ?? 0) + 1);
		balance.set(end, (balance.get(end) ?? 0) - 1);
	}
	let first = pairs[0]?.[0] ?? 0;
	for (const [node, surplus] of balance) if (surplus === 1) first = node;

	const route: number[] = [];
	const stack = [first];
	while (stack.length) {
		const node = stack.at(-1) ?? 0;
		const next = outgoing.get(node)?.pop();
		if (next === undefined) route.push(stack.pop() ?? 0);
		else stack.push(next);
	}
	route.reverse();
	return route.slice(1).map((end, i) => [route[i] ?? 0, end]);
};
