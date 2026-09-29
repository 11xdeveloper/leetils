import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { solveTheEquation as solveEquation } from ".";

describe("640. Solve the Equation", () => {
	it("solves the examples from the problem statement", () => {
		expect(solveEquation("x+5-3+x=6+x-2")).toBe("x=2");
		expect(solveEquation("x=x")).toBe("Infinite solutions");
		expect(solveEquation("2x=x")).toBe("x=0");
	});

	it("handles missing solutions, leading minus signs and zero coefficients", () => {
		expect(solveEquation("x=x+2")).toBe("No solution");
		expect(solveEquation("-x=-1")).toBe("x=1");
		expect(solveEquation("0x=0")).toBe("Infinite solutions");
		expect(solveEquation("10x+3=2x-13")).toBe("x=-2");
	});

	it("recovers x from random equations built around it", () => {
		const random = createRandom(640);
		const term = (coefficient: number) =>
			coefficient === 1 ? "x" : coefficient === -1 ? "-x" : `${coefficient}x`;
		for (let run = 0; run < 1000; run++) {
			const x = random.int(-20, 20);
			let a = random.int(-5, 5);
			if (a === 0) a = 1;
			const extra = random.int(-9, 9);
			const constant = random.int(-50, 50);
			// (a + extra)x + constant = extra·x + (a·x + constant)
			const left = `${term(a + extra)}${constant >= 0 ? "+" : ""}${constant}`;
			const rightConstant = a * x + constant;
			const right = `${term(extra)}${rightConstant >= 0 ? "+" : ""}${rightConstant}`;
			expect(solveEquation(`${left}=${right}`)).toBe(`x=${x}`);
		}
	});
});
