import { describe, expect, it } from "bun:test";
import { strongPasswordCheckerII } from ".";

describe("2299. Strong Password Checker II", () => {
	it("solves the examples from the problem statement", () => {
		expect(strongPasswordCheckerII("IloveLe3tcode!")).toBeTrue();
		expect(strongPasswordCheckerII("Me+You--IsMyDream")).toBeFalse();
		expect(strongPasswordCheckerII("1aB!")).toBeFalse();
	});
});
