import { Heap } from "../../internal/heap";

/**
 * 2402. Meeting Rooms III
 *
 * Meetings `[start, end)` (distinct starts) take the lowest-numbered free
 * room of `n`; if none is free, a meeting waits for the earliest room to
 * free up (lowest number on ties) and keeps its duration. Returns the room
 * that held the most meetings (lowest number on ties).
 *
 * Process meetings by start with a heap of free rooms and a heap of busy
 * rooms by end time.
 *
 * @see https://leetcode.com/problems/meeting-rooms-iii/
 * @difficulty Hard
 * @timeComplexity O(m log m + m log n)
 * @spaceComplexity O(n + m)
 *
 * @example
 * meetingRoomsIII(2, [[0, 10], [1, 5], [2, 7], [3, 4]]); // 0
 */
export const meetingRoomsIII = (
	n: number,
	meetings: readonly (readonly number[])[],
): number => {
	const free = new Heap<number>(
		(a, b) => a - b,
		Array.from({ length: n }, (_, i) => i),
	);
	const busy = new Heap<[end: number, room: number]>(
		(a, b) => a[0] - b[0] || a[1] - b[1],
	);
	const held = new Array<number>(n).fill(0);
	for (const [start = 0, end = 0] of meetings.toSorted(
		(a, b) => (a[0] ?? 0) - (b[0] ?? 0),
	)) {
		for (let top = busy.peek(); top && top[0] <= start; top = busy.peek())
			free.push(busy.pop()?.[1] ?? 0);
		let room = free.pop();
		let finish = end;
		if (room === undefined) {
			const [freedAt = 0, earliest = 0] = busy.pop() ?? [];
			room = earliest;
			finish = freedAt + end - start;
		}
		held[room] = (held[room] ?? 0) + 1;
		busy.push([finish, room]);
	}
	return held.indexOf(Math.max(...held));
};
