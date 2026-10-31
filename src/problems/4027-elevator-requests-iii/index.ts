/**
 * 4027. Elevator Requests III
 *
 * Starting at floor `start`, move up, down or stay each second. A request
 * `[arrival, floor]` is fulfilled by being on its floor at or after its
 * arrival. Returns the earliest time all requests are fulfilled.
 *
 * Dynamic programming over (requests fulfilled, the last one), keeping the
 * earliest finishing time; the next request takes the travel time, or
 * waits for its arrival. Requests passed on the way slot in for free.
 *
 * @see https://leetcode.com/problems/elevator-requests-iii/
 * @difficulty Hard
 * @timeComplexity O(2^r · r²)
 * @spaceComplexity O(2^r · r)
 *
 * @example
 * elevatorRequestsIII(9, 0, [[0, 8], [6, 5]]); // 9
 */
export const elevatorRequestsIII = (
	_n: number,
	start: number,
	requests: readonly (readonly number[])[],
): number => {
	const r = requests.length;
	const full = (1 << r) - 1;
	const best = new Float64Array((full + 1) * r).fill(Number.POSITIVE_INFINITY);
	requests.forEach(([arrival = 0, floor = 0], k) => {
		best[(1 << k) * r + k] = Math.max(Math.abs(start - floor), arrival);
	});
	for (let mask = 1; mask <= full; mask++)
		for (let last = 0; last < r; last++) {
			const time = best[mask * r + last] ?? Number.POSITIVE_INFINITY;
			if (time === Number.POSITIVE_INFINITY) continue;
			const from = requests[last]?.[1] ?? 0;
			requests.forEach(([arrival = 0, floor = 0], k) => {
				if ((mask >> k) & 1) return;
				const next = (mask | (1 << k)) * r + k;
				best[next] = Math.min(
					best[next] ?? 0,
					Math.max(time + Math.abs(from - floor), arrival),
				);
			});
		}
	let answer = Number.POSITIVE_INFINITY;
	for (let last = 0; last < r; last++)
		answer = Math.min(
			answer,
			best[full * r + last] ?? Number.POSITIVE_INFINITY,
		);
	return answer;
};
