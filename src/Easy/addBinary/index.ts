export default (...strs: string[]): string =>
	strs
		.map((str) => BigInt(`0b${str}`))
		.reduce((a, b) => a + b, BigInt(0))
		.toString(2);
