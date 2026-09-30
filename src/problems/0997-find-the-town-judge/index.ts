/**
 * 997. Find the Town Judge
 *
 * In a town of `n` people, `trust` pairs `[a, b]` mean `a` trusts `b`. The
 * judge trusts nobody and is trusted by everyone else. Returns the judge's
 * label, or -1 if there isn't exactly one.
 *
 * Scores each person as trusted-by count minus trusts count; only the
 * judge can reach `n - 1`.
 *
 * @see https://leetcode.com/problems/find-the-town-judge/
 * @difficulty Easy
 * @timeComplexity O(n + t)
 * @spaceComplexity O(n)
 *
 * @example
 * findTheTownJudge(3, [[1, 3], [2, 3]]); // 3
 */
export const findTheTownJudge = (
	n: number,
	trust: readonly (readonly number[])[],
): number => {
	const score = new Array<number>(n + 1).fill(0);
	for (const [a = 0, b = 0] of trust) {
		score[a] = (score[a] ?? 0) - 1;
		score[b] = (score[b] ?? 0) + 1;
	}
	for (let person = 1; person <= n; person++)
		if (score[person] === n - 1) return person;
	return -1;
};
