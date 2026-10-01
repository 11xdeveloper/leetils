import { describe, expect, it } from "bun:test";
import { threeDivisors as isThree } from ".";

describe("1952. Three Divisors", () => {
	it("solves the examples from the problem statement", () => {
		expect(isThree(2)).toBeFalse();
		expect(isThree(4)).toBeTrue();
	});

	it("matches counting divisors up to 1000", () => {
		for (let n = 1; n <= 1000; n++) {
			let divisors = 0;
			for (let d = 1; d <= n; d++) if (n % d === 0) divisors++;
			expect(isThree(n)).toBe(divisors === 3);
		}
	});
});
