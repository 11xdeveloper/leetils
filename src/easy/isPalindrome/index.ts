export const isPalindrome = (x: number): boolean =>
	((s: string) => s.split("").reverse().join("") === s)(x.toString());
