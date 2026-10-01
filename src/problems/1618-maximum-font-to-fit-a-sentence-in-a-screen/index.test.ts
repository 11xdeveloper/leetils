import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumFontToFitASentenceInAScreen as maxFont } from ".";

/** A simple font where every character is as wide as the size and twice as tall. */
const fontInfo = {
	getWidth: (fontSize: number, _ch: string) => fontSize,
	getHeight: (fontSize: number) => 2 * fontSize,
};

describe("1618. Maximum Font to Fit a Sentence in a Screen", () => {
	it("solves the examples from the problem statement, with a simple font", () => {
		expect(
			maxFont(
				"helloworld",
				80,
				20,
				[6, 8, 10, 12, 14, 16, 18, 24, 36],
				fontInfo,
			),
		).toBe(8);
		expect(maxFont("leetcode", 1000, 50, [1, 2, 4], fontInfo)).toBe(4);
		expect(maxFont("easyquestion", 100, 100, [10, 15, 20, 25], fontInfo)).toBe(
			-1,
		);
	});

	it("matches trying every font on random inputs", () => {
		const random = createRandom(1618);
		const widths = Array.from({ length: 26 }, () => random.int(1, 3));
		const font = {
			getWidth: (size: number, ch: string) =>
				size * (widths[ch.charCodeAt(0) - 97] ?? 1),
			getHeight: (size: number) => size + 2,
		};
		for (let run = 0; run < 300; run++) {
			const text = random.string(random.int(1, 10), "abcdef");
			const fonts = [...new Set(random.array(random.int(1, 8), 1, 20))].sort(
				(a, b) => a - b,
			);
			const [w, h] = [random.int(1, 200), random.int(1, 25)];
			const fitting = fonts.filter(
				(size) =>
					font.getHeight(size) <= h &&
					[...text].reduce((s, c) => s + font.getWidth(size, c), 0) <= w,
			);
			expect(maxFont(text, w, h, fonts, font)).toBe(fitting.at(-1) ?? -1);
		}
	});
});
