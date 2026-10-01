import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { dailyTemperatures } from ".";

describe("739. Daily Temperatures", () => {
	it("solves the examples from the problem statement", () => {
		expect(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])).toEqual([
			1, 1, 4, 2, 1, 1, 0, 0,
		]);
		expect(dailyTemperatures([30, 40, 50, 60])).toEqual([1, 1, 1, 0]);
		expect(dailyTemperatures([30, 60, 90])).toEqual([1, 1, 0]);
	});

	it("matches scanning ahead on random inputs", () => {
		const random = createRandom(739);
		for (let run = 0; run < 1000; run++) {
			const temperatures = random.array(random.int(1, 15), 30, 40);
			const expected = temperatures.map((t, i) => {
				const next = temperatures.findIndex((other, j) => j > i && other > t);
				return next === -1 ? 0 : next - i;
			});
			expect(dailyTemperatures(temperatures)).toEqual(expected);
		}
	});
});
