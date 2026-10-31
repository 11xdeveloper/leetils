import { describe, expect, it } from "bun:test";
import { primeSubtractionOperation as primeSubOperation } from ".";

describe("2601. Prime Subtraction Operation", () => {
	it("solves the examples from the problem statement", () => {
		expect(primeSubOperation([4, 9, 6, 10])).toBe(true);
		expect(primeSubOperation([6, 8, 11, 12])).toBe(true);
		expect(primeSubOperation([5, 8, 3])).toBe(false);
	});
});
