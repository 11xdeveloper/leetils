/**
 * 1345. Jump Game IV
 *
 * From index `i` you can step to `i − 1`, `i + 1`, or any index with the same
 * value. Returns the fewest steps from the first index to the last.
 *
 * Breadth-first search. Each value's list of indices is used once and then
 * cleared, so long runs of equal values don't make it quadratic.
 *
 * @see https://leetcode.com/problems/jump-game-iv/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * jumpGameIV([100, -23, -23, 404, 100, 23, 23, 23, 3, 404]); // 3
 */
export const jumpGameIV = (arr: readonly number[]): number => {
	const n = arr.length;
	const sameValue = new Map<number, number[]>();
	arr.forEach((value, i) => {
		const list = sameValue.get(value);
		if (list) list.push(i);
		else sameValue.set(value, [i]);
	});
	const seen = new Uint8Array(n);
	seen[0] = 1;
	let frontier = [0];
	for (let steps = 0; frontier.length > 0; steps++) {
		const next: number[] = [];
		for (const i of frontier) {
			if (i === n - 1) return steps;
			const value = arr[i] ?? 0;
			for (const j of [i - 1, i + 1, ...(sameValue.get(value) ?? [])]) {
				if (j < 0 || j >= n || seen[j]) continue;
				seen[j] = 1;
				next.push(j);
			}
			sameValue.delete(value);
		}
		frontier = next;
	}
	return -1;
};
