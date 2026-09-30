import { describe, expect, it } from "bun:test";
import { armstrongNumber as isArmstrong } from ".";

describe("1134. Armstrong Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(isArmstrong(153)).toBeTrue();
		expect(isArmstrong(123)).toBeFalse();
	});

	it("finds exactly the known Armstrong numbers up to 10^5", () => {
		const found: number[] = [];
		for (let n = 1; n <= 10 ** 5; n++) if (isArmstrong(n)) found.push(n);
		expect(found).toEqual([
			1, 2, 3, 4, 5, 6, 7, 8, 9, 153, 370, 371, 407, 1634, 8208, 9474, 54748,
			92727, 93084,
		]);
	});

	it("recognises the larger ones up to 10^8", () => {
		for (const n of [
			548834, 1741725, 4210818, 9800817, 9926315, 24678050, 24678051, 88593477,
		]) {
			expect(isArmstrong(n)).toBeTrue();
		}
		for (const n of [548835, 88593476, 10 ** 8]) {
			expect(isArmstrong(n)).toBeFalse();
		}
	});
});
