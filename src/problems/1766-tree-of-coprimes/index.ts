/**
 * 1766. Tree of Coprimes
 *
 * In a tree rooted at 0 with values `nums[i] ≤ 50`, returns for each node
 * its nearest ancestor whose value is coprime with its own, or -1.
 *
 * Depth-first search (explicit stack) keeping, for each value 1–50, the
 * deepest ancestor on the current path holding it. A node checks the
 * ancestors of the values coprime with its own and takes the deepest.
 *
 * @see https://leetcode.com/problems/tree-of-coprimes/
 * @difficulty Hard
 * @timeComplexity O(50 · n)
 * @spaceComplexity O(50 · n)
 *
 * @example
 * treeOfCoprimes([2, 3, 3, 2], [[0, 1], [1, 2], [1, 3]]); // [-1, 0, 0, 1]
 */
export const treeOfCoprimes = (
	nums: readonly number[],
	edges: readonly (readonly number[])[],
): number[] => {
	const n = nums.length;
	const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
	const coprimes = Array.from({ length: 51 }, (_, a) =>
		Array.from({ length: 50 }, (_, i) => i + 1).filter(
			(b) => a > 0 && gcd(a, b) === 1,
		),
	);
	const neighbours: number[][] = Array.from({ length: n }, () => []);
	for (const [u = 0, v = 0] of edges) {
		neighbours[u]?.push(v);
		neighbours[v]?.push(u);
	}
	// path[value] is a stack of [node, depth] for ancestors holding that value.
	const path: [node: number, depth: number][][] = Array.from(
		{ length: 51 },
		() => [],
	);
	const answer = new Array<number>(n).fill(-1);
	const stack: [
		node: number,
		parent: number,
		depth: number,
		leaving: boolean,
	][] = [[0, -1, 0, false]];
	for (let entry = stack.pop(); entry; entry = stack.pop()) {
		const [node, parent, depth, leaving] = entry;
		const value = nums[node] ?? 0;
		if (leaving) {
			path[value]?.pop();
			continue;
		}
		let deepest = -1;
		for (const other of coprimes[value] ?? []) {
			const top = path[other]?.at(-1);
			if (top && top[1] > deepest) {
				deepest = top[1];
				answer[node] = top[0];
			}
		}
		path[value]?.push([node, depth]);
		stack.push([node, parent, depth, true]);
		for (const child of neighbours[node] ?? [])
			if (child !== parent) stack.push([child, node, depth + 1, false]);
	}
	return answer;
};
