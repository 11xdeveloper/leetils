export const isHappy = (n: number): boolean => {
	const previous: number[] = [];

	const recurse = (num: number): boolean => {
		if (previous.includes(num)) return false;
		previous.push(num);

		const sum = Array.from(num.toString().split(""), Number).reduce(
			(acc, x) => acc + x * x,
			0,
		);

		return sum === 1 ? true : recurse(sum);
	};

	return recurse(n);
};
