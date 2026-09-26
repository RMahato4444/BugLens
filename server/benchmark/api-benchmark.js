import { performance } from "perf_hooks";

const API_BASE = "https://buglens-api-rseb.onrender.com/api";

const TEST_CASES = [
  {
    name: "JavaScript - TypeError",
    errorText: `
const user = null;
console.log(user.name);
    `,
  },
  {
    name: "Python - NameError",
    errorText: `
def greet():
    print(username)

greet()
    `,
  },
  {
    name: "Java - NullPointerException",
    errorText: `
String name = null;
System.out.println(name.length());
    `,
  },
  {
    name: "C++ - Segmentation Fault",
    errorText: `
int* ptr = nullptr;
cout << *ptr << endl;
    `,
  },
  {
    name: "C - Buffer Overflow",
    errorText: `
#include <stdio.h>

int main() {
    int arr[3];
    arr[5] = 10;
    return 0;
}
    `,
  },
  {
    name: "JavaScript - Missing Function",
    errorText: `
const result = calculateTotal(10, 20);
console.log(result);
    `,
  },
  {
    name: "Python - TypeError",
    errorText: `
numbers = [1, 2, 3]
result = numbers + 5
print(result)
    `,
  },
  {
    name: "Java - Compilation Error",
    errorText: `
public class Main {
    public static void main(String[] args) {
        int number = "hello";
        System.out.println(number);
    }
}
    `,
  },
  {
    name: "C++ - Out of Bounds",
    errorText: `
vector<int> nums = {1, 2, 3};
cout << nums[10];
    `,
  },
  {
    name: "JavaScript - Async Error",
    errorText: `
async function getData() {
    const response = await fetch("/api/data");
    return response.json();
}

getData().then(console.log);
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

  const latency = (end - start) / 1000;

  const text = await response.text();

  let data = null;

  try {
    data = JSON.parse(text);
  } catch {
    // Response wasn't JSON
  }

  return {
    name: testCase.name,
    latency,
    success: response.ok,
    status: response.status,
    data,
    error: response.ok ? null : text,
  };
}

async function main() {
  console.log("=================================");
  console.log("BUGLENS API BENCHMARK");
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

      if (result.success) {
        console.log(
          `  ✓ ${result.status} | ${result.latency.toFixed(2)}s`
        );
      } else {
        console.log(
          `  ✗ ${result.status} | ${result.latency.toFixed(2)}s`
        );
        console.log(`    ${result.error}`);
      }
    } catch (error) {
      console.log(`  ✗ ERROR | ${error.message}`);

      results.push({
        name: testCase.name,
        latency: 0,
        success: false,
        status: 0,
        error: error.message,
      });
    }

    // Keep the free Groq API usage conservative.
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
  console.log("BENCHMARK RESULTS");
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
      `${result.name.padEnd(35)} ${
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