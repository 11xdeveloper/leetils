import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countWaysToBuildRoomsInAnAntColony as waysToBuildRooms } from ".";

/** Counts build orders by dynamic programming over built sets. */
const byBruteForce = (prevRoom: number[]): number => {
	const n = prevRoom.length;
	const ways = new Array<number>(1 << n).fill(0);
	ways[1] = 1;
	for (let mask = 1; mask < 1 << n; mask++) {
		if (!ways[mask]) continue;
		for (let room = 1; room < n; room++) {
			if (mask & (1 << room) || !(mask & (1 << (prevRoom[room] ?? 0))))
				continue;
			ways[mask | (1 << room)] =
				(ways[mask | (1 << room)] ?? 0) + (ways[mask] ?? 0);
		}
	}
	return ways[(1 << n) - 1] ?? 0;
};

describe("1916. Count Ways to Build Rooms in an Ant Colony", () => {
	it("solves the examples from the problem statement", () => {
		expect(waysToBuildRooms([-1, 0, 1])).toBe(1);
		expect(waysToBuildRooms([-1, 0, 0, 1, 2])).toBe(6);
	});

	it("matches counting orders directly on random trees", () => {
		const random = createRandom(1916);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 10);
			const prevRoom = [
				-1,
				...Array.from({ length: n - 1 }, (_, i) => random.int(0, i)),
			];
			expect(waysToBuildRooms(prevRoom)).toBe(byBruteForce(prevRoom));
		}
	});
});
