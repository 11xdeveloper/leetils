import { describe, expect, it } from "bun:test";
import { reverseString } from ".";

const reversed = (text: string): string => {
	const s = [...text];
	expect(reverseString(s)).toBeUndefined();
	return s.join("");
};

describe("344. Reverse String", () => {
	it("solves the examples from the problem statement", () => {
		expect(reversed("hello")).toBe("olleh");
		expect(reversed("Hannah")).toBe("hannaH");
	});

	it("handles one and two characters", () => {
		expect(reversed("a")).toBe("a");
		expect(reversed("ab")).toBe("ba");
	});

	it("matches Array.prototype.reverse for every length up to 50", () => {
		for (let n = 1; n <= 50; n++) {
			const text = Array.from({ length: n }, (_, i) =>
				String.fromCharCode(33 + i),
			).join("");
			expect(reversed(text)).toBe([...text].reverse().join(""));
		}
	});
});
