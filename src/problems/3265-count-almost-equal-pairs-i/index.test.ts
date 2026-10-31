import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countAlmostEqualPairsI as countPairs } from ".";

/** Breadth-first search over swaps for every pair. */
const byBruteForce = (nums: number[]): number => {
	const width = String(Math.max(...nums)).length;
	const reach = (x: number): Set<string> => {
		let frontier = [String(x).padStart(width, "0")];
		const seen = new Set(frontier);
		for (let s = 0; s < 1; s++) {
			const next: string[] = [];
			for (const v of frontier)
				for (let a = 0; a < width; a++)
					for (let b = a + 1; b < width; b++) {
						const c = [...v];
						[c[a], c[b]] = [c[b] ?? "", c[a] ?? ""];
						const w = c.join("");
						if (!seen.has(w)) {
							seen.add(w);
							next.push(w);
						}
					}
			frontier = next;
		}
		return seen;
	};
	let pairs = 0;
	for (let i = 0; i < nums.length; i++)
		for (let j = i + 1; j < nums.length; j++)
			if (reach(nums[i] ?? 0).has(String(nums[j]).padStart(width, "0")))
				pairs++;
	return pairs;
};

describe("3265. Count Almost Equal Pairs I", () => {
	it("solves the examples from the problem statement", () => {
		expect(countPairs([3, 12, 30, 17, 21])).toBe(2);
		expect(countPairs([1, 1, 1, 1, 1])).toBe(10);
		expect(countPairs([123, 231])).toBe(0);
	});

	it("matches searching swaps for every pair on random arrays", () => {
		const random = createRandom(3265);
		for (let run = 0; run < 100; run++) {
			const digits = random.int(1, 4);
			const nums = Array.from(
				{ length: random.int(2, 8) },
				() => Number(random.string(random.int(1, digits), "0112")) || 1,
			);
			expect(countPairs(nums)).toBe(byBruteForce(nums));
		}
	});
});
