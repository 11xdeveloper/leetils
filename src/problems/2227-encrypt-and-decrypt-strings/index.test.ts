import { describe, expect, it } from "bun:test";
import { EncryptAndDecryptStrings as Encrypter } from ".";

describe("2227. Encrypt and Decrypt Strings", () => {
	it("solves the example from the problem statement", () => {
		const encrypter = new Encrypter(
			["a", "b", "c", "d"],
			["ei", "zf", "ei", "am"],
			["abcd", "acbd", "adbc", "badc", "dacb", "cadb", "cbda", "abad"],
		);
		expect(encrypter.encrypt("abcd")).toBe("eizfeiam");
		expect(encrypter.decrypt("eizfeiam")).toBe(2);
	});

	it("can't encrypt unknown characters", () => {
		const encrypter = new Encrypter(["a"], ["xy"], ["ab"]);
		expect(encrypter.encrypt("ab")).toBe("");
		expect(encrypter.decrypt("")).toBe(0);
		expect(encrypter.decrypt("xy")).toBe(0);
	});
});
