/**
 * 3086. Minimum Moves to Pick K Ones
 *
 * Alice stands at an index of the binary array `nums` she chooses, picking
 * up a 1 there for free. Each move either turns a 0 elsewhere into a 1 (at
 * most `maxChanges` times) or swaps a neighbouring 1 and 0, picking up the
 * 1 if it lands on her. Returns the fewest moves to pick up `k` ones.
 *
 * A 1 at distance d costs d moves to bring over, and a made 1 costs 2 (make
 * it next to her, then swap). So use any run of up to three ones around her
 * (costing 0, 1 and 1), then made ones. If that's not enough, use every
 * change, and bring the other `k - maxChanges` ones from the cheapest
 * window of consecutive ones, gathered at its median.
 *
 * @see https://leetcode.com/problems/minimum-moves-to-pick-k-ones/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumMovesToPickKOnes([1, 1, 0, 0, 0, 1, 1, 0, 0, 1], 3, 1); // 3
 */
export const minimumMovesToPickKOnes = (
	nums: readonly number[],
	k: number,
	maxChanges: number,
): number => {
	let nearby = 0;
	for (let i = 0; i < nums.length; i++) {
		if (nums[i] !== 1) continue;
		const run = 1 + (nums[i - 1] === 1 ? 1 : 0) + (nums[i + 1] === 1 ? 1 : 0);
		nearby = Math.max(nearby, run);
	}
	nearby = Math.min(nearby, k);
	if (nearby + maxChanges >= k)
		return Math.max(0, nearby - 1) + 2 * (k - nearby);
	const positions: number[] = [];
	nums.forEach((num, i) => {
		if (num === 1) positions.push(i);
	});
	const prefix = [0];
	for (const p of positions) prefix.push((prefix.at(-1) ?? 0) + p);
	const take = k - maxChanges;
	const sum = (from: number, to: number): number =>
		(prefix[to] ?? 0) - (prefix[from] ?? 0);
	let best = Number.POSITIVE_INFINITY;
	for (let left = 0; left + take <= positions.length; left++) {
		const mid = left + Math.floor(take / 2);
		const median = positions[mid] ?? 0;
		const cost =
			median * (mid - left) -
			sum(left, mid) +
			sum(mid + 1, left + take) -
			median * (left + take - mid - 1);
		best = Math.min(best, cost);
	}
	return best + 2 * maxChanges;
};
