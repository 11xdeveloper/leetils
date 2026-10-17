import { describe, expect, it } from "bun:test";
import { theTimeWhenTheNetworkBecomesIdle as networkBecomesIdle } from ".";

describe("2039. The Time When the Network Becomes Idle", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			networkBecomesIdle(
				[
					[0, 1],
					[1, 2],
				],
				[0, 2, 1],
			),
		).toBe(8);
		expect(
			networkBecomesIdle(
				[
					[0, 1],
					[0, 2],
					[1, 2],
				],
				[0, 10, 10],
			),
		).toBe(3);
	});

	it("resends right up to the reply's arrival", () => {
		// Round trip 4 with patience 2: resent at 2, last reply at 6.
		expect(
			networkBecomesIdle(
				[
					[0, 1],
					[1, 2],
				],
				[0, 100, 2],
			),
		).toBe(7);
	});
});
