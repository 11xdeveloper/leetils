import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { checkIfOneStringSwapCanMakeStringsEqual as areAlmostEqual } from ".";

describe("1790. Check if One String Swap Can Make Strings Equal", () => {
	it("solves the examples from the problem statement", () => {
		expect(areAlmostEqual("bank", "kanb")).toBeTrue();
		expect(areAlmostEqual("attack", "defend")).toBeFalse();
		expect(areAlmostEqual("kelb", "kelb")).toBeTrue();
	});

	it("matches trying every swap on random inputs", () => {
		const random = createRandom(1790);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 6);
			const [s1, s2] = [random.string(n, "ab"), random.string(n, "ab")];
			let expected = s1 === s2;
			for (let i = 0; i < n; i++) {
				for (let j = i + 1; j < n; j++) {
					const chars = [...s1];
					[chars[i], chars[j]] = [chars[j] ?? "", chars[i] ?? ""];
					if (chars.join("") === s2) expected = true;
				}
			}
			expect(areAlmostEqual(s1, s2)).toBe(expected);
		}
	});
});
