/**
 * 2212. Maximum Points in an Archery Competition
 *
 * Bob shoots `numArrows` arrows at sections 0 to 11 after Alice. He wins
 * section `k`'s `k` points by shooting more arrows there than Alice.
 * Returns an arrow allocation giving Bob the most points.
 *
 * Try every set of sections to win, each costing one more arrow than
 * Alice used; spare arrows go to section 0.
 *
 * @see https://leetcode.com/problems/maximum-points-in-an-archery-competition/
 * @difficulty Medium
 * @timeComplexity O(2^12 · 12)
 * @spaceComplexity O(12)
 *
 * @example
 * maximumPointsInAnArcheryCompetition(3, [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2]); // [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0]
 */
export const maximumPointsInAnArcheryCompetition = (
	numArrows: number,
	aliceArrows: readonly number[],
): number[] => {
	let [bestScore, bestMask] = [-1, 0];
	for (let mask = 0; mask < 1 << 12; mask++) {
		let [arrows, score] = [0, 0];
		for (let k = 0; k < 12; k++) {
			if (!(mask & (1 << k))) continue;
			arrows += (aliceArrows[k] ?? 0) + 1;
			score += k;
		}
		if (arrows <= numArrows && score > bestScore)
			[bestScore, bestMask] = [score, mask];
	}
	const bob = aliceArrows.map((alice, k) =>
		bestMask & (1 << k) ? alice + 1 : 0,
	);
	bob[0] = (bob[0] ?? 0) + numArrows - bob.reduce((sum, a) => sum + a, 0);
	return bob;
};
