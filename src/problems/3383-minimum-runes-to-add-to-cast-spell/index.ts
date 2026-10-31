/**
 * 3383. Minimum Runes to Add to Cast Spell
 *
 * In a directed graph of `n` nodes, the nodes in `crystals` hold crystals.
 * Returns the fewest edges to add so every node can be reached from some
 * crystal.
 *
 * Collapse the strongly connected components (Tarjan's algorithm,
 * iteratively). A component with no incoming edges must be fed by a new
 * edge unless it holds a crystal, and one edge each is enough.
 *
 * @see https://leetcode.com/problems/minimum-runes-to-add-to-cast-spell/
 * @difficulty Hard
 * @timeComplexity O(n + e)
 * @spaceComplexity O(n + e)
 *
 * @example
 * minimumRunesToAddToCastSpell(6, [0], [0, 1, 2, 3], [1, 2, 3, 0]); // 2
 */
export const minimumRunesToAddToCastSpell = (
	n: number,
	crystals: readonly number[],
	flowFrom: readonly number[],
	flowTo: readonly number[],
): number => {
	const adjacent: number[][] = Array.from({ length: n }, () => []);
	flowFrom.forEach((from, i) => {
		adjacent[from]?.push(flowTo[i] ?? 0);
	});
	const index = new Int32Array(n).fill(-1);
	const low = new Int32Array(n);
	const component = new Int32Array(n).fill(-1);
	const onStack = new Uint8Array(n);
	const stack: number[] = [];
	let counter = 0;
	let components = 0;
	for (let start = 0; start < n; start++) {
		if (index[start] !== -1) continue;
		const work: [node: number, edge: number][] = [[start, 0]];
		index[start] = low[start] = counter++;
		stack.push(start);
		onStack[start] = 1;
		while (work.length > 0) {
			const top = work.at(-1);
			if (!top) break;
			const [node, edge] = top;
			const next = adjacent[node]?.[edge];
			if (next !== undefined) {
				top[1]++;
				if (index[next] === -1) {
					index[next] = low[next] = counter++;
					stack.push(next);
					onStack[next] = 1;
					work.push([next, 0]);
				} else if (onStack[next])
					low[node] = Math.min(low[node] ?? 0, index[next] ?? 0);
				continue;
			}
			work.pop();
			const parent = work.at(-1)?.[0];
			if (parent !== undefined)
				low[parent] = Math.min(low[parent] ?? 0, low[node] ?? 0);
			if (low[node] === index[node]) {
				for (
					let member = stack.pop();
					member !== undefined;
					member = stack.pop()
				) {
					onStack[member] = 0;
					component[member] = components;
					if (member === node) break;
				}
				components++;
			}
		}
	}
	const fed = new Uint8Array(components);
	for (const crystal of crystals) fed[component[crystal] ?? 0] = 1;
	flowFrom.forEach((from, i) => {
		const [a, b] = [component[from] ?? 0, component[flowTo[i] ?? 0] ?? 0];
		if (a !== b) fed[b] = 1;
	});
	return fed.reduce((missing, flag) => missing + (flag ? 0 : 1), 0);
};
