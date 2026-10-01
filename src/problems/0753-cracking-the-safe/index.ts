/**
 * 753. Cracking the Safe
 *
 * A safe's password is `n` digits from 0 to `k - 1`, and it opens as soon
 * as the last `n` digits typed match. Returns a shortest string that is
 * sure to open it, i.e. contains every possible password.
 *
 * That's a de Bruijn sequence. Treating each `(n - 1)`-digit string as a
 * node and each password as an edge, an Eulerian circuit visits every
 * password once. Hierholzer's algorithm, with an explicit stack, finds it:
 * edges are recorded as the walk backs out of dead ends, which gives the
 * circuit in reverse.
 *
 * @see https://leetcode.com/problems/cracking-the-safe/
 * @difficulty Hard
 * @timeComplexity O(k^n)
 * @spaceComplexity O(k^n)
 *
 * @example
 * crackingTheSafe(2, 2); // "00110", containing 00, 01, 11 and 10
 */
export const crackingTheSafe = (n: number, k: number): string => {
	const nodes = k ** (n - 1);
	// nextDigit[node] is the next unused outgoing edge (digit) from node.
	const nextDigit = new Array<number>(nodes).fill(0);
	const circuit: number[] = [];
	const path: [node: number, via: number][] = [[0, -1]];

	while (path.length > 0) {
		const [node, via] = path.at(-1) ?? [0, -1];
		const digit = nextDigit[node] ?? k;
		if (digit < k) {
			nextDigit[node] = digit + 1;
			path.push([(node * k + digit) % nodes, digit]);
		} else {
			path.pop();
			if (via >= 0) circuit.push(via);
		}
	}

	return "0".repeat(n - 1) + circuit.reverse().join("");
};
