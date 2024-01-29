export default (digits: number[]) =>
    Array.from((BigInt(digits.join('')) + BigInt(1)).toString(), Number);
