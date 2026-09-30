import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumSwapsToGroupAll1sTogether as minSwaps } from ".";

/** Breadth-first search over arrangements, one swap at a time. */
const byBruteForce = (data: number[]): number => {
	const grouped = (s: string) => /^0*1*0*$/.test(s);
	let frontier = [data.join("")];
	const seen = new Set(frontier);
	for (let swaps = 0; ; swaps++) {
		if (frontier.some(grouped)) return swaps;
		const next: string[] = [];
		for (const s of frontier) {
			for (let i = 0; i < s.length; i++) {
				for (let j = i + 1; j < s.length; j++) {
					const chars = [...s];
					[chars[i], chars[j]] = [chars[j] ?? "", chars[i] ?? ""];
					const t = chars.join("");
					if (seen.has(t)) continue;
					seen.add(t);
					next.push(t);
				}
			}
		}
		frontier = next;
	}
};

describe("1151. Minimum Swaps to Group All 1's Together", () => {
	it("solves the examples from the problem statement", () => {
		expect(minSwaps([1, 0, 1, 0, 1])).toBe(1);
		expect(minSwaps([0, 0, 0, 1, 0])).toBe(0);
		expect(minSwaps([1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1])).toBe(3);
	});

	it("handles no 1s", () => {
		expect(minSwaps([0, 0])).toBe(0);
	});

	it("matches searching over swaps on random inputs", () => {
		const random = createRandom(1151);
		for (let run = 0; run < 200; run++) {
			const data = random.array(random.int(1, 9), 0, 1);
			expect(minSwaps(data)).toBe(byBruteForce(data));
		}
	});
});
