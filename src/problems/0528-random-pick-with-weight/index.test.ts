import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { RandomPickWithWeight } from ".";

describe("528. Random Pick with Weight", () => {
	it("always picks the only index", () => {
		const picker = new RandomPickWithWeight([1], createRandom(528).next);
		for (let i = 0; i < 100; i++) expect(picker.pickIndex()).toBe(0);
	});

	it("picks each index in proportion to its weight", () => {
		const weights = [1, 3, 6, 10];
		const picker = new RandomPickWithWeight(weights, createRandom(5280).next);
		const counts = weights.map(() => 0);
		const samples = 100_000;
		for (let i = 0; i < samples; i++) {
			const index = picker.pickIndex();
			counts[index] = (counts[index] ?? 0) + 1;
		}
		for (const [i, weight] of weights.entries())
			expect(Math.abs((counts[i] ?? 0) / samples - weight / 20)).toBeLessThan(
				0.01,
			);
	});

	it("maps the edges of each stretch to the right index", () => {
		const at = (value: number) =>
			new RandomPickWithWeight([1, 3], () => value).pickIndex();
		expect(at(0)).toBe(0);
		expect(at(0.2499)).toBe(0);
		expect(at(0.25)).toBe(1);
		expect(at(0.9999)).toBe(1);
	});
});
