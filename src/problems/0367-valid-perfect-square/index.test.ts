import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { validPerfectSquare } from ".";

describe("367. Valid Perfect Square", () => {
	it("solves the examples from the problem statement", () => {
		expect(validPerfectSquare(16)).toBeTrue();
		expect(validPerfectSquare(14)).toBeFalse();
	});

	it("handles 1 and the numbers around squares", () => {
		expect(validPerfectSquare(1)).toBeTrue();
		for (let root = 2; root <= 2000; root++) {
			expect(validPerfectSquare(root * root)).toBeTrue();
			expect(validPerfectSquare(root * root - 1)).toBeFalse();
			expect(validPerfectSquare(root * root + 1)).toBeFalse();
		}
	});

	it("handles the 32-bit limit", () => {
		expect(validPerfectSquare(2 ** 31 - 1)).toBeFalse();
		expect(validPerfectSquare(46340 * 46340)).toBeTrue();
	});

	it("agrees with Math.sqrt on random inputs", () => {
		const random = createRandom(367);
		for (let run = 0; run < 2000; run++) {
			const num = random.int(1, 2 ** 31 - 1);
			expect(validPerfectSquare(num)).toBe(Number.isInteger(Math.sqrt(num)));
		}
	});
});
