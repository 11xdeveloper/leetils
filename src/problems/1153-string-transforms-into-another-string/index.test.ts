import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { stringTransformsIntoAnotherString as canConvert } from ".";

const letters = "abcdefghijklmnopqrstuvwxyz";

/**
 * Carries out the conversions: a letter is converted once its target isn't
 * still waiting to be converted itself. Otherwise two letters with the same
 * target are merged, or a cycle is broken by moving one letter to a letter
 * the string doesn't use. Returns whether it reached str2.
 */
const convert = (str1: string, str2: string): boolean => {
	const pending = new Map<string, string>();
	for (let i = 0; i < str1.length; i++) {
		const [from = "", to = ""] = [str1[i], str2[i]];
		if (pending.has(from) && pending.get(from) !== to) return false;
		pending.set(from, to);
	}
	for (const [from, to] of pending) if (from === to) pending.delete(from);
	let s = str1;
	while (pending.size > 0) {
		const ready = [...pending].find(([, to]) => !pending.has(to));
		if (ready) {
			const [from, to] = ready;
			s = s.replaceAll(from, to);
			pending.delete(from);
			continue;
		}
		// Two letters bound for the same place can be merged, freeing one up.
		const sameTarget = [...pending].find(([from, to]) =>
			[...pending].some(([other, target]) => other !== from && target === to),
		);
		if (sameTarget) {
			const [from, to] = sameTarget;
			const other =
				[...pending].find(([o, t]) => o !== from && t === to)?.[0] ?? "";
			s = s.replaceAll(from, other);
			pending.delete(from);
			continue;
		}
		const spare = [...letters].find((letter) => !s.includes(letter));
		if (spare === undefined) return false;
		const [from, to] = [...pending][0] ?? ["", ""];
		s = s.replaceAll(from, spare);
		pending.delete(from);
		pending.set(spare, to);
	}
	return s === str2;
};

describe("1153. String Transforms Into Another String", () => {
	it("solves the examples from the problem statement", () => {
		expect(canConvert("aabcc", "ccdee")).toBeTrue();
		expect(canConvert("leetcode", "codeleet")).toBeFalse();
	});

	it("needs a spare letter to rotate", () => {
		const rotated = letters.slice(1) + letters[0];
		expect(canConvert(letters, rotated)).toBeFalse();
		expect(canConvert(letters, letters)).toBeTrue();
		expect(canConvert(letters, `b${letters.slice(1)}`)).toBeTrue();
		expect(canConvert(letters.slice(0, 25), rotated.slice(0, 25))).toBeTrue();
	});

	it("agrees with carrying out the conversions on random inputs", () => {
		const random = createRandom(1153);
		for (let run = 0; run < 300; run++) {
			const alphabet = random.next() < 0.5 ? "abcd" : letters;
			const str1 =
				alphabet === letters
					? [...letters].sort(() => random.next() - 0.5).join("") +
						random.string(3, "abc")
					: random.string(random.int(1, 8), alphabet);
			const image = new Map(
				[...alphabet].map((letter) => [
					letter,
					alphabet[random.int(0, alphabet.length - 1)] ?? "",
				]),
			);
			if (random.next() < 0.5) {
				const shuffled = [...alphabet].sort(() => random.next() - 0.5);
				[...alphabet].forEach((letter, i) => {
					image.set(letter, shuffled[i] ?? "");
				});
			}
			let str2 = [...str1].map((char) => image.get(char) ?? char).join("");
			if (random.next() < 0.2) {
				const i = random.int(0, str2.length - 1);
				str2 =
					str2.slice(0, i) + random.string(1, alphabet) + str2.slice(i + 1);
			}
			expect(canConvert(str1, str2)).toBe(convert(str1, str2));
		}
	});
});
