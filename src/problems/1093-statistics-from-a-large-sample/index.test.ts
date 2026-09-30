import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { statisticsFromALargeSample as sampleStats } from ".";

describe("1093. Statistics from a Large Sample", () => {
	it("solves the examples from the problem statement", () => {
		expect(sampleStats([0, 1, 3, 4, ...new Array(252).fill(0)])).toEqual([
			1, 3, 2.375, 2.5, 3,
		]);
		expect(sampleStats([0, 4, 3, 2, 2, ...new Array(251).fill(0)])).toEqual([
			1, 4, 2.1818181818181817, 2, 1,
		]);
	});

	it("matches computing the statistics from the expanded sample", () => {
		const random = createRandom(1093);
		for (let run = 0; run < 300; run++) {
			const count = new Array<number>(256).fill(0);
			for (let i = random.int(1, 6); i > 0; i--)
				count[random.int(0, 255)] = random.int(1, 5);
			// Make the mode unique.
			count[random.int(0, 255)] = 10;
			const sample = count.flatMap((times, k) =>
				new Array<number>(times).fill(k),
			);
			const middle = sample.length / 2;
			const median =
				sample.length % 2 === 1
					? (sample[Math.floor(middle)] ?? 0)
					: ((sample[middle - 1] ?? 0) + (sample[middle] ?? 0)) / 2;
			const [min = 0] = sample;
			const expected = [
				min,
				sample.at(-1) ?? 0,
				sample.reduce((a, b) => a + b, 0) / sample.length,
				median,
				count.indexOf(10),
			];
			const result = sampleStats(count);
			for (const [i, value] of expected.entries())
				expect(result[i] ?? 0).toBeCloseTo(value, 9);
		}
	});
});
