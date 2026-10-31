import { describe, expect, it } from "bun:test";
import { infiniteMethodObject } from ".";

describe("2690. Infinite Method Object", () => {
	it("solves the examples from the problem statement", () => {
		const object = infiniteMethodObject();
		expect(object.abc123?.()).toBe("abc123");
		expect(object[".-qw73n|^2It"]?.()).toBe(".-qw73n|^2It");
	});
});
