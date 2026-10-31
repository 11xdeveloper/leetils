import { describe, expect, it } from "bun:test";
import { counterII } from ".";

describe("2665. Counter II", () => {
	it("solves the examples from the problem statement", () => {
		const a = counterII(5);
		expect([a.increment(), a.reset(), a.decrement()]).toEqual([6, 5, 4]);
		const b = counterII(0);
		expect([
			b.increment(),
			b.increment(),
			b.decrement(),
			b.reset(),
			b.reset(),
		]).toEqual([1, 2, 1, 0, 0]);
	});
});
