import { describe, expect, it } from "bun:test";
import { inversionOfObject } from ".";

describe("2822. Inversion of Object", () => {
	it("solves the examples from the problem statement", () => {
		expect(inversionOfObject({ a: "1", b: "2", c: "3", d: "4" })).toEqual({
			1: "a",
			2: "b",
			3: "c",
			4: "d",
		});
		expect(inversionOfObject({ a: "1", b: "2", c: "2", d: "4" })).toEqual({
			1: "a",
			2: ["b", "c"],
			4: "d",
		});
		expect(inversionOfObject(["1", "2", "4"])).toEqual({
			1: "0",
			2: "1",
			4: "2",
		});
	});
});
