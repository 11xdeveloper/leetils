import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { NumberOfRecentCalls as RecentCounter } from ".";

describe("933. Number of Recent Calls", () => {
	it("solves the example from the problem statement", () => {
		const counter = new RecentCounter();
		expect([1, 100, 3001, 3002].map((t) => counter.ping(t))).toEqual([
			1, 2, 3, 3,
		]);
	});

	it("matches counting the window on random pings", () => {
		const random = createRandom(933);
		const counter = new RecentCounter();
		const times: number[] = [];
		for (let i = 0; i < 1000; i++) {
			const t = (times.at(-1) ?? 0) + random.int(1, 800);
			times.push(t);
			expect(counter.ping(t)).toBe(
				times.filter((time) => time >= t - 3000).length,
			);
		}
	});
});
