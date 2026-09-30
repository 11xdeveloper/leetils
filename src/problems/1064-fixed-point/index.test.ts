import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { fixedPoint } from ".";

describe("1064. Fixed Point", () => {
	it("solves the examples from the problem statement", () => {
		expect(fixedPoint([-10, -5, 0, 3, 7])).toBe(3);
		expect(fixedPoint([0, 2, 5, 8, 17])).toBe(0);
		expect(fixedPoint([-10, -5, 3, 4, 7, 9])).toBe(-1);
	});

	it("matches scanning on random sorted arrays", () => {
		const random = createRandom(1064);
		for (let run = 0; run < 1000; run++) {
			const arr = [...new Set(random.array(random.int(1, 12), -5, 15))].sort(
				(a, b) => a - b,
			);
			expect(fixedPoint(arr)).toBe(arr.findIndex((value, i) => value === i));
		}
	});
});
