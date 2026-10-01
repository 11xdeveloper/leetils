import { describe, expect, it } from "bun:test";
import { camelcaseMatching as camelMatch } from ".";

describe("1023. Camelcase Matching", () => {
	const queries = [
		"FooBar",
		"FooBarTest",
		"FootBall",
		"FrameBuffer",
		"ForceFeedBack",
	];

	it("solves the examples from the problem statement", () => {
		expect(camelMatch(queries, "FB")).toEqual([true, false, true, true, false]);
		expect(camelMatch(queries, "FoBa")).toEqual([
			true,
			false,
			true,
			false,
			false,
		]);
		expect(camelMatch(queries, "FoBaT")).toEqual([
			false,
			true,
			false,
			false,
			false,
		]);
	});
});
