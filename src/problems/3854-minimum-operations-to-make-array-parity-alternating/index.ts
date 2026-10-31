/**
 * 3854. Minimum Operations to Make Array Parity Alternating
 *
 * One operation adds or subtracts 1 from an element. Returns the fewest
 * operations making neighbours' parities differ, and the smallest
 * max - min among arrays reached with exactly that many.
 *
 * For each starting parity, the mismatched elements each move by exactly
 * one, up or down, and the rest stay. To minimise the range, try every
 * possible minimum lo: elements at least lo + 1 above step down, the rest
 * step up, so the maximum comes from the largest element and the largest
 * one not above lo. Sorting makes each lo a binary search.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-make-array-parity-alternating/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumOperationsToMakeArrayParityAlternating([-2, -3, 1, 4]); // [2, 6]
 */
export const minimumOperationsToMakeArrayParityAlternating = (
	nums: readonly number[],
): number[] => {
	const parity = (x: number) => ((x % 2) + 2) % 2;
	const plans = [0, 1].map((first) => {
		const fixed: number[] = [];
		const moving: number[] = [];
		nums.forEach((num, i) => {
			(parity(num) === (first + i) % 2 ? fixed : moving).push(num);
		});
		return { fixed, moving: moving.sort((a, b) => a - b) };
	});
	const operations = Math.min(...plans.map((plan) => plan.moving.length));
	let best = Number.POSITIVE_INFINITY;
	for (const { fixed, moving } of plans) {
		if (moving.length !== operations) continue;
		const fixedLow = Math.min(...fixed);
		const fixedHigh = Math.max(...fixed);
		if (moving.length === 0) {
			best = Math.min(best, fixedHigh - fixedLow);
			continue;
		}
		const largest = moving.at(-1) ?? 0;
		const candidates = [fixedLow, ...moving.flatMap((x) => [x - 1, x + 1])];
		for (const lo of candidates) {
			if (lo > fixedLow || lo > (moving[0] ?? 0) + 1) continue;
			// Count of moving elements at most lo; they step up.
			let [a, b] = [0, moving.length];
			while (a < b) {
				const mid = (a + b) >>> 1;
				if ((moving[mid] ?? 0) <= lo) a = mid + 1;
				else b = mid;
			}
			let high = fixedHigh;
			if (a > 0) high = Math.max(high, (moving[a - 1] ?? 0) + 1);
			if (a < moving.length) high = Math.max(high, largest - 1);
			best = Math.min(best, high - lo);
		}
	}
	return [operations, best];
};
