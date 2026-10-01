/**
 * 1465. Maximum Area of a Piece of Cake After Horizontal and Vertical Cuts
 *
 * Cuts an `h × w` cake at every position in `horizontalCuts` and
 * `verticalCuts` and returns the largest piece's area, modulo 10^9 + 7.
 *
 * The largest piece spans the widest gap between horizontal cuts and the
 * widest between vertical ones. The area can pass 2^53, so it's multiplied
 * with BigInt.
 *
 * @see https://leetcode.com/problems/maximum-area-of-a-piece-of-cake-after-horizontal-and-vertical-cuts/
 * @difficulty Medium
 * @timeComplexity O(a log a + b log b) for a and b cuts
 * @spaceComplexity O(a + b)
 *
 * @example
 * maximumAreaOfAPieceOfCakeAfterHorizontalAndVerticalCuts(5, 4, [1, 2, 4], [1, 3]); // 4
 */
export const maximumAreaOfAPieceOfCakeAfterHorizontalAndVerticalCuts = (
	h: number,
	w: number,
	horizontalCuts: readonly number[],
	verticalCuts: readonly number[],
): number => {
	const widestGap = (length: number, cuts: readonly number[]) => {
		const sorted = [0, ...cuts.toSorted((a, b) => a - b), length];
		let widest = 0;
		for (let i = 1; i < sorted.length; i++)
			widest = Math.max(widest, (sorted[i] ?? 0) - (sorted[i - 1] ?? 0));
		return widest;
	};
	const area =
		BigInt(widestGap(h, horizontalCuts)) * BigInt(widestGap(w, verticalCuts));
	return Number(area % 1_000_000_007n);
};
