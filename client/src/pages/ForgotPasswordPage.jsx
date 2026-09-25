import {
  useState,
} from "react";

import {
  ArrowLeft,
  Mail,
  Sparkles,
} from "lucide-react";

import AuthLayout from "../components/auth/AuthLayout";

import {
  forgotPassword,
} from "../services/authApi";

function ForgotPasswordPage({
  onBack,
  onLogin,
}) {
  const [
    email,
    setEmail,
  ] = useState("");

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

      if (!email.trim()) {
        setError(
          "Please enter your email address.",
        );

        return;
      }

      setLoading(true);

      try {
        const result =
          await forgotPassword(
            email.trim(),
          );

        setSuccess(
          result.message,
        );
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
      title="Forgot your password?"
      subtitle="Enter your email and we'll send you a secure password reset link."
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
            htmlFor="forgot-email"
            className="mb-2 block text-sm font-semibold"
          >
            Email address
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
            />

            <input
              id="forgot-email"
              type="email"
              value={email}
              onChange={(
                event,
              ) =>
                setEmail(
                  event.target.value,
                )
              }
              placeholder="you@example.com"
              className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
          </div>
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
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Sparkles size={17} />

          {loading
            ? "Sending..."
            : "Send reset link"}
        </button>

        <button
          type="button"
          onClick={onLogin}
          className="flex w-full items-center justify-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400"
        >
          <ArrowLeft
            size={14}
          />

          Back to login
        </button>
      </form>
    </AuthLayout>
  );
}

export default ForgotPasswordPage;