import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { missingNumberInArithmeticProgression as missingNumber } from ".";

describe("1228. Missing Number In Arithmetic Progression", () => {
	it("solves the examples from the problem statement", () => {
		expect(missingNumber([5, 7, 11, 13])).toBe(9);
		expect(missingNumber([15, 13, 12])).toBe(14);
	});

	it("handles a constant progression", () => {
		expect(missingNumber([3, 3, 3])).toBe(3);
	});

	it("finds the value removed from random progressions", () => {
		const random = createRandom(1228);
		for (let run = 0; run < 300; run++) {
			const [start, step, length] = [
				random.int(0, 100),
				random.int(-10, 10),
				random.int(4, 20),
			];
			const full = Array.from({ length }, (_, i) => start + i * step);
			const removed = random.int(1, length - 2);
			expect(missingNumber(full.filter((_, i) => i !== removed))).toBe(
				full[removed] ?? 0,
			);
		}
	});
});
