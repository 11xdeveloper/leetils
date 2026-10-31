import { describe, expect, it } from "bun:test";
import { numberOfPrefixConnectedGroups as prefixConnected } from ".";

describe("3839. Number of Prefix Connected Groups", () => {
	it("solves the examples from the problem statement", () => {
		expect(prefixConnected(["apple", "apply", "banana", "bandit"], 2)).toBe(2);
		expect(prefixConnected(["car", "cat", "cartoon"], 3)).toBe(1);
		expect(prefixConnected(["bat", "dog", "dog", "doggy", "bat"], 3)).toBe(2);
	});
});
