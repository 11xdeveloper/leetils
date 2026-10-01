import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { fourSumII } from ".";

describe("454. 4Sum II", () => {
	it("solves the examples from the problem statement", () => {
		expect(fourSumII([1, 2], [-2, -1], [-1, 2], [0, 2])).toBe(2);
		expect(fourSumII([0], [0], [0], [0])).toBe(1);
	});

	it("matches checking every tuple on random inputs", () => {
		const random = createRandom(454);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 6);
			const [a, b, c, d] = Array.from({ length: 4 }, () =>
				random.array(n, -4, 4),
			);
			let expected = 0;
			for (const w of a ?? [])
				for (const x of b ?? [])
					for (const y of c ?? [])
						for (const z of d ?? []) if (w + x + y + z === 0) expected++;
			expect(fourSumII(a ?? [], b ?? [], c ?? [], d ?? [])).toBe(expected);
		}
	});
});
