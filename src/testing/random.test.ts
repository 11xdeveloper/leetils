import { describe, expect, it } from "bun:test";
import { createRandom, stringsUpTo } from "./random";

describe("createRandom", () => {
	it("is deterministic for a seed", () => {
		expect(createRandom(7).array(10, 0, 100)).toEqual(
			createRandom(7).array(10, 0, 100),
		);
		expect(createRandom(7).array(10, 0, 100)).not.toEqual(
			createRandom(8).array(10, 0, 100),
		);
	});

	it("stays within bounds and reaches both ends", () => {
		const values = createRandom(1).array(2000, -3, 3);
		expect(Math.min(...values)).toBe(-3);
		expect(Math.max(...values)).toBe(3);
	});

	it("builds strings from the alphabet", () => {
		expect(createRandom(1).string(50, "ab")).toMatch(/^[ab]{50}$/);
	});
});

describe("stringsUpTo", () => {
	it("lists every string, shortest first", () => {
		expect(stringsUpTo(["a", "b"], 2)).toEqual([
			"",
			"a",
			"b",
			"aa",
			"ab",
			"ba",
			"bb",
		]);
	});
});
