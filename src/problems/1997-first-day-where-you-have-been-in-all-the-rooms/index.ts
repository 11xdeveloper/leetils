/**
 * 1997. First Day Where You Have Been in All the Rooms
 *
 * Visiting room `i` for an odd time sends you to `nextVisit[i] ≤ i` next;
 * an even time sends you to `i + 1`. Returns the first day all rooms have
 * been visited, modulo 10^9 + 7.
 *
 * Reaching room `i + 1` first requires visiting room `i` twice. With
 * `first[i]` the first day in room `i`, the second visit comes after
 * walking from `nextVisit[i]` back to `i`, which takes
 * `first[i] − first[nextVisit[i]]` days, so
 * `first[i + 1] = 2 · first[i] − first[nextVisit[i]] + 2`.
 *
 * @see https://leetcode.com/problems/first-day-where-you-have-been-in-all-the-rooms/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * firstDayWhereYouHaveBeenInAllTheRooms([0, 0, 2]); // 6
 */
export const firstDayWhereYouHaveBeenInAllTheRooms = (
	nextVisit: readonly number[],
): number => {
	const MOD = 1_000_000_007;
	const first = [0];
	for (let room = 0; room < nextVisit.length - 1; room++) {
		const back = first[nextVisit[room] ?? 0] ?? 0;
		first.push((((2 * (first[room] ?? 0) - back + 2) % MOD) + MOD) % MOD);
	}
	return first.at(-1) ?? 0;
};
