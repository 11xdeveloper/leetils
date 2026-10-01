import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { gasStation } from ".";

/** Simulates the drive from every station; returns every start that works. */
const workingStarts = (gas: number[], cost: number[]): number[] =>
	gas.flatMap((_, start) => {
		let tank = 0;
		for (let step = 0; step < gas.length; step++) {
			const i = (start + step) % gas.length;
			tank += (gas[i] ?? 0) - (cost[i] ?? 0);
			if (tank < 0) return [];
		}
		return [start];
	});

describe("134. Gas Station", () => {
	it("solves the examples from the problem statement", () => {
		expect(gasStation([1, 2, 3, 4, 5], [3, 4, 5, 1, 2])).toBe(3);
		expect(gasStation([2, 3, 4], [3, 4, 3])).toBe(-1);
	});

	it("handles a single station", () => {
		expect(gasStation([5], [4])).toBe(0);
		expect(gasStation([4], [5])).toBe(-1);
	});

	it("matches simulating every start on random inputs with a unique answer", () => {
		const random = createRandom(134);
		for (let run = 0; run < 1000; run++) {
			const n = random.int(1, 8);
			const gas = random.array(n, 0, 5);
			const cost = random.array(n, 0, 5);
			const starts = workingStarts(gas, cost);
			if (starts.length > 1) continue;
			expect(gasStation(gas, cost)).toBe(starts[0] ?? -1);
		}
	});
});
