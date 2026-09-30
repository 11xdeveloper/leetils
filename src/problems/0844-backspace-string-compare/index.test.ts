import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { backspaceStringCompare as backspaceCompare } from ".";

const type = (text: string): string => {
	const typed: string[] = [];
	for (const char of text) {
		if (char === "#") typed.pop();
		else typed.push(char);
	}
	return typed.join("");
};

describe("844. Backspace String Compare", () => {
	it("solves the examples from the problem statement", () => {
		expect(backspaceCompare("ab#c", "ad#c")).toBeTrue();
		expect(backspaceCompare("ab##", "c#d#")).toBeTrue();
		expect(backspaceCompare("a#c", "b")).toBeFalse();
	});

	it("matches typing both strings out on random inputs", () => {
		const random = createRandom(844);
		for (let run = 0; run < 1000; run++) {
			const s = random.string(random.int(1, 10), "ab##");
			const t = random.string(random.int(1, 10), "ab##");
			expect(backspaceCompare(s, t)).toBe(type(s) === type(t));
		}
	});
});
