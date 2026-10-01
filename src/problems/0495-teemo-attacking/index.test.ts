import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { teemoAttacking as findPoisonedDuration } from ".";

describe("495. Teemo Attacking", () => {
	it("solves the examples from the problem statement", () => {
		expect(findPoisonedDuration([1, 4], 2)).toBe(4);
		expect(findPoisonedDuration([1, 2], 2)).toBe(3);
	});

	it("handles a duration of zero", () => {
		expect(findPoisonedDuration([1, 2, 3], 0)).toBe(0);
	});

	it("matches marking every poisoned second on random inputs", () => {
		const random = createRandom(495);
		for (let run = 0; run < 1000; run++) {
			const timeSeries = [
				...new Set(random.array(random.int(1, 10), 0, 30)),
			].sort((a, b) => a - b);
			const duration = random.int(0, 6);
			const poisoned = new Set(
				timeSeries.flatMap((t) =>
					Array.from({ length: duration }, (_, s) => t + s),
				),
			);
			expect(findPoisonedDuration(timeSeries, duration)).toBe(poisoned.size);
		}
	});
});
