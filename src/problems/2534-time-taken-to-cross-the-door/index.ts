/**
 * 2534. Time Taken to Cross the Door
 *
 * People arrive at a door at sorted times `arrival[i]`, wanting to enter
 * (`state[i]` = 0) or exit (1). The door lets one person through per
 * second. If it was unused the previous second, or used to exit, someone
 * exiting goes first; if it was used to enter, someone entering does.
 * Ties go to the smaller index. Returns when each person crosses.
 *
 * Simulate second by second with a queue for each direction, jumping
 * ahead whenever both are empty.
 *
 * @see https://leetcode.com/problems/time-taken-to-cross-the-door/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * timeTakenToCrossTheDoor([0, 1, 1, 2, 4], [0, 1, 0, 0, 1]); // [0, 3, 1, 2, 4]
 */
export const timeTakenToCrossTheDoor = (
	arrival: readonly number[],
	state: readonly number[],
): number[] => {
	const n = arrival.length;
	const queues: [number[], number[]] = [[], []];
	const heads = [0, 0];
	const answer = arrival.map(() => 0);
	let next = 0;
	let now = 0;
	let last = 1;
	for (let crossed = 0; crossed < n; ) {
		for (; next < n && (arrival[next] ?? 0) <= now; next++)
			queues[state[next] === 1 ? 1 : 0].push(next);
		const waiting = (side: number): boolean =>
			(heads[side] ?? 0) < queues[side === 1 ? 1 : 0].length;
		if (!waiting(0) && !waiting(1)) {
			now = Math.max(now + 1, arrival[next] ?? now);
			last = 1;
			continue;
		}
		const side = waiting(last) ? last : 1 - last;
		const person = queues[side === 1 ? 1 : 0][heads[side] ?? 0] ?? 0;
		heads[side] = (heads[side] ?? 0) + 1;
		answer[person] = now++;
		last = side;
		crossed++;
	}
	return answer;
};
