import { describe, expect, it } from "bun:test";
import { knightDialer } from ".";

describe("935. Knight Dialer", () => {
	it("solves the examples from the problem statement", () => {
		expect(knightDialer(1)).toBe(10);
		expect(knightDialer(2)).toBe(20);
		expect(knightDialer(3131)).toBe(136006598);
	});

	it("matches following knight moves on the keypad grid for short numbers", () => {
		const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];
		const position = (digit: number) => keys.indexOf(String(digit));
		const count = (digit: number, left: number): number => {
			if (left === 0) return 1;
			const at = position(digit);
			const [r, c] = [Math.floor(at / 3), at % 3];
			let total = 0;
			for (const [dr, dc] of [
				[1, 2],
				[2, 1],
				[-1, 2],
				[-2, 1],
				[1, -2],
				[2, -1],
				[-1, -2],
				[-2, -1],
			] as const) {
				const [r2, c2] = [r + dr, c + dc];
				const key =
					r2 >= 0 && r2 < 4 && c2 >= 0 && c2 < 3
						? keys[r2 * 3 + c2]
						: undefined;
				if (key !== undefined && /\d/.test(key))
					total += count(Number(key), left - 1);
			}
			return total;
		};
		for (let n = 1; n <= 8; n++)
			expect(knightDialer(n)).toBe(
				Array.from({ length: 10 }, (_, d) => count(d, n - 1)).reduce(
					(a, b) => a + b,
					0,
				),
			);
	});
});
