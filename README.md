# EscapeQuizz: Check an answer with a QR code

## Usage

### Question designing

1. Encode the correct answer with `Base32` scheme on a [Web app](https://cryptii.com/pipes/base32) or a Unix-like shell , e.g.:

    ```
    echo -n "42|Forty two" | base32
    ```
    When multiple solutions are possible, a `|` ("pipe") must be used between them.
2. Concatenate the service endpoint and the encoded answer, e.g.:
    ```
    http://localhost:5173/GQZHYRTPOJ2HSIDUO5XQ====
    ```
3. Open the HTTP-URI in a browser. You get a warning if the answer was not coded properly.
4. Convert the HTTP-URI into a QR code and paste it next to the quizz question, e.g.:

    > What is the ultimate answer to Life, the Universe and Everything?
    >
    > ![sample QR code](./doc/qr-code.png)

### Question answering

1. Flash the QR code.
2. Type your answer in the text box and press `ENTER` key to validate.
3. You get a feedback and can retry if necessary.
