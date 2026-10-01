import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { similarRgbColor as similarRGB } from ".";

describe("800. Similar RGB Color", () => {
	it("solves the examples from the problem statement", () => {
		expect(similarRGB("#09f166")).toBe("#11ee66");
		expect(similarRGB("#4e3fe1")).toBe("#5544dd");
	});

	it("matches trying every shorthand colour component on random colours", () => {
		const random = createRandom(800);
		for (let run = 0; run < 500; run++) {
			const color = `#${random.string(6, "0123456789abcdef")}`;
			const result = similarRGB(color);
			for (let i = 1; i < 7; i += 2) {
				const value = Number.parseInt(color.slice(i, i + 2), 16);
				const chosen = Number.parseInt(result.slice(i, i + 2), 16);
				expect(result.charAt(i)).toBe(result.charAt(i + 1));
				for (let d = 0; d < 16; d++)
					expect((value - chosen) ** 2).toBeLessThanOrEqual(
						(value - 17 * d) ** 2,
					);
			}
		}
	});
});
