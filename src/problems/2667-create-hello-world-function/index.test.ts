import { describe, expect, it } from "bun:test";
import { createHelloWorldFunction } from ".";

describe("2667. Create Hello World Function", () => {
	it("solves the examples from the problem statement", () => {
		const f = createHelloWorldFunction();
		expect(f()).toBe("Hello World");
		expect(f({}, null, 42)).toBe("Hello World");
	});
});
