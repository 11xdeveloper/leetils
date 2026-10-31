import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { processStringWithSpecialOperationsI } from "../3612-process-string-with-special-operations-i";
import { processStringWithSpecialOperationsII as processStr } from ".";

describe("3614. Process String with Special Operations II", () => {
	it("solves the examples from the problem statement", () => {
		expect(processStr("a#b%*", 1)).toBe("a");
		expect(processStr("cd%#*#", 3)).toBe("d");
		expect(processStr("z*#", 0)).toBe(".");
	});

	it("matches building the string on random operations", () => {
		const random = createRandom(3614);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 12), "ab*#%");
			const built = processStringWithSpecialOperationsI(s);
			for (let k = 0; k <= built.length; k++)
				expect(processStr(s, k)).toBe(built[k] ?? ".");
		}
	});
});
