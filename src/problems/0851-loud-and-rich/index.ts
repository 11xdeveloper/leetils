/**
 * 851. Loud and Rich
 *
 * Each `[a, b]` in `richer` says person `a` has more money than `b`, and
 * `quiet[i]` is person `i`'s (distinct) quietness. For each person `x`,
 * returns the quietest person among those with at least as much money as
 * `x` (including `x`), as far as `richer` shows.
 *
 * Processes people from the richest down in topological order. Each
 * person's answer starts as themselves and is improved by the answers of
 * everyone known to be directly richer.
 *
 * @see https://leetcode.com/problems/loud-and-rich/
 * @difficulty Medium
 * @timeComplexity O(n + e)
 * @spaceComplexity O(n + e)
 *
 * @example
 * loudAndRich([[1, 0], [2, 1], [3, 1], [3, 7], [4, 3], [5, 3], [6, 3]], [3, 2, 5, 4, 6, 1, 7, 0]); // [5, 5, 2, 5, 4, 5, 6, 7]
 */
export const loudAndRich = (
	richer: readonly (readonly number[])[],
	quiet: readonly number[],
): number[] => {
	const n = quiet.length;
	const poorer: number[][] = Array.from({ length: n }, () => []);
	const richerCount = new Array<number>(n).fill(0);
	for (const [a = 0, b = 0] of richer) {
		poorer[a]?.push(b);
		richerCount[b] = (richerCount[b] ?? 0) + 1;
	}

	const answer = Array.from({ length: n }, (_, i) => i);
	const queue = answer.filter((person) => richerCount[person] === 0);
	for (const person of queue) {
		for (const next of poorer[person] ?? []) {
			if ((quiet[answer[person] ?? 0] ?? 0) < (quiet[answer[next] ?? 0] ?? 0))
				answer[next] = answer[person] ?? 0;
			richerCount[next] = (richerCount[next] ?? 0) - 1;
			if (richerCount[next] === 0) queue.push(next);
		}
	}
	return answer;
};
