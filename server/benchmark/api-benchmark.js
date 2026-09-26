import { performance } from "perf_hooks";

const API_BASE = "https://buglens-api-rseb.onrender.com/api";

const TEST_CASES = [
  {
    name: "JavaScript - TypeError",
    errorText: `
TypeError: Cannot read properties of null (reading 'name')
    at getUser (app.js:12:25)
    at processRequest (app.js:30:5)
    `,
  },
  {
    name: "Python - NameError",
    errorText: `
Traceback (most recent call last):
  File "main.py", line 5, in <module>
    print(username)
NameError: name 'username' is not defined
    `,
  },
  {
    name: "Java - NullPointerException",
    errorText: `
Exception in thread "main" java.lang.NullPointerException:
Cannot invoke "String.length()" because "name" is null
    at Main.main(Main.java:8)
    `,
  },
  {
    name: "C++ - Segmentation Fault",
    errorText: `
Segmentation fault (core dumped)

Program received signal SIGSEGV, Segmentation fault.
0x0000000000401156 in main ()
    `,
  },
  {
    name: "C - Buffer Overflow",
    errorText: `
AddressSanitizer: stack-buffer-overflow
ERROR: AddressSanitizer: stack-buffer-overflow on address
READ of size 4
    `,
  },
  {
    name: "JavaScript - ReferenceError",
    errorText: `
ReferenceError: calculateTotal is not defined
    at app.js:15:20
    `,
  },
  {
    name: "Python - TypeError",
    errorText: `
Traceback (most recent call last):
  File "main.py", line 8, in <module>
    result = numbers + 5
TypeError: can only concatenate list (not "int") to list
    `,
  },
  {
    name: "Java - Compilation Error",
    errorText: `
Main.java:5: error: incompatible types: String cannot be converted to int
    int number = "hello";
                 ^
1 error
    `,
  },
  {
    name: "C++ - Out of Bounds",
    errorText: `
AddressSanitizer: heap-buffer-overflow
READ of size 4
    at main.cpp:12
    `,
  },
  {
    name: "JavaScript - Promise Error",
    errorText: `
UnhandledPromiseRejection:
Error: Failed to fetch user data
    at getUser (api.js:24:11)
    `,
  },
  {
    name: "Python - IndexError",
    errorText: `
Traceback (most recent call last):
  File "main.py", line 10, in <module>
    print(numbers[10])
IndexError: list index out of range
    `,
  },
  {
    name: "Java - ArrayIndexOutOfBounds",
    errorText: `
Exception in thread "main"
java.lang.ArrayIndexOutOfBoundsException: Index 10 out of bounds for length 5
    at Main.main(Main.java:12)
    `,
  },
  {
    name: "C++ - Undefined Reference",
    errorText: `
/usr/bin/ld: undefined reference to 'calculateTotal(int, int)'
collect2: error: ld returned 1 exit status
    `,
  },
  {
    name: "C - Segmentation Fault",
    errorText: `
Segmentation fault (core dumped)
Program received signal SIGSEGV.
Invalid memory reference detected.
    `,
  },
  {
    name: "JavaScript - SyntaxError",
    errorText: `
SyntaxError: Unexpected token '}'
    at compileFunction (node:internal/vm:73:18)
    at app.js:20:1
    `,
  },
  {
    name: "Python - SyntaxError",
    errorText: `
  File "main.py", line 7
    if username
              ^
SyntaxError: invalid syntax
    `,
  },
  {
    name: "Java - ClassNotFoundException",
    errorText: `
java.lang.ClassNotFoundException: com.example.UserService
    at java.base/jdk.internal.loader.BuiltinClassLoader.loadClass
    `,
  },
  {
    name: "C++ - Invalid Conversion",
    errorText: `
error: invalid conversion from 'const char*' to 'int'
    at main.cpp:18
    `,
  },
  {
    name: "JavaScript - Module Not Found",
    errorText: `
Error [ERR_MODULE_NOT_FOUND]:
Cannot find package 'expresss' imported from /app/server.js
    `,
  },
  {
    name: "Python - ModuleNotFoundError",
    errorText: `
Traceback (most recent call last):
  File "main.py", line 2, in <module>
    import requestss
ModuleNotFoundError: No module named 'requestss'
    `,
  },
  {
    name: "Java - NumberFormatException",
    errorText: `
java.lang.NumberFormatException: For input string: "abc"
    at java.lang.Integer.parseInt(Integer.java:668)
    `,
  },
  {
    name: "C++ - Double Free",
    errorText: `
free(): double free detected in tcache 2
Aborted (core dumped)
    `,
  },
  {
    name: "C - Format String",
    errorText: `
warning: format '%d' expects argument of type 'int', but argument 2 has type 'char *'
    at main.c:15
    `,
  },
  {
    name: "JavaScript - JSON Parse Error",
    errorText: `
SyntaxError: Unexpected token '<', "<html>" is not valid JSON
    at JSON.parse
    at response.json (api.js:30:15)
    `,
  },
  {
    name: "Python - KeyError",
    errorText: `
Traceback (most recent call last):
  File "main.py", line 14, in <module>
    print(user["email"])
KeyError: 'email'
    `,
  },
  {
    name: "Java - IllegalArgumentException",
    errorText: `
java.lang.IllegalArgumentException:
Invalid argument supplied to method
    at UserService.createUser(UserService.java:42)
    `,
  },
  {
    name: "C++ - Use After Free",
    errorText: `
AddressSanitizer: heap-use-after-free
READ of size 4
    at main.cpp:25
    `,
  },
  {
    name: "JavaScript - Network Error",
    errorText: `
Error: connect ECONNREFUSED 127.0.0.1:5000
    at TCPConnectWrap.afterConnect
    `,
  },
  {
    name: "Python - AttributeError",
    errorText: `
Traceback (most recent call last):
  File "main.py", line 9, in <module>
    user.get_name()
AttributeError: 'NoneType' object has no attribute 'get_name'
    `,
  },
  {
    name: "Java - SQL Exception",
    errorText: `
java.sql.SQLException:
Column 'username' not found
    at UserRepository.findUser(UserRepository.java:55)
    `,
  },
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function extractCookies(response) {
  if (typeof response.headers.getSetCookie === "function") {
    return response.headers
      .getSetCookie()
      .map((cookie) => cookie.split(";")[0])
      .join("; ");
  }

  const cookie = response.headers.get("set-cookie");

  if (!cookie) return "";

  return cookie
    .split(",")
    .map((part) => part.split(";")[0])
    .join("; ");
}

async function getCsrfToken() {
  const response = await fetch(`${API_BASE}/auth/csrf`);

  if (!response.ok) {
    throw new Error(
      `CSRF request failed: ${response.status} ${await response.text()}`
    );
  }

  const data = await response.json();

  return {
    token: data.csrfToken,
    cookies: extractCookies(response),
  };
}

async function registerTestUser() {
  const { token, cookies } = await getCsrfToken();

  const email = `benchmark_${Date.now()}@example.com`;

  const response = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": token,
      Cookie: cookies,
    },
    body: JSON.stringify({
      name: "BugLens Benchmark",
      email,
      password: "Benchmark@123456",
      agreeToTerms: true,
    }),
  });

  const bodyText = await response.text();

  if (!response.ok) {
    throw new Error(
      `Registration failed: ${response.status} ${bodyText}`
    );
  }

  const authCookies = extractCookies(response);

  return {
    csrfToken: token,
    cookies: `${cookies}; ${authCookies}`.trim(),
    email,
  };
}

async function runAnalysis(testCase, session) {
  const formData = new FormData();

  formData.append("errorText", testCase.errorText);

  const start = performance.now();

  const response = await fetch(`${API_BASE}/analyses`, {
    method: "POST",
    headers: {
      "X-CSRF-Token": session.csrfToken,
      Cookie: session.cookies,
    },
    body: formData,
  });

  const end = performance.now();

  return {
    name: testCase.name,
    latency: (end - start) / 1000,
    success: response.ok,
    status: response.status,
  };
}

async function main() {
  console.log("=================================");
  console.log("BUGLENS 30-REQUEST BENCHMARK");
  console.log("=================================\n");

  console.log("Creating benchmark account...");

  const session = await registerTestUser();

  console.log(`Benchmark account: ${session.email}`);
  console.log("Authentication successful.\n");

  const results = [];

  for (let i = 0; i < TEST_CASES.length; i++) {
    const testCase = TEST_CASES[i];

    console.log(
      `[${i + 1}/${TEST_CASES.length}] ${testCase.name}`
    );

    try {
      const result = await runAnalysis(testCase, session);

      results.push(result);

      console.log(
        result.success
          ? `  ✓ ${result.status} | ${result.latency.toFixed(2)}s`
          : `  ✗ ${result.status} | ${result.latency.toFixed(2)}s`
      );
    } catch (error) {
      console.log(`  ✗ ERROR | ${error.message}`);

      results.push({
        name: testCase.name,
        latency: 0,
        success: false,
        status: 0,
      });
    }

    if (i < TEST_CASES.length - 1) {
      console.log("  Waiting 6 seconds...\n");
      await sleep(6000);
    }
  }

  const successful = results.filter((r) => r.success);

  if (successful.length === 0) {
    console.log("\nNo successful requests.");
    process.exit(1);
  }

  const latencies = successful
    .map((r) => r.latency)
    .sort((a, b) => a - b);

  const average =
    successful.reduce((sum, r) => sum + r.latency, 0) /
    successful.length;

  const min = latencies[0];
  const max = latencies[latencies.length - 1];

  const p95Index = Math.ceil(0.95 * latencies.length) - 1;
  const p95 = latencies[p95Index];

  const successRate =
    (successful.length / results.length) * 100;

  console.log("\n=================================");
  console.log("30-REQUEST BENCHMARK RESULTS");
  console.log("=================================");

  console.log(`Requests tested : ${results.length}`);
  console.log(`Successful      : ${successful.length}`);
  console.log(`Failed          : ${results.length - successful.length}`);
  console.log(`Success rate    : ${successRate.toFixed(2)}%`);
  console.log(`Average latency : ${average.toFixed(2)}s`);
  console.log(`P95 latency     : ${p95.toFixed(2)}s`);
  console.log(`Fastest         : ${min.toFixed(2)}s`);
  console.log(`Slowest         : ${max.toFixed(2)}s`);

  console.log("\n=================================");
  console.log("INDIVIDUAL RESULTS");
  console.log("=================================");

  for (const result of results) {
    console.log(
      `${result.name.padEnd(38)} ${
        result.success
          ? `${result.latency.toFixed(2)}s`
          : `FAILED (${result.status})`
      }`
    );
  }
}

main().catch((error) => {
  console.error("\nBenchmark failed:");
  console.error(error);
  process.exit(1);
});