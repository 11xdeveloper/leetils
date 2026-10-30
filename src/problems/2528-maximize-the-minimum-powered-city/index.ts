/**
 * 2528. Maximize the Minimum Powered City
 *
 * A city's power is the number of stations within distance `r` of it.
 * Returns the largest possible minimum power after building `k` more
 * stations wherever you like.
 *
 * Binary search the minimum. To check one, sweep left to right; when a
 * city falls short, build the missing stations as far right as still
 * reaches it, tracking their effect with a difference array.
 *
 * @see https://leetcode.com/problems/maximize-the-minimum-powered-city/
 * @difficulty Hard
 * @timeComplexity O(n log(sum + k))
 * @spaceComplexity O(n)
 *
 * @example
 * maximizeTheMinimumPoweredCity([1, 2, 4, 5, 0], 1, 2); // 5
 */
export const maximizeTheMinimumPoweredCity = (
	stations: readonly number[],
	r: number,
	k: number,
): number => {
	const n = stations.length;
	const prefix = [0];
	for (const s of stations) prefix.push((prefix.at(-1) ?? 0) + s);
	const power = stations.map(
		(_, i) =>
			(prefix[Math.min(n, i + r + 1)] ?? 0) - (prefix[Math.max(0, i - r)] ?? 0),
	);

	const achievable = (target: number): boolean => {
		const expires = Array.from({ length: n + 1 }, () => 0);
		let built = 0;
		let active = 0;
		for (let i = 0; i < n; i++) {
			active -= expires[i] ?? 0;
			const shortfall = target - (power[i] ?? 0) - active;
			if (shortfall <= 0) continue;
			built += shortfall;
			if (built > k) return false;
			active += shortfall;
			const end = Math.min(n, i + 2 * r + 1);
			expires[end] = (expires[end] ?? 0) + shortfall;
		}
		return true;
	};

	let low = Math.min(...power);
	let high = low + k;
	while (low < high) {
		const mid = Math.ceil((low + high) / 2);
		if (achievable(mid)) low = mid;
		else high = mid - 1;
	}
	return low;
};
