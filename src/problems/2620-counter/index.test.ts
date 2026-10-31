import { describe, expect, it } from "bun:test";
import { counter } from ".";

describe("2620. Counter", () => {
	it("solves the examples from the problem statement", () => {
		const a = counter(10);
		expect([a(), a(), a()]).toEqual([10, 11, 12]);
		const b = counter(-2);
		expect([b(), b(), b(), b(), b()]).toEqual([-2, -1, 0, 1, 2]);
	});

	it("keeps separate counters apart", () => {
		const a = counter(0);
		const b = counter(0);
		a();
		expect([a(), b()]).toEqual([1, 0]);
	});
});
