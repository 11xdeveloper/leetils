/**
 * 312. Burst Balloons
 *
 * Bursting balloon `i` earns `nums[i - 1] * nums[i] * nums[i + 1]` coins,
 * using its current neighbours (a missing neighbour counts as 1), and then
 * its neighbours become adjacent. Returns the most coins from bursting all
 * of them.
 *
 * Interval dynamic programming that thinks about the last balloon burst in
 * each range: when it goes, its neighbours are the balloons just outside the
 * range, so the two sides around it are independent subproblems.
 *
 * @see https://leetcode.com/problems/burst-balloons/
 * @difficulty Hard
 * @timeComplexity O(n^3)
 * @spaceComplexity O(n^2)
 *
 * @example
 * burstBalloons([3, 1, 5, 8]); // 167
 */
export const burstBalloons = (nums: readonly number[]): number => {
	const values = [1, ...nums, 1];
	const size = values.length;
	// best[l * size + r]: most coins from bursting everything strictly between l and r.
	const best = new Array<number>(size * size).fill(0);

	for (let gap = 2; gap < size; gap++) {
		for (let left = 0; left + gap < size; left++) {
			const right = left + gap;
			let most = 0;
			for (let last = left + 1; last < right; last++) {
				most = Math.max(
					most,
					(best[left * size + last] ?? 0) +
						(values[left] ?? 1) * (values[last] ?? 1) * (values[right] ?? 1) +
						(best[last * size + right] ?? 0),
				);
			}
			best[left * size + right] = most;
		}
	}

	return best[size - 1] ?? 0;
};
