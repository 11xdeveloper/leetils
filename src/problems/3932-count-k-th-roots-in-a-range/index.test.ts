import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countKThRootsInARange as countKthRoots } from ".";

describe("3932. Count K-th Roots in a Range", () => {
	it("solves the examples from the problem statement", () => {
		expect(countKthRoots(1, 9, 3)).toBe(2);
		expect(countKthRoots(8, 30, 2)).toBe(3);
	});

	it("matches listing powers", () => {
		const random = createRandom(3932);
		for (let run = 0; run < 300; run++) {
			const l = random.int(0, 2000);
			const r = random.int(l, l + 3000);
			const k = random.int(1, 6);
			let expected = 0;
			for (let x = 0; x ** k <= r; x++) {
				if (x ** k >= l) expected++;
				if (k === 1 && x > r) break;
			}
			expect(countKthRoots(l, r, k)).toBe(expected);
		}
	});

	it("counts 0 and 1 for any k", () => {
		expect(countKthRoots(0, 1, 30)).toBe(2);
		expect(countKthRoots(0, 1e9, 30)).toBe(2);
	});
});
