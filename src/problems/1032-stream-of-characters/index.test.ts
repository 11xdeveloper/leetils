import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { StreamOfCharacters as StreamChecker } from ".";

describe("1032. Stream of Characters", () => {
	it("solves the example from the problem statement", () => {
		const stream = new StreamChecker(["cd", "f", "kl"]);
		expect([..."abcdefghijkl"].map((letter) => stream.query(letter))).toEqual([
			false,
			false,
			false,
			true,
			false,
			true,
			false,
			false,
			false,
			false,
			false,
			true,
		]);
	});

	it("matches checking suffixes of the whole stream on random inputs", () => {
		const random = createRandom(1032);
		for (let run = 0; run < 200; run++) {
			const words = Array.from({ length: random.int(1, 5) }, () =>
				random.string(random.int(1, 4), "ab"),
			);
			const stream = new StreamChecker(words);
			let text = "";
			for (let i = 0; i < 30; i++) {
				const letter = random.string(1, "ab");
				text += letter;
				expect(stream.query(letter)).toBe(
					words.some((word) => text.endsWith(word)),
				);
			}
		}
	});
});
