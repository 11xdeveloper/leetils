import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { carPooling } from ".";

describe("1094. Car Pooling", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			carPooling(
				[
					[2, 1, 5],
					[3, 3, 7],
				],
				4,
			),
		).toBeFalse();
		expect(
			carPooling(
				[
					[2, 1, 5],
					[3, 3, 7],
				],
				5,
			),
		).toBeTrue();
	});

	it("drops passengers off before picking up at the same place", () => {
		expect(
			carPooling(
				[
					[3, 2, 7],
					[3, 7, 9],
					[8, 3, 9],
				],
				11,
			),
		).toBeTrue();
	});

	it("matches checking the load between every pair of locations on random trips", () => {
		const random = createRandom(1094);
		for (let run = 0; run < 1000; run++) {
			const trips = Array.from({ length: random.int(1, 6) }, () => {
				const from = random.int(0, 9);
				return [random.int(1, 5), from, random.int(from + 1, 10)];
			});
			const capacity = random.int(1, 12);
			let fits = true;
			for (let x = 0; x < 10; x++) {
				const load = trips.reduce(
					(total, [p = 0, from = 0, to = 0]) =>
						total + (from <= x && x < to ? p : 0),
					0,
				);
				if (load > capacity) fits = false;
			}
			expect(carPooling(trips, capacity)).toBe(fits);
		}
	});
});
