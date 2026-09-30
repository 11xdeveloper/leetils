import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { oneBitAnd2BitCharacters as isOneBitCharacter } from ".";

describe("717. 1-bit and 2-bit Characters", () => {
	it("solves the examples from the problem statement", () => {
		expect(isOneBitCharacter([1, 0, 0])).toBeTrue();
		expect(isOneBitCharacter([1, 1, 1, 0])).toBeFalse();
	});

	it("agrees with how random strings of characters were encoded", () => {
		const random = createRandom(717);
		const codes = ["0", "10", "11"];
		for (let run = 0; run < 1000; run++) {
			const characters = Array.from(
				{ length: random.int(1, 8) },
				() => codes[random.int(0, 2)] ?? "0",
			);
			const bits = [...characters.join("")].map(Number);
			if (bits.at(-1) !== 0) continue;
			expect(isOneBitCharacter(bits)).toBe(characters.at(-1) === "0");
		}
	});
});
