import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { EncodeAndDecodeStrings } from ".";

const roundTrip = (strs: string[]): string[] => {
	const codec = new EncodeAndDecodeStrings();
	return new EncodeAndDecodeStrings().decode(codec.encode(strs));
};

describe("271. Encode and Decode Strings", () => {
	it("solves the examples from the problem statement", () => {
		expect(roundTrip(["Hello", "World"])).toEqual(["Hello", "World"]);
		expect(roundTrip([""])).toEqual([""]);
	});

	it("keeps separators, digits and empty strings inside the list", () => {
		expect(roundTrip(["1#2", "#", "", "12#", ""])).toEqual([
			"1#2",
			"#",
			"",
			"12#",
			"",
		]);
	});

	it("round-trips random lists of strings made of any ASCII characters", () => {
		const random = createRandom(271);
		const ascii = Array.from({ length: 256 }, (_, i) =>
			String.fromCharCode(i),
		).join("");
		for (let run = 0; run < 500; run++) {
			const strs = Array.from({ length: random.int(1, 10) }, () =>
				random.string(random.int(0, 12), ascii),
			);
			expect(roundTrip(strs)).toEqual(strs);
		}
	});

	it("handles characters outside ASCII, as the follow-up asks", () => {
		expect(roundTrip(["héllo", "😀#1", "日本"])).toEqual([
			"héllo",
			"😀#1",
			"日本",
		]);
	});
});
