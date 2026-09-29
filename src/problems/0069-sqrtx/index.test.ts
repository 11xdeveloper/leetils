import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { sqrtx } from ".";

describe("69. Sqrt(x)", () => {
	it("solves the examples from the problem statement", () => {
		expect(sqrtx(4)).toBe(2);
		expect(sqrtx(8)).toBe(2);
	});

	it("handles 0 and 1", () => {
		expect(sqrtx(0)).toBe(0);
		expect(sqrtx(1)).toBe(1);
	});

	it("handles perfect squares and the numbers either side of them", () => {
		for (let root = 2; root <= 1000; root++) {
			expect(sqrtx(root * root - 1)).toBe(root - 1);
			expect(sqrtx(root * root)).toBe(root);
			expect(sqrtx(root * root + 1)).toBe(root);
		}
	});

	it("handles the largest 32-bit integer", () => {
		expect(sqrtx(2 ** 31 - 1)).toBe(46340);
	});

	it("agrees with Math.sqrt on random inputs", () => {
		const random = createRandom(69);
		for (let run = 0; run < 2000; run++) {
			const x = random.int(0, 2 ** 31 - 1);
			expect(sqrtx(x)).toBe(Math.floor(Math.sqrt(x)));
		}
	});
});
