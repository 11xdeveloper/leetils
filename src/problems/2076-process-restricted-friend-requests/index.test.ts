import { describe, expect, it } from "bun:test";
import { processRestrictedFriendRequests as friendRequests } from ".";

describe("2076. Process Restricted Friend Requests", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			friendRequests(
				3,
				[[0, 1]],
				[
					[0, 2],
					[2, 1],
				],
			),
		).toEqual([true, false]);
		expect(
			friendRequests(
				3,
				[[0, 1]],
				[
					[1, 2],
					[0, 2],
				],
			),
		).toEqual([true, false]);
		expect(
			friendRequests(
				5,
				[
					[0, 4],
					[1, 2],
					[1, 3],
				],
				[
					[0, 4],
					[1, 2],
					[3, 1],
					[3, 4],
				],
			),
		).toEqual([false, false, false, true]);
	});

	it("accepts requests between people already connected", () => {
		expect(
			friendRequests(
				3,
				[[0, 2]],
				[
					[0, 1],
					[1, 0],
				],
			),
		).toEqual([true, true]);
	});
});
