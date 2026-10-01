import { describe, expect, it } from "bun:test";
import { DesignAuthenticationManager as AuthenticationManager } from ".";

describe("1797. Design Authentication Manager", () => {
	it("solves the example from the problem statement", () => {
		const manager = new AuthenticationManager(5);
		manager.renew("aaa", 1);
		manager.generate("aaa", 2);
		expect(manager.countUnexpiredTokens(6)).toBe(1);
		manager.generate("bbb", 7);
		manager.renew("aaa", 8);
		manager.renew("bbb", 10);
		expect(manager.countUnexpiredTokens(15)).toBe(0);
	});

	it("keeps renewed tokens alive", () => {
		const manager = new AuthenticationManager(3);
		manager.generate("a", 1);
		manager.renew("a", 3);
		expect(manager.countUnexpiredTokens(5)).toBe(1);
		expect(manager.countUnexpiredTokens(6)).toBe(0);
	});
});
