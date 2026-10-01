import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { LoggerRateLimiter } from ".";

describe("359. Logger Rate Limiter", () => {
	it("solves the example from the problem statement", () => {
		const logger = new LoggerRateLimiter();
		const calls: [number, string][] = [
			[1, "foo"],
			[2, "bar"],
			[3, "foo"],
			[8, "bar"],
			[10, "foo"],
			[11, "foo"],
		];
		expect(calls.map(([t, m]) => logger.shouldPrintMessage(t, m))).toEqual([
			true,
			true,
			false,
			false,
			false,
			true,
		]);
	});

	it("matches keeping a log of printed messages on random streams", () => {
		const random = createRandom(359);
		for (let run = 0; run < 200; run++) {
			const logger = new LoggerRateLimiter();
			const printed: [number, string][] = [];
			let timestamp = 0;
			for (let step = 0; step < 40; step++) {
				timestamp += random.int(0, 4);
				const message = ["a", "b", "c"][random.int(0, 2)] ?? "a";
				const expected = !printed.some(
					([t, m]) => m === message && timestamp < t + 10,
				);
				if (expected) printed.push([timestamp, message]);
				expect(logger.shouldPrintMessage(timestamp, message)).toBe(expected);
			}
		}
	});
});
