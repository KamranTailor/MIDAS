//utils/generate4DigitCode.js

export default function generate4DigitCode() {
    // Generate a random number between 1000 and 9999
    const code = Math.floor(1000 + Math.random()*9000);
    return code.toString();
}