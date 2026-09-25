import {
  useState,
} from "react";

import {
  Eye,
  EyeOff,
  LockKeyhole,
  Sparkles,
} from "lucide-react";

import AuthLayout from "../components/auth/AuthLayout";

import {
  resetPassword,
} from "../services/authApi";

function ResetPasswordPage({
  onBack,
  onLogin,
}) {
  const token =
    new URLSearchParams(
      window.location.search,
    ).get("token");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    success,
    setSuccess,
  ] = useState("");

  const submit =
    async (event) => {
      event.preventDefault();

      setError("");
      setSuccess("");

      if (!token) {
        setError(
          "This reset link is invalid.",
        );

        return;
      }

      if (
        password.length < 8
      ) {
        setError(
          "Password must be at least 8 characters.",
        );

        return;
      }

      if (
        password !==
        confirmPassword
      ) {
        setError(
          "Passwords do not match.",
        );

        return;
      }

      setLoading(true);

      try {
        const result =
          await resetPassword(
            token,
            password,
          );

        setSuccess(
          result.message,
        );

        setPassword("");
        setConfirmPassword("");
      } catch (
        requestError
      ) {
        setError(
          requestError.message,
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <AuthLayout
      title="Create a new password"
      subtitle="Choose a new password for your BugLens account."
      onBack={onBack}
      bottomText="Remember your password?"
      bottomAction={{
        label: "Log in",
        onClick: onLogin,
      }}
    >
      <form
        onSubmit={submit}
        className="space-y-5"
      >
        <div>
          <label
            htmlFor="reset-password"
            className="mb-2 block text-sm font-semibold"
          >
            New password
          </label>

          <div className="relative">
            <LockKeyhole
              size={18}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
            />

            <input
              id="reset-password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={password}
              onChange={(
                event,
              ) =>
                setPassword(
                  event.target.value,
                )
              }
              placeholder="At least 8 characters"
              className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] pl-11 pr-11 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  (
                    previous,
                  ) =>
                    !previous,
                )
              }
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
            >
              {showPassword ? (
                <EyeOff
                  size={18}
                />
              ) : (
                <Eye
                  size={18}
                />
              )}
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="reset-confirm-password"
            className="mb-2 block text-sm font-semibold"
          >
            Confirm password
          </label>

          <input
            id="reset-confirm-password"
            type="password"
            value={
              confirmPassword
            }
            onChange={(
              event,
            ) =>
              setConfirmPassword(
                event.target
                  .value,
              )
            }
            placeholder="Repeat your password"
            className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/15 bg-red-500/5 px-4 py-3 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:opacity-60"
        >
          <Sparkles size={17} />

          {loading
            ? "Updating..."
            : "Update password"}
        </button>
      </form>
    </AuthLayout>
  );
}

export default ResetPasswordPage;