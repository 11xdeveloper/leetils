import { describe, expect, it } from "bun:test";
import { constructUniformParityArrayI as uniformArray } from ".";

describe("3875. Construct Uniform Parity Array I", () => {
	it("solves the examples from the problem statement", () => {
		expect(uniformArray([2, 3])).toBeTrue();
		expect(uniformArray([4, 6])).toBeTrue();
	});
});
