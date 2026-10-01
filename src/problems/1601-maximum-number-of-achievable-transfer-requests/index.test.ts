import { describe, expect, it } from "bun:test";
import { maximumNumberOfAchievableTransferRequests as maximumRequests } from ".";

describe("1601. Maximum Number of Achievable Transfer Requests", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maximumRequests(5, [
				[0, 1],
				[1, 0],
				[0, 1],
				[1, 2],
				[2, 0],
				[3, 4],
			]),
		).toBe(5);
		expect(
			maximumRequests(3, [
				[0, 0],
				[1, 2],
				[2, 1],
			]),
		).toBe(3);
		expect(
			maximumRequests(4, [
				[0, 3],
				[3, 1],
				[1, 2],
				[2, 0],
			]),
		).toBe(4);
	});

	it("grants nothing without a cycle", () => {
		expect(
			maximumRequests(3, [
				[0, 1],
				[1, 2],
			]),
		).toBe(0);
	});

	it("handles sixteen requests", () => {
		const requests = Array.from({ length: 16 }, (_, i) => [i % 4, (i + 1) % 4]);
		expect(maximumRequests(4, requests)).toBe(16);
	});
});
