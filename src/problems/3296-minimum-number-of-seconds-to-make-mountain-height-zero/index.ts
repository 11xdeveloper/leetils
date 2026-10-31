/**
 * 3296. Minimum Number of Seconds to Make Mountain Height Zero
 *
 * Workers lower a mountain together; worker i takes
 * `t · (1 + 2 + … + x)` seconds to lower it by x, where t is
 * `workerTimes[i]`. Returns the fewest seconds to lower it by
 * `mountainHeight`.
 *
 * Binary search on the time T. Each worker manages the largest x with
 * t · x(x + 1) / 2 ≤ T, found from the quadratic formula and nudged to
 * correct rounding.
 *
 * @see https://leetcode.com/problems/minimum-number-of-seconds-to-make-mountain-height-zero/
 * @difficulty Medium
 * @timeComplexity O(n log(max · h²))
 * @spaceComplexity O(1)
 *
 * @example
 * minimumNumberOfSecondsToMakeMountainHeightZero(4, [2, 1, 1]); // 3
 */
export const minimumNumberOfSecondsToMakeMountainHeightZero = (
	mountainHeight: number,
	workerTimes: readonly number[],
): number => {
	const lowered = (time: number): number => {
		let total = 0;
		for (const t of workerTimes) {
			const budget = Math.floor(time / t);
			let x = Math.floor((Math.sqrt(8 * budget + 1) - 1) / 2);
			while ((x * (x + 1)) / 2 > budget) x--;
			while (((x + 1) * (x + 2)) / 2 <= budget) x++;
			total += x;
			if (total >= mountainHeight) return total;
		}
		return total;
	};
	let lo = 1;
	let hi =
		Math.min(...workerTimes) * ((mountainHeight * (mountainHeight + 1)) / 2);
	while (lo < hi) {
		const mid = lo + Math.floor((hi - lo) / 2);
		if (lowered(mid) >= mountainHeight) hi = mid;
		else lo = mid + 1;
	}
	return lo;
};
