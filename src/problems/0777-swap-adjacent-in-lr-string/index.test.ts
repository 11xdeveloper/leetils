import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { swapAdjacentInLrString as canTransform } from ".";

const bySearch = (start: string, result: string): boolean => {
	const seen = new Set([start]);
	const queue = [start];
	for (const current of queue) {
		if (current === result) return true;
		for (let i = 0; i + 1 < current.length; i++) {
			const pair = current.slice(i, i + 2);
			const replaced = pair === "XL" ? "LX" : pair === "RX" ? "XR" : undefined;
			if (!replaced) continue;
			const next = current.slice(0, i) + replaced + current.slice(i + 2);
			if (!seen.has(next)) {
				seen.add(next);
				queue.push(next);
			}
		}
	}
	return false;
};

describe("777. Swap Adjacent in LR String", () => {
	it("solves the examples from the problem statement", () => {
		expect(canTransform("RXXLRXRXL", "XRLXXRRLX")).toBeTrue();
		expect(canTransform("X", "L")).toBeFalse();
	});

	it("matches searching every sequence of moves on random strings", () => {
		const random = createRandom(777);
		for (let run = 0; run < 1000; run++) {
			const n = random.int(1, 7);
			const start = random.string(n, "LRXX");
			const result = random.int(0, 1)
				? [...start].sort(() => random.next() - 0.5).join("")
				: random.string(n, "LRXX");
			expect(canTransform(start, result)).toBe(bySearch(start, result));
		}
	});
});
