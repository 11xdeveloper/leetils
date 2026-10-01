import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { RandomPickWithBlacklist } from ".";

describe("710. Random Pick with Blacklist", () => {
	it("picks each allowed number with equal probability", () => {
		const picker = new RandomPickWithBlacklist(
			7,
			[2, 3, 5],
			createRandom(710).next,
		);
		const counts = new Map<number, number>();
		const samples = 80_000;
		for (let i = 0; i < samples; i++) {
			const value = picker.pick();
			counts.set(value, (counts.get(value) ?? 0) + 1);
		}
		expect([...counts.keys()].sort()).toEqual([0, 1, 4, 6]);
		for (const count of counts.values())
			expect(Math.abs(count - samples / 4)).toBeLessThan(samples / 40);
	});

	it("maps every random choice to a distinct allowed number on random blacklists", () => {
		const random = createRandom(7100);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 30);
			const blacklist = [
				...new Set(random.array(random.int(0, n - 1), 0, n - 1)),
			];
			const allowed = n - blacklist.length;
			// Feed each choice in [0, allowed) exactly once.
			let next = 0;
			const picker = new RandomPickWithBlacklist(
				n,
				blacklist,
				() => (next++ + 0.5) / allowed,
			);
			const picks = Array.from({ length: allowed }, () => picker.pick());
			expect(picks.toSorted((a, b) => a - b)).toEqual(
				Array.from({ length: n }, (_, i) => i).filter(
					(i) => !blacklist.includes(i),
				),
			);
		}
	});

	it("handles a huge range", () => {
		const picker = new RandomPickWithBlacklist(
			10 ** 9,
			[0, 1, 2],
			createRandom(7101).next,
		);
		for (let i = 0; i < 1000; i++)
			expect(picker.pick()).toBeGreaterThanOrEqual(3);
	});
});
