/**
 * 3437. Permutations III
 *
 * Every permutation of 1 to `n` in which neighbouring numbers alternate
 * between odd and even, in lexicographic order.
 *
 * Backtrack, trying numbers in increasing order and only those whose parity
 * differs from the last one placed.
 *
 * @see https://leetcode.com/problems/permutations-iii/
 * @difficulty Medium
 * @timeComplexity O(n · (n/2)!²)
 * @spaceComplexity O(n · (n/2)!²)
 *
 * @example
 * permutationsIII(3); // [[1, 2, 3], [3, 2, 1]]
 */
export const permutationsIII = (n: number): number[][] => {
	const result: number[][] = [];
	const used = new Uint8Array(n + 1);
	const current: number[] = [];
	const place = (): void => {
		if (current.length === n) {
			result.push([...current]);
			return;
		}
		const last = current.at(-1);
		for (let v = 1; v <= n; v++) {
			if (used[v] || (last !== undefined && last % 2 === v % 2)) continue;
			used[v] = 1;
			current.push(v);
			place();
			current.pop();
			used[v] = 0;
		}
	};
	place();
	return result;
};
