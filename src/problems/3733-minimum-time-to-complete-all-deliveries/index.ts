/**
 * 3733. Minimum Time to Complete All Deliveries
 *
 * Two drones must make `d[0]` and `d[1]` deliveries, one per hour, with at
 * most one delivery per hour overall; drone i can't deliver in hours
 * divisible by `r[i]`. Returns the fewest hours needed.
 *
 * Binary search the time T. It suffices when each drone has enough usable
 * hours on its own and enough hours are usable by at least one of them
 * (all but the multiples of lcm(r₀, r₁)), by Hall's theorem.
 *
 * @see https://leetcode.com/problems/minimum-time-to-complete-all-deliveries/
 * @difficulty Medium
 * @timeComplexity O(log(d · r))
 * @spaceComplexity O(1)
 *
 * @example
 * minimumTimeToCompleteAllDeliveries([3, 1], [2, 3]); // 5
 */
export const minimumTimeToCompleteAllDeliveries = (
	d: readonly number[],
	r: readonly number[],
): number => {
	const [d0 = 0, d1 = 0] = d;
	const [r0 = 1, r1 = 1] = r;
	const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
	const lcm = (r0 / gcd(r0, r1)) * r1;
	const enough = (t: number): boolean =>
		t - Math.floor(t / r0) >= d0 &&
		t - Math.floor(t / r1) >= d1 &&
		t - Math.floor(t / lcm) >= d0 + d1;
	let [lo, hi] = [1, 4 * (d0 + d1)];
	while (lo < hi) {
		const mid = lo + Math.floor((hi - lo) / 2);
		if (enough(mid)) hi = mid;
		else lo = mid + 1;
	}
	return lo;
};
