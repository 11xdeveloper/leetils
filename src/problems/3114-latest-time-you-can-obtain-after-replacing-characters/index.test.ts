import { describe, expect, it } from "bun:test";
import { latestTimeYouCanObtainAfterReplacingCharacters as findLatestTime } from ".";

describe("3114. Latest Time You Can Obtain After Replacing Characters", () => {
	it("solves the examples from the problem statement", () => {
		expect(findLatestTime("1?:?4")).toBe("11:54");
		expect(findLatestTime("0?:5?")).toBe("09:59");
	});

	it("handles all question marks", () => {
		expect(findLatestTime("??:??")).toBe("11:59");
		expect(findLatestTime("?0:??")).toBe("10:59");
	});
});
