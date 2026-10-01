import { describe, expect, it } from "bun:test";
import { magicalString } from ".";

describe("481. Magical String", () => {
	it("solves the examples from the problem statement", () => {
		expect(magicalString(6)).toBe(3);
		expect(magicalString(1)).toBe(1);
	});

	it("counts the ones in the known prefix of the string", () => {
		const prefix =
			"12211212212211211221211212211211212212211212212112112212211212212211211";
		for (let n = 1; n <= prefix.length; n++) {
			expect(magicalString(n)).toBe(
				[...prefix.slice(0, n)].filter((digit) => digit === "1").length,
			);
		}
	});

	it("generates a string whose run lengths spell itself", () => {
		// Recover each digit from how the count of ones changes, then check the runs describe the digits.
		const n = 2000;
		const digits = Array.from({ length: n }, (_, i) =>
			i === 0 || magicalString(i + 1) > magicalString(i) ? 1 : 2,
		);
		const runs = digits.join("").match(/1+|2+/g) ?? [];
		for (const [i, run] of runs.slice(0, -1).entries())
			expect(run.length).toBe(digits[i] ?? 0);
	});
});
