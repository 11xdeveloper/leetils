/**
 * 3327. Check if DFS Strings Are Palindromes
 *
 * In a tree given by `parent`, a node's DFS string visits its children in
 * increasing order, then appends the node's letter. Returns, for each node,
 * whether its DFS string is a palindrome.
 *
 * Every subtree's DFS string is a contiguous piece of the root's. Build the
 * root's string with an iterative post-order traversal, recording each
 * subtree's span, and check the spans with Manacher's palindrome radii.
 *
 * @see https://leetcode.com/problems/check-if-dfs-strings-are-palindromes/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * checkIfDfsStringsArePalindromes([-1, 0, 0, 1, 1, 2], "aababa"); // [true, true, false, true, true, true]
 */
export const checkIfDfsStringsArePalindromes = (
	parent: readonly number[],
	s: string,
): boolean[] => {
	const n = parent.length;
	const children: number[][] = Array.from({ length: n }, () => []);
	for (let node = 1; node < n; node++) children[parent[node] ?? 0]?.push(node);
	const order: string[] = [];
	const start = new Int32Array(n);
	const end = new Int32Array(n);
	const stack: [node: number, next: number][] = [[0, 0]];
	start[0] = 0;
	while (stack.length > 0) {
		const top = stack.at(-1);
		if (!top) break;
		const [node, next] = top;
		const kids = children[node] ?? [];
		if (next < kids.length) {
			top[1]++;
			const child = kids[next] ?? 0;
			start[child] = order.length;
			stack.push([child, 0]);
		} else {
			end[node] = order.length;
			order.push(s.charAt(node));
			stack.pop();
		}
	}
	// Manacher on "#a#b#...#": radius[i] is the palindrome radius around position i.
	const t = `#${order.join("#")}#`;
	const radius = new Int32Array(t.length);
	for (let i = 0, center = 0, right = 0; i < t.length; i++) {
		let r = i < right ? Math.min(right - i, radius[2 * center - i] ?? 0) : 0;
		while (
			i - r - 1 >= 0 &&
			i + r + 1 < t.length &&
			t[i - r - 1] === t[i + r + 1]
		)
			r++;
		radius[i] = r;
		if (i + r > right) {
			center = i;
			right = i + r;
		}
	}
	return Array.from({ length: n }, (_, node) => {
		const from = start[node] ?? 0;
		const to = end[node] ?? 0;
		return (radius[from + to + 1] ?? 0) >= to - from + 1;
	});
};
