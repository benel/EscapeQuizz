# EscapeQuizz: Check an answer with a QR code

## Usage

### Question designing

1. Encode the correct answer with `Base32` scheme on a [Web app](https://cryptii.com/pipes/base32) or a Unix-like shell , e.g.:

  ```
  echo -n "Hello world" | base32
  ```
2. Concatenate the service endpoint and the encoded answer, e.g.:
  ```
  http://localhost:5173/JBSWY3DPEB3W64TMMQ======
  ```
3. Open the HTTP-URI in a browser. You get a warning if the answer was not coded properly.
4. Convert the HTTP-URI into a QR code and paste it next to the quizz question.

### Question answering

1. Flash the QR code.
2. Type your answer in the text box and press `ENTER` key to validate.
3. You get a feedback and can retry if necessary.