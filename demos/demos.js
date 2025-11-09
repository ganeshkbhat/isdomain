const isDomain = require("../index.js")

console.log(isDomain("http://localhost")) // false
console.log(isDomain("http://localhost:9000")) // false
console.log(isDomain("http://localhost.com")) // true
console.log(isDomain("http://localhost.com:9000")) // true
console.log(isDomain("http://www.localhost.com")) // true
console.log(isDomain("http://www.localhost.com:9000")) // true
console.log(isDomain("https://localhost")) // false
console.log(isDomain("https://localhost:9000")) // false
console.log(isDomain("https://localhost.com")) // true
console.log(isDomain("https://localhost.com:9000")) // true
console.log(isDomain("https://www.localhost.com")) // true
console.log(isDomain("https://www.localhost.com:9000")) // true

// --- Example Usage and Testing ---

const testDomains = [
    "example.com",
    "sub.domain.co.uk",
    "google-cloud.ai",
    "a.b",
    "localhost", // Fails: must have a dot for this pattern check
    "hyphen-.com", // Fails: ends with a hyphen
    "-hyphen.com", // Fails: starts with a hyphen
    "inva.lid!", // Fails: invalid character
    "a".repeat(64) + ".com" // Fails: label too long
];

console.log("--- Domain Pattern Validator Results ---");
testDomains.forEach(d => {
    const result = isDomain(d);
    console.log(`'${d}' is valid: ${result}`);
});
