import { describe, expect, it } from "bun:test";
import { passThePillow } from ".";

describe("2582. Pass the Pillow", () => {
	it("solves the examples from the problem statement", () => {
		expect(passThePillow(4, 5)).toBe(2);
		expect(passThePillow(3, 2)).toBe(3);
	});

	it("matches walking the pillow back and forth", () => {
		for (let n = 2; n <= 6; n++) {
			let holder = 1;
			let direction = 1;
			for (let time = 0; time <= 30; time++) {
				expect(passThePillow(n, time)).toBe(holder);
				if (holder + direction < 1 || holder + direction > n)
					direction = -direction;
				holder += direction;
			}
		}
	});
});
