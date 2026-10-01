import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { firstDayWhereYouHaveBeenInAllTheRooms as firstDayBeenInAllRooms } from ".";

/** Walks the rooms day by day. */
const bySimulation = (nextVisit: number[]): number => {
	const visits = new Array<number>(nextVisit.length).fill(0);
	let [room, seen] = [0, 0];
	for (let day = 0; ; day++) {
		if (visits[room] === 0) seen++;
		if (seen === nextVisit.length) return day;
		visits[room] = (visits[room] ?? 0) + 1;
		room =
			(visits[room] ?? 0) % 2 === 1
				? (nextVisit[room] ?? 0)
				: (room + 1) % nextVisit.length;
	}
};

describe("1997. First Day Where You Have Been in All the Rooms", () => {
	it("solves the examples from the problem statement", () => {
		expect(firstDayBeenInAllRooms([0, 0])).toBe(2);
		expect(firstDayBeenInAllRooms([0, 0, 2])).toBe(6);
		expect(firstDayBeenInAllRooms([0, 1, 2, 0])).toBe(6);
	});

	it("matches walking the rooms on random inputs", () => {
		const random = createRandom(1997);
		for (let run = 0; run < 200; run++) {
			const nextVisit = Array.from({ length: random.int(2, 10) }, (_, i) =>
				random.int(0, i),
			);
			expect(firstDayBeenInAllRooms(nextVisit)).toBe(bySimulation(nextVisit));
		}
	});

	it("reduces large days modulo 10^9 + 7", () => {
		expect(firstDayBeenInAllRooms(new Array(100000).fill(0))).toBeLessThan(
			1_000_000_007,
		);
	});
});
