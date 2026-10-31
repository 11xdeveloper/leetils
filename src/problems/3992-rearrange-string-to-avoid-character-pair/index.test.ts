import { describe, expect, it } from "bun:test";
import { rearrangeStringToAvoidCharacterPair as rearrangeString } from ".";

const valid = (s: string, t: string, x: string, y: string) =>
	[...s].sort().join("") === [...t].sort().join("") &&
	(t.lastIndexOf(y) < t.indexOf(x) || !t.includes(x) || !t.includes(y));

describe("3992. Rearrange String to Avoid Character Pair", () => {
	it("solves the examples from the problem statement", () => {
		expect(rearrangeString("aabc", "a", "c")).toBe("cbaa");
		expect(
			valid("dcab", rearrangeString("dcab", "d", "b"), "d", "b"),
		).toBeTrue();
		expect(rearrangeString("axe", "o", "x")).toBe("xae");
	});
});
