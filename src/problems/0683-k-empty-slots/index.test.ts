import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { kEmptySlots } from ".";

/** Turns bulbs on day by day, checking neighbouring on bulbs each time. */
const bySimulation = (bulbs: number[], k: number): number => {
	const on: number[] = [];
	for (const [i, position] of bulbs.entries()) {
		on.push(position);
		on.sort((a, b) => a - b);
		if (on.some((p, j) => j > 0 && p - (on[j - 1] ?? 0) === k + 1))
			return i + 1;
	}
	return -1;
};

describe("683. K Empty Slots", () => {
	it("solves the examples from the problem statement", () => {
		expect(kEmptySlots([1, 3, 2], 1)).toBe(2);
		expect(kEmptySlots([1, 2, 3], 1)).toBe(-1);
	});

	it("handles k = 0", () => {
		expect(kEmptySlots([3, 1, 2], 0)).toBe(3);
	});

	it("matches turning bulbs on day by day on random inputs", () => {
		const random = createRandom(683);
		for (let run = 0; run < 1000; run++) {
			const bulbs = Array.from(
				{ length: random.int(1, 10) },
				(_, i) => i + 1,
			).sort(() => random.next() - 0.5);
			const k = random.int(0, 5);
			expect(kEmptySlots(bulbs, k)).toBe(bySimulation(bulbs, k));
		}
	});
});
