/**
 * 3628. Maximum Number of Subsequences After One Inserting
 *
 * Insert at most one letter into `s` to maximise the number of "LCT"
 * subsequences. Returns that number.
 *
 * An inserted L belongs at the start, adding the "CT" count; a T at the
 * end, adding the "LC" count; a C anywhere, adding the Ls before times the
 * Ts after, so try every gap.
 *
 * @see https://leetcode.com/problems/maximum-number-of-subsequences-after-one-inserting/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumNumberOfSubsequencesAfterOneInserting("LCCT"); // 4
 */
export const maximumNumberOfSubsequencesAfterOneInserting = (
	s: string,
): number => {
	let totalT = 0;
	for (const c of s) if (c === "T") totalT++;
	let [l, lc, lct, t] = [0, 0, 0, 0];
	let ct = 0;
	let bestC = 0;
	for (const c of s) {
		bestC = Math.max(bestC, l * (totalT - t));
		if (c === "L") l++;
		else if (c === "C") {
			lc += l;
			ct += totalT - t;
		} else if (c === "T") {
			lct += lc;
			t++;
		}
	}
	bestC = Math.max(bestC, l * (totalT - t));
	return lct + Math.max(ct, lc, bestC);
};
