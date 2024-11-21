const express = require('express');
const bodyParser = require('body-parser');
const { isValidBase64, decodeBase64, parseData, checkPrimes } = require('./utils');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const USER_ID = "john_doe_17091999";
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";

app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body;

    try {
        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, error: "Invalid 'data' field" });
        }

        const { numbers, alphabets, highestLowercase } = parseData(data);
        const isPrimeFound = checkPrimes(numbers);

        let fileValid = false,
            fileMimeType = null,
            fileSizeKb = null;

        if (file_b64 && isValidBase64(file_b64)) {
            fileValid = true;
            const { mimeType, sizeKb } = decodeBase64(file_b64);
            fileMimeType = mimeType;
            fileSizeKb = sizeKb;
        }

        return res.status(200).json({
            is_success: true,
            user_id: USER_ID,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            numbers,
            alphabets,
            highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
            is_prime_found: isPrimeFound,
            file_valid: fileValid,
            file_mime_type: fileMimeType,
            file_size_kb: fileSizeKb,
        });
    } catch (error) {
        return res.status(500).json({ is_success: false, error: "Server error" });
    }
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
