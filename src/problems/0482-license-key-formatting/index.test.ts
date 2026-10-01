import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { licenseKeyFormatting } from ".";

describe("482. License Key Formatting", () => {
	it("solves the examples from the problem statement", () => {
		expect(licenseKeyFormatting("5F3Z-2e-9-w", 4)).toBe("5F3Z-2E9W");
		expect(licenseKeyFormatting("2-5g-3-J", 2)).toBe("2-5G-3J");
	});

	it("returns an empty string when there are only dashes", () => {
		expect(licenseKeyFormatting("---", 3)).toBe("");
	});

	it("gives groups of k after a shorter first group on random inputs", () => {
		const random = createRandom(482);
		for (let run = 0; run < 1000; run++) {
			const s = random.string(random.int(1, 20), "ab12AB---");
			const k = random.int(1, 5);
			const formatted = licenseKeyFormatting(s, k);
			expect(formatted.replaceAll("-", "")).toBe(
				s.replaceAll("-", "").toUpperCase(),
			);
			const groups = formatted === "" ? [] : formatted.split("-");
			for (const [i, group] of groups.entries()) {
				if (i === 0) expect(group.length).toBeWithin(1, k + 1);
				else expect(group).toHaveLength(k);
			}
		}
	});
});
