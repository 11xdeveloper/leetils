/**
 * 2307. Check for Contradictions in Equations
 *
 * Each equation `A / B = value` relates two variables. Returns whether
 * the equations contradict each other (to within 10^-5).
 *
 * Weighted union-find: each variable stores its ratio to its root. An
 * equation between variables already joined must agree with their ratio.
 *
 * @see https://leetcode.com/problems/check-for-contradictions-in-equations/
 * @difficulty Hard
 * @timeComplexity O(n · α(n))
 * @spaceComplexity O(n)
 *
 * @example
 * checkForContradictionsInEquations([["le", "et"], ["le", "code"], ["code", "et"]], [2, 5, 0.5]); // true
 */
export const checkForContradictionsInEquations = (
	equations: readonly (readonly string[])[],
	values: readonly number[],
): boolean => {
	const parent = new Map<string, string>();
	// ratio.get(x) = x / parent(x).
	const ratio = new Map<string, number>();
	const find = (x: string): [root: string, toRoot: number] => {
		if (!parent.has(x)) {
			parent.set(x, x);
			ratio.set(x, 1);
		}
		const path: string[] = [];
		let root = x;
		while (parent.get(root) !== root) {
			path.push(root);
			root = parent.get(root) ?? root;
		}
		for (const node of path.reverse()) {
			const up = parent.get(node) ?? root;
			ratio.set(node, (ratio.get(node) ?? 1) * (ratio.get(up) ?? 1));
			parent.set(node, root);
		}
		return [root, ratio.get(x) ?? 1];
	};
	for (const [i, [a = "", b = ""]] of equations.entries()) {
		const value = values[i] ?? 1;
		const [rootA, ratioA] = find(a);
		const [rootB, ratioB] = find(b);
		if (rootA === rootB) {
			if (Math.abs(ratioA / ratioB - value) > 1e-5) return true;
			continue;
		}
		// a = value · b, so rootA = rootB · value · ratioB / ratioA.
		parent.set(rootA, rootB);
		ratio.set(rootA, (value * ratioB) / ratioA);
	}
	return false;
};
