import { describe, expect, it } from "bun:test";
import { minimizeXor } from ".";

describe("2429. Minimize XOR", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimizeXor(3, 5)).toBe(3);
		expect(minimizeXor(1, 12)).toBe(3);
	});

	it("matches trying every x on small inputs", () => {
		const bits = (v: number): number => v.toString(2).split("1").length - 1;
		for (let num1 = 1; num1 <= 40; num1++) {
			for (let num2 = 1; num2 <= 40; num2++) {
				let best = -1;
				for (let x = 0; x < 128; x++)
					if (
						bits(x) === bits(num2) &&
						(best === -1 || (x ^ num1) < (best ^ num1))
					)
						best = x;
				expect(minimizeXor(num1, num2)).toBe(best);
			}
		}
	});
});
