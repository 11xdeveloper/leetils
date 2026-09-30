import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { largestTimeForGivenDigits as largestTimeFromDigits } from ".";

describe("949. Largest Time for Given Digits", () => {
	it("solves the examples from the problem statement", () => {
		expect(largestTimeFromDigits([1, 2, 3, 4])).toBe("23:41");
		expect(largestTimeFromDigits([5, 5, 5, 5])).toBe("");
	});

	it("matches counting down from 23:59 on random digits", () => {
		const random = createRandom(949);
		for (let run = 0; run < 500; run++) {
			const arr = random.array(4, 0, 9);
			let expected = "";
			for (let minute = 1439; minute >= 0 && expected === ""; minute--) {
				const time = `${String(Math.floor(minute / 60)).padStart(2, "0")}:${String(minute % 60).padStart(2, "0")}`;
				if (
					[...time.replace(":", "")].sort().join("") === arr.toSorted().join("")
				)
					expected = time;
			}
			expect(largestTimeFromDigits(arr)).toBe(expected);
		}
	});
});
