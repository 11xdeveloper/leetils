import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { utf8Validation } from ".";

describe("393. UTF-8 Validation", () => {
	it("solves the examples from the problem statement", () => {
		expect(utf8Validation([197, 130, 1])).toBeTrue();
		expect(utf8Validation([235, 140, 4])).toBeFalse();
	});

	it("accepts the UTF-8 encoding of text, including 4-byte characters", () => {
		const bytes = [...new TextEncoder().encode("héllo, 世界 😀")];
		expect(utf8Validation(bytes)).toBeTrue();
		expect(utf8Validation(bytes.slice(0, -1))).toBeFalse();
	});

	it("rejects lengths over 4 bytes and stray continuation bytes", () => {
		expect(
			utf8Validation([
				0b11111000, 0b10000000, 0b10000000, 0b10000000, 0b10000000,
			]),
		).toBeFalse();
		expect(utf8Validation([0b10000000])).toBeFalse();
	});

	it("only looks at the lowest 8 bits of each number", () => {
		expect(utf8Validation([256 + 65])).toBeTrue();
	});

	it("matches the structural rules on random byte sequences", () => {
		const random = createRandom(393);
		const byRules = (data: number[]): boolean => {
			const bytes = data.map((b) => b & 0xff);
			for (let i = 0; i < bytes.length; ) {
				const first = bytes[i] ?? 0;
				const length =
					first < 0x80
						? 1
						: first >= 0xc0 && first < 0xe0
							? 2
							: first >= 0xe0 && first < 0xf0
								? 3
								: first >= 0xf0 && first < 0xf8
									? 4
									: 0;
				if (length === 0 || i + length > bytes.length) return false;
				for (let j = 1; j < length; j++)
					if (((bytes[i + j] ?? 0) & 0xc0) !== 0x80) return false;
				i += length;
			}
			return true;
		};
		for (let run = 0; run < 3000; run++) {
			const data = Array.from(
				{ length: random.int(1, 6) },
				() =>
					[random.int(0, 127), random.int(128, 191), random.int(192, 255)][
						random.int(0, 2)
					] ?? 0,
			);
			expect(utf8Validation(data)).toBe(byRules(data));
		}
	});
});
