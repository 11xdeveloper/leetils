/**
 * 841. Keys and Rooms
 *
 * Room 0 is unlocked, and room `i` holds the keys `rooms[i]`. Returns
 * whether every room can be visited.
 *
 * Collects keys with a depth-first search from room 0 and checks every room
 * was reached.
 *
 * @see https://leetcode.com/problems/keys-and-rooms/
 * @difficulty Medium
 * @timeComplexity O(rooms + keys)
 * @spaceComplexity O(rooms)
 *
 * @example
 * keysAndRooms([[1], [2], [3], []]); // true
 */
export const keysAndRooms = (
	rooms: readonly (readonly number[])[],
): boolean => {
	const visited = new Uint8Array(rooms.length);
	visited[0] = 1;
	let count = 1;
	const stack = [0];
	for (let room = stack.pop(); room !== undefined; room = stack.pop()) {
		for (const key of rooms[room] ?? []) {
			if (visited[key]) continue;
			visited[key] = 1;
			count++;
			stack.push(key);
		}
	}
	return count === rooms.length;
};
