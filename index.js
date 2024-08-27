const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const layoutController = require("./controllers/layoutController");
const carouselController = require("./controllers/carouselController");
const historyController = require("./controllers/historyController");
const directoryController = require("./controllers/directoryController");
const formController = require("./controllers/formController");
const responseController = require("./controllers/responseController");
const userController = require("./controllers/userController");
const connectDB = require("./config/db");
const path = require("path");
const fs = require("fs");
const upload = require("./config/multerCarouselConfig");
const authenticateJWT = require("./middleware/auth"); // Import the middleware
const uploadController = require("./controllers/uploadController");
const videoRoutes = require("./routes/videoRoutes");
const app = express();
const https = require("https");

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const options = {
  key: `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQClj3K42EteXWDz
dE7R2lzuqFrDcyjNp9kRG1H+rg4l64hh8+VaiGWGAMScXuV+qN/DpQ1p4A+SnkZi
ZFtabT3MdKCXehla2WBPGxUG5/CZefVCXKRmsjJ6zWwJEJPDVP47iFTx0pEGq1Pq
pYrZTD3qsV9jOB+TLcEYcDu1xXwQF0M8qUk0Iuvho6l2am4enmtMoA4QoCzjoVxr
x5ChMmfqGa8794948eqy+v540hhfVseN7Wlr9zB+HjXazY8FHzDz2TPJXEB79Ze1
PMID44Q8FrRYlRkagI+dTNzADjQFcUGoMC7WkvCwIjYUv2OIGFlH0HMYEWtd21ka
F9AILlHtAgMBAAECggEAVsXZfhI3Zm0QvGjwSsLlRFzOvXPlJezcM0AbeJ1nYu6Q
264GPq4Qb+yFH+QI6pq+NP+UCTLbVqBICZfJ3Zo18qwJ43qmQVx/QtbR7X2xN++Y
4UBHFmA9Xum9vv6GQ7GPUkqBIwGW62TupaRAIuX36cMvWIR44B3x/8oLMZkhDhkb
Rfdgq2lTKJ6+v5dlnXcPAv54pY2Ze9eEeRHrfl72SyPLFaLNLv4PATkjhkR08JRj
hAQUs4IM8fQA/LT33x+/6uqn07GgjyXapyepzcSj/11vsqrlGkkdw4YRlc9clSBd
XeTuL+Zo1tCsDxFacVFlHYvFpJpecqLtQLl0FmdBgQKBgQDUcvIfYekqUDIgh4bx
l4AaAm9pdwx46fydjQ7Jm0qvljitgUdVenPWwfPbun0/++NFeVaWBAOSg60FTdNC
GaL+hHzjlOvMKFmmGgzjz89f2aV9rv4R0HCHeEvA5EQSHipZnsKdQuA2TxM1wl6Z
eUAX8DwbhP6XfU/e6bc428jyoQKBgQDHf9hHg+FzJibxhHAIKLrRUMRv1UfHq3/w
1l8hL6r5Tw5ml/713lx3HYNikxrM6w3wbNl6sne5WGioEVWUU1RQ8TdAe+qwDGam
RamYvx3qJb/9hS2WH3uGVwO9J8PTCHj+ZMTGSQIS28CF5vib1H1bOBOsc/FRqOvF
DHEKXd2nzQKBgByEVWXLAb5RR3lAV+fD+0kCfKv+c+kjF2qajZqYQr0w/+iiSs35
guUX4cDj1n4pNIeV0v6OCWC4Vhg5KxtbT5q0dAMkcUZVQDtgkcxej6qBD4rAW5BO
l1xH1HtO6Kg57ltbSSpM2MXRdXWo4oPdV7Ie6CKVhosVIgx8+MAkGGQhAoGBAKdg
E0ys0NGTCMlIm9W8lkBWyvgosHhM4qJkuJtXKtLQCPz6OOZ/EIS/NiPV135lFuTH
7g6K/Pd7vRKEuJAg+XSPbBOl41igjt6hQ5Drh2WTFmjU+1IgR7qF9pUUb672RMzq
Lk1No3e+9t9g0OOsex+1BIyDGcuxNV20+oIADp9hAoGAVG2cOpE83XnSkzkzeF/J
QciEQNMvhSQidekzItyrNAvUOezXzZc9aGDfKXq/u55tZAzkkP5ol8q6aXdIOfr0
yOmRWTQ1x4HyGEIi0usAIgyKTkccEfMss/BnPwFPoJx+n9U7wiRrVhqsaRa0knLm
mry11Pl8CtjJulotdHlHtaQ=
-----END PRIVATE KEY-----`,
  cert: `-----BEGIN CERTIFICATE-----
MIIFCzCCA/OgAwIBAgISBLhtOHIhgkKCKS9wiv4Es63YMA0GCSqGSIb3DQEBCwUA
MDMxCzAJBgNVBAYTAlVTMRYwFAYDVQQKEw1MZXQncyBFbmNyeXB0MQwwCgYDVQQD
EwNSMTAwHhcNMjQwODE3MTIyMjU5WhcNMjQxMTE1MTIyMjU4WjAoMSYwJAYDVQQD
Ex1ndWlkZXBsdXMuY2xlYXJ0b3VjaG1lZGlhLmNvbTCCASIwDQYJKoZIhvcNAQEB
BQADggEPADCCAQoCggEBAKWPcrjYS15dYPN0TtHaXO6oWsNzKM2n2REbUf6uDiXr
iGHz5VqIZYYAxJxe5X6o38OlDWngD5KeRmJkW1ptPcx0oJd6GVrZYE8bFQbn8Jl5
9UJcpGayMnrNbAkQk8NU/juIVPHSkQarU+qlitlMPeqxX2M4H5MtwRhwO7XFfBAX
QzypSTQi6+GjqXZqbh6ea0ygDhCgLOOhXGvHkKEyZ+oZrzv3j3jx6rL6/njSGF9W
x43taWv3MH4eNdrNjwUfMPPZM8lcQHv1l7U8wgPjhDwWtFiVGRqAj51M3MAONAVx
QagwLtaS8LAiNhS/Y4gYWUfQcxgRa13bWRoX0AguUe0CAwEAAaOCAiIwggIeMA4G
A1UdDwEB/wQEAwIFoDAdBgNVHSUEFjAUBggrBgEFBQcDAQYIKwYBBQUHAwIwDAYD
VR0TAQH/BAIwADAdBgNVHQ4EFgQUJk/WqOa+22e9UxijggJCYdNDzBIwHwYDVR0j
BBgwFoAUu7zDR6XkvKnGw6RyDBCNojXhyOgwVwYIKwYBBQUHAQEESzBJMCIGCCsG
AQUFBzABhhZodHRwOi8vcjEwLm8ubGVuY3Iub3JnMCMGCCsGAQUFBzAChhdodHRw
Oi8vcjEwLmkubGVuY3Iub3JnLzAoBgNVHREEITAfgh1ndWlkZXBsdXMuY2xlYXJ0
b3VjaG1lZGlhLmNvbTATBgNVHSAEDDAKMAgGBmeBDAECATCCAQUGCisGAQQB1nkC
BAIEgfYEgfMA8QB2AD8XS0/XIkdYlB1lHIS+DRLtkDd/H4Vq68G/KIXs+GRuAAAB
kWCAC+8AAAQDAEcwRQIhAMIfjsNgGK36nOv6uQoy371GidSfbLQ5Y1ZPs6xn55RU
AiAn/Oc18fyPa8xoaqVSc2UwihZ/BpmlikqTM9i5ju2wFAB3AN/hVuuqBa+1nA+G
cY2owDJOrlbZbqf1pWoB0cE7vlJcAAABkWCADPcAAAQDAEgwRgIhANd0MJN8yRnQ
XvFB2kNO8Lx9O2YXfeX3Jl8B2kRCGbUAAiEA0IDLPmilE3BFGqox5On44nSrPhtn
MHaWRrfmQkpInUkwDQYJKoZIhvcNAQELBQADggEBADWNQWOmSKUWWLQz1xBGbp5g
q7wJeNceDbYpre1kylLgxmcot8Gy1Ul+ciwR6+kz0bHsePFokzGuto/cqS4kvNFb
+BGNBktGNDINqFWJKf2z7BF7hmHvdJdZKV/D6YC4Fev/asmJ7+f/qojrgr7rR1CI
36d8UTP3eHIU7N23geayNiLZOBkjWyg9lXjslqVsRzjFUaplBfdeZ83KxpxEJhx9
0IEWuQtN2FYbv2WeliFC/+1KURVuVlfqVYSzMoY+5+132YbEE0zRvgzkMpiO/OrK
H7Yjr5ijEA6P0pYjxk/oy65/cvCTrxLlPvp/G6PQPGt+Dmnfm9Jx0gPbGf6zLxk=
-----END CERTIFICATE-----`,
};

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Example route (public)
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Protected routes (using the authenticateJWT middleware)
app.use("/api/layouts", authenticateJWT, layoutController);
app.use(
  "/api/carousels",
  authenticateJWT,
  upload.array("images"),
  carouselController,
);
app.use("/api/history", authenticateJWT, historyController);
app.use("/api/directories", authenticateJWT, directoryController);
app.use("/api/forms", authenticateJWT, formController);
app.use("/api/responses", authenticateJWT, responseController);
app.use("/api/users", userController);
app.use("/api/upload", uploadController);
app.use("/api/videos", videoRoutes);
// Error handling middleware (optional)
app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message });
});

// Connect to the database and then start the server
const port = process.env.PORT || 5000;

https.createServer(options, app).listen(443, () => {
  console.log("HTTPS server running on port 443");
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
    process.exit(1); // Exit process with failure
  });
