import { describe, expect, it } from "bun:test";
import { phoneNumberPrefix } from ".";

describe("3491. Phone Number Prefix", () => {
	it("solves the examples from the problem statement", () => {
		expect(phoneNumberPrefix(["1", "2", "4", "3"])).toBeTrue();
		expect(phoneNumberPrefix(["001", "007", "15", "00153"])).toBeFalse();
	});
});
