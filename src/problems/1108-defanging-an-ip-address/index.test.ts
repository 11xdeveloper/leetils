import { describe, expect, it } from "bun:test";
import { defangingAnIpAddress as defangIPaddr } from ".";

describe("1108. Defanging an IP Address", () => {
	it("solves the examples from the problem statement", () => {
		expect(defangIPaddr("1.1.1.1")).toBe("1[.]1[.]1[.]1");
		expect(defangIPaddr("255.100.50.0")).toBe("255[.]100[.]50[.]0");
	});
});
