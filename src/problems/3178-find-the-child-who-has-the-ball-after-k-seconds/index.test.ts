import { describe, expect, it } from "bun:test";
import { findTheChildWhoHasTheBallAfterKSeconds as numberOfChild } from ".";

describe("3178. Find the Child Who Has the Ball After K Seconds", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfChild(3, 5)).toBe(1);
		expect(numberOfChild(5, 6)).toBe(2);
		expect(numberOfChild(4, 2)).toBe(2);
	});

	it("matches passing the ball step by step", () => {
		for (let n = 2; n <= 8; n++) {
			let child = 0;
			let step = 1;
			for (let k = 0; k <= 50; k++) {
				expect(numberOfChild(n, k)).toBe(child);
				if (child + step < 0 || child + step >= n) step = -step;
				child += step;
			}
		}
	});
});
