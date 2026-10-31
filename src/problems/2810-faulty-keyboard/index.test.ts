import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { faultyKeyboard as finalString } from ".";

const byBruteForce = (s: string): string => {
	let text = "";
	for (const c of s) text = c === "i" ? [...text].reverse().join("") : text + c;
	return text;
};

describe("2810. Faulty Keyboard", () => {
	it("solves the examples from the problem statement", () => {
		expect(finalString("string")).toBe("rtsng");
		expect(finalString("poiinter")).toBe("ponter");
	});

	it("matches reversing as you type on random strings", () => {
		const random = createRandom(2810);
		for (let run = 0; run < 300; run++) {
			const s = `a${random.string(random.int(0, 12), "abi")}`;
			expect(finalString(s)).toBe(byBruteForce(s));
		}
	});
});
