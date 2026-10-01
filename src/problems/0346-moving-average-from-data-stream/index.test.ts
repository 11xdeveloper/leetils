import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { MovingAverageFromDataStream } from ".";

describe("346. Moving Average from Data Stream", () => {
	it("solves the example from the problem statement", () => {
		const average = new MovingAverageFromDataStream(3);
		expect(average.next(1)).toBe(1);
		expect(average.next(10)).toBe(5.5);
		expect(average.next(3)).toBeCloseTo(4.66667, 5);
		expect(average.next(5)).toBe(6);
	});

	it("matches averaging the last values on random streams", () => {
		const random = createRandom(346);
		for (let run = 0; run < 100; run++) {
			const size = random.int(1, 6);
			const average = new MovingAverageFromDataStream(size);
			const values: number[] = [];
			for (let step = 0; step < 40; step++) {
				const val = random.int(-100_000, 100_000);
				values.push(val);
				const window = values.slice(-size);
				expect(average.next(val)).toBeCloseTo(
					window.reduce((a, b) => a + b, 0) / window.length,
					8,
				);
			}
		}
	});
});
