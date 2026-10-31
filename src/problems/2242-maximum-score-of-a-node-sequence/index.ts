/**
 * 2242. Maximum Score of a Node Sequence
 *
 * Returns the largest total score of four distinct nodes forming a path
 * `a - b - c - d` in an undirected graph, or -1 if there is none.
 *
 * Treat every edge as the middle `b - c`. The ends only need to avoid
 * the other three nodes, so the three best-scoring neighbours of `b` and
 * of `c` always contain the best choice.
 *
 * @see https://leetcode.com/problems/maximum-score-of-a-node-sequence/
 * @difficulty Hard
 * @timeComplexity O(n + e log e)
 * @spaceComplexity O(n + e)
 *
 * @example
 * maximumScoreOfANodeSequence([5, 2, 9, 8, 4], [[0, 1], [1, 2], [2, 3], [0, 2], [1, 3], [2, 4]]); // 24
 */
export const maximumScoreOfANodeSequence = (
	scores: readonly number[],
	edges: readonly (readonly number[])[],
): number => {
	const neighbours: number[][] = scores.map(() => []);
	for (const [a = 0, b = 0] of edges) {
		neighbours[a]?.push(b);
		neighbours[b]?.push(a);
	}
	const best = neighbours.map((list) =>
		list.sort((x, y) => (scores[y] ?? 0) - (scores[x] ?? 0)).slice(0, 3),
	);
	let answer = -1;
	for (const [b = 0, c = 0] of edges) {
		for (const a of best[b] ?? []) {
			if (a === c) continue;
			for (const d of best[c] ?? []) {
				if (d === b || d === a) continue;
				answer = Math.max(
					answer,
					(scores[a] ?? 0) +
						(scores[b] ?? 0) +
						(scores[c] ?? 0) +
						(scores[d] ?? 0),
				);
			}
		}
	}
	return answer;
};
