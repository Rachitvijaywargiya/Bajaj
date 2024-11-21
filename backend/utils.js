const isValidBase64 = (str) => {
    const regex = /^([A-Za-z0-9+/=]+)$/;
    return regex.test(str);
};

const decodeBase64 = (file_b64) => {
    const buffer = Buffer.from(file_b64, 'base64');
    const mimeType = buffer.toString('utf8').slice(0, 15).includes("PNG") ? "image/png" : "unknown";
    const sizeKb = (buffer.length / 1024).toFixed(2);
    return { mimeType, sizeKb };
};

const parseData = (data) => {
    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => isNaN(item) && typeof item === 'string');
    const lowercaseAlphabets = alphabets.filter((char) => char === char.toLowerCase());
    const highestLowercase = lowercaseAlphabets.sort().reverse()[0] || null;

    return { numbers, alphabets, highestLowercase };
};

const checkPrimes = (numbers) => {
    const isPrime = (num) => {
        if (num < 2) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return true;
    };

    return numbers.some((num) => isPrime(Number(num)));
};

module.exports = { isValidBase64, decodeBase64, parseData, checkPrimes };
