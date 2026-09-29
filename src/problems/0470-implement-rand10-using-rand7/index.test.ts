import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { implementRand10UsingRand7 } from ".";

describe("470. Implement Rand10() Using Rand7()", () => {
	it("maps the 40 accepted pairs of rand7 results evenly onto 1 to 10", () => {
		// Feed every pair of results once; the 9 rejected pairs roll over into the next ones.
		const results = Array.from({ length: 49 }, (_, i) => [
			Math.floor(i / 7) + 1,
			(i % 7) + 1,
		]).flat();
		let next = 0;
		const rand10 = implementRand10UsingRand7(() => results[next++] ?? 1);
		const counts = new Array<number>(11).fill(0);
		for (let i = 0; i < 40; i++) {
			const value = rand10();
			counts[value] = (counts[value] ?? 0) + 1;
			if (next >= results.length) break;
		}
		expect(counts.slice(1)).toEqual(new Array(10).fill(4));
	});

	it("returns roughly uniform values from 1 to 10 with a random rand7", () => {
		const random = createRandom(470);
		const rand10 = implementRand10UsingRand7(() => random.int(1, 7));
		const counts = new Array<number>(11).fill(0);
		for (let i = 0; i < 100_000; i++) {
			const value = rand10();
			expect(value).toBeGreaterThanOrEqual(1);
			expect(value).toBeLessThanOrEqual(10);
			counts[value] = (counts[value] ?? 0) + 1;
		}
		for (const count of counts.slice(1))
			expect(Math.abs(count - 10_000)).toBeLessThan(500);
	});
});
