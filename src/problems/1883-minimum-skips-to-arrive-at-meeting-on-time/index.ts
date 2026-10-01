/**
 * 1883. Minimum Skips to Arrive at Meeting On Time
 *
 * Travelling the roads `dist` at `speed`, you rest until the next whole
 * hour after each road except the last, unless you skip that rest.
 * Returns the fewest skips arriving within `hoursBefore`, or -1.
 *
 * Measure time in units of `1 / speed` hours so everything is an integer.
 * `best[j]` is the earliest arrival after the roads so far using `j`
 * skips: resting rounds up to a multiple of `speed`, skipping doesn't.
 *
 * @see https://leetcode.com/problems/minimum-skips-to-arrive-at-meeting-on-time/
 * @difficulty Hard
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumSkipsToArriveAtMeetingOnTime([7, 3, 5, 5], 2, 10); // 2
 */
export const minimumSkipsToArriveAtMeetingOnTime = (
	dist: readonly number[],
	speed: number,
	hoursBefore: number,
): number => {
	const n = dist.length;
	let best = [0];
	for (const [i, road] of dist.entries()) {
		const last = i === n - 1;
		const next = new Array<number>(best.length + 1).fill(Infinity);
		for (const [skips, time] of best.entries()) {
			const arrival = time + road;
			const rested = last ? arrival : Math.ceil(arrival / speed) * speed;
			next[skips] = Math.min(next[skips] ?? Infinity, rested);
			if (!last)
				next[skips + 1] = Math.min(next[skips + 1] ?? Infinity, arrival);
		}
		best = next;
	}
	const skips = best.findIndex((time) => time <= hoursBefore * speed);
	return skips;
};
