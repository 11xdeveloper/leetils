import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximizeDistanceToClosestPerson as maxDistToClosest } from ".";

describe("849. Maximize Distance to Closest Person", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxDistToClosest([1, 0, 0, 0, 1, 0, 1])).toBe(2);
		expect(maxDistToClosest([1, 0, 0, 0])).toBe(3);
		expect(maxDistToClosest([0, 1])).toBe(1);
	});

	it("matches measuring from every empty seat on random rows", () => {
		const random = createRandom(849);
		for (let run = 0; run < 1000; run++) {
			const seats = random.array(random.int(2, 12), 0, 1);
			if (!seats.includes(1) || !seats.includes(0)) continue;
			const people = seats.flatMap((seat, i) => (seat === 1 ? [i] : []));
			const expected = Math.max(
				...seats.flatMap((seat, i) =>
					seat === 0 ? [Math.min(...people.map((p) => Math.abs(p - i)))] : [],
				),
			);
			expect(maxDistToClosest(seats)).toBe(expected);
		}
	});
});
