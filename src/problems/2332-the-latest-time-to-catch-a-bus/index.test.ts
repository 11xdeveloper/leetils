import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { theLatestTimeToCatchABus as latestTimeCatchTheBus } from ".";

/** Tries every arrival time from the last departure down. */
const byBruteForce = (
	buses: number[],
	passengers: number[],
	capacity: number,
): number => {
	const catches = (time: number): boolean => {
		const queue = [...passengers, time].sort((a, b) => a - b);
		let next = 0;
		for (const departure of buses.toSorted((a, b) => a - b)) {
			for (
				let seats = capacity;
				seats > 0 && (queue[next] ?? Infinity) <= departure;
				seats--
			) {
				if (queue[next] === time && !passengers.includes(time)) return true;
				next++;
			}
		}
		return false;
	};
	for (let time = Math.max(...buses); ; time--)
		if (!passengers.includes(time) && catches(time)) return time;
};

describe("2332. The Latest Time to Catch a Bus", () => {
	it("solves the examples from the problem statement", () => {
		expect(latestTimeCatchTheBus([10, 20], [2, 17, 18, 19], 2)).toBe(16);
		expect(
			latestTimeCatchTheBus([20, 30, 10], [19, 13, 26, 4, 25, 11, 21], 2),
		).toBe(20);
	});

	it("matches trying every arrival time on random schedules", () => {
		const random = createRandom(2332);
		for (let run = 0; run < 200; run++) {
			const buses = [...new Set(random.array(random.int(1, 4), 2, 20))];
			const passengers = [...new Set(random.array(random.int(1, 8), 2, 20))];
			const capacity = random.int(1, 3);
			expect(latestTimeCatchTheBus(buses, passengers, capacity)).toBe(
				byBruteForce(buses, passengers, capacity),
			);
		}
	});
});
