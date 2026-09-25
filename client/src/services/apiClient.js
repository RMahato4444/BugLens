const API_URL = (
  import.meta.env.VITE_API_URL ||
  "/api"
).replace(/\/$/, "");

let csrfToken = null;
let csrfPromise = null;

async function getCsrfToken() {
  if (csrfToken) {
    return csrfToken;
  }

  if (!csrfPromise) {
    csrfPromise =
      fetch(
        `${API_URL}/auth/csrf`,
        {
          credentials:
            "include",
        },
      )
        .then(async (response) => {
          const payload =
            await response.json();

          if (
            !response.ok ||
            !payload?.csrfToken
          ) {
            throw new Error(
              "Unable to initialize secure request protection.",
            );
          }

          csrfToken =
            payload.csrfToken;

          return csrfToken;
        })
        .finally(() => {
          csrfPromise =
            null;
        });
  }

  return csrfPromise;
}

export async function apiRequest(
  path,
  options = {},
) {
  const {
    body,
    headers:
      customHeaders,
    ...rest
  } = options;

  const headers =
    new Headers(
      customHeaders ||
        {},
    );

  if (
    body &&
    !(body instanceof FormData) &&
    !headers.has(
      "Content-Type",
    )
  ) {
    headers.set(
      "Content-Type",
      "application/json",
    );
  }

  const method = (
    rest.method ||
    "GET"
  ).toUpperCase();

  if (
    ![
      "GET",
      "HEAD",
      "OPTIONS",
    ].includes(method)
  ) {
    headers.set(
      "X-CSRF-Token",
      await getCsrfToken(),
    );
  }

  const response =
    await fetch(
      `${API_URL}${path}`,
      {
        ...rest,
        headers,
        credentials:
          "include",
        body,
      },
    );

  const contentType =
    response.headers.get(
      "content-type",
    ) || "";

  const payload =
    contentType.includes(
      "application/json",
    )
      ? await response.json()
      : await response.text();

  if (!response.ok) {
    if (
      response.status ===
      403
    ) {
      csrfToken = null;
    }

    const error =
      new Error(
        typeof payload ===
        "string"
          ? payload ||
            "Request failed."
          : payload?.message ||
            "Request failed.",
      );

    error.status =
      response.status;

    throw error;
  }

  return payload;
}