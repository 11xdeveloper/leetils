/**
 * 4023. Elevator Requests II
 *
 * Starting at floor `start`, move one floor per second until every floor
 * in `requests` has been visited. Returns the smallest total of the times
 * at which the requests are reached.
 *
 * The visited floors always form an interval around the start, so use
 * interval dynamic programming over the sorted floors (with the start
 * among them), ending at either side. Each second costs one per request
 * still waiting.
 *
 * @see https://leetcode.com/problems/elevator-requests-ii/
 * @difficulty Hard
 * @timeComplexity O(r²)
 * @spaceComplexity O(r)
 *
 * @example
 * elevatorRequestsII(10, 5, [0, 2, 9]); // 22
 */
export const elevatorRequestsII = (
	_n: number,
	start: number,
	requests: readonly number[],
): number => {
	const floors = [...new Set([...requests, start])].sort((a, b) => a - b);
	const m = floors.length;
	const total = requests.length;
	const isRequest = new Set(requests);
	// requested[i]: requests among floors[0..i).
	const requested = [0];
	for (const f of floors)
		requested.push((requested.at(-1) ?? 0) + (isRequest.has(f) ? 1 : 0));
	const s = floors.indexOf(start);
	// atLeft[i] / atRight[i]: best cost covering floors[i..i + len - 1], standing at that end.
	let atLeft = new Float64Array(m).fill(Number.POSITIVE_INFINITY);
	let atRight = new Float64Array(m).fill(Number.POSITIVE_INFINITY);
	atLeft[s] = 0;
	atRight[s] = 0;
	for (let len = 2; len <= m; len++) {
		const nextLeft = new Float64Array(m).fill(Number.POSITIVE_INFINITY);
		const nextRight = new Float64Array(m).fill(Number.POSITIVE_INFINITY);
		for (let i = Math.max(0, s - len + 1); i <= s && i + len - 1 < m; i++) {
			const j = i + len - 1;
			const waitingBefore = (inner: [number, number]) =>
				total - ((requested[inner[1] + 1] ?? 0) - (requested[inner[0]] ?? 0));
			// Extend [i + 1, j] leftwards to i.
			if (i + 1 <= s) {
				const waiting = waitingBefore([i + 1, j]);
				const fromLeft =
					(atLeft[i + 1] ?? 0) +
					((floors[i + 1] ?? 0) - (floors[i] ?? 0)) * waiting;
				const fromRight =
					(atRight[i + 1] ?? 0) +
					((floors[j] ?? 0) - (floors[i] ?? 0)) * waiting;
				nextLeft[i] = Math.min(fromLeft, fromRight);
			}
			// Extend [i, j - 1] rightwards to j.
			if (j - 1 >= s) {
				const waiting = waitingBefore([i, j - 1]);
				const fromLeft =
					(atLeft[i] ?? 0) + ((floors[j] ?? 0) - (floors[i] ?? 0)) * waiting;
				const fromRight =
					(atRight[i] ?? 0) +
					((floors[j] ?? 0) - (floors[j - 1] ?? 0)) * waiting;
				nextRight[i] = Math.min(fromLeft, fromRight);
			}
		}
		[atLeft, atRight] = [nextLeft, nextRight];
	}
	return Math.min(atLeft[0] ?? 0, atRight[0] ?? 0);
};
