import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { jumpGameVII as canReach } from ".";

describe("1871. Jump Game VII", () => {
	it("solves the examples from the problem statement", () => {
		expect(canReach("011010", 2, 3)).toBeTrue();
		expect(canReach("01101110", 2, 3)).toBeFalse();
	});

	it("matches checking every jump on random inputs", () => {
		const random = createRandom(1871);
		for (let run = 0; run < 300; run++) {
			const s = `0${random.string(random.int(1, 15), "001")}`;
			const minJump = random.int(1, s.length - 1);
			const maxJump = random.int(minJump, s.length - 1);
			const reachable = [true];
			for (let i = 1; i < s.length; i++) {
				reachable.push(
					s[i] === "0" &&
						reachable.some((r, j) => r && i - j >= minJump && i - j <= maxJump),
				);
			}
			expect(canReach(s, minJump, maxJump)).toBe(reachable.at(-1) ?? false);
		}
	});
});
