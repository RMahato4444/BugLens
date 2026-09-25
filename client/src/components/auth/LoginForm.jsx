import { Mail, Sparkles } from "lucide-react";

import { useState } from "react";

import { useAuth } from "../../context/AuthContext";

import PasswordField from "./PasswordField";
import TextField from "./TextField";

function LoginForm({ onSuccess, onForgotPassword }) {
  const { login } = useAuth();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(true);

  const [error, setError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    setIsSubmitting(true);

    try {
      await login({
        email: email.trim(),
        password,
        rememberMe,
      });

      onSuccess?.();
    } catch (requestError) {
      setError(requestError.message || "Unable to log in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <TextField
        icon={Mail}
        label="Email address"
        id="login-email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@example.com"
        type="email"
      />

      <PasswordField
        label="Password"
        id="login-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        visible={showPassword}
        onToggle={() => setShowPassword((value) => !value)}
        placeholder="Enter your password"
      />

      <div className="flex items-center justify-between">
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
            className="h-4 w-4 rounded border-slate-300 accent-blue-600"
          />

          <span className="text-sm text-[var(--text-secondary)]">
            Remember me
          </span>
        </label>

        <button
          type="button"
          onClick={() => onForgotPassword?.()}
          className="text-xs font-semibold text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Forgot password?
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/10 bg-red-500/5 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      <button
        disabled={isSubmitting}
        type="submit"
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Sparkles size={17} />

        {isSubmitting ? "Signing in..." : "Log in to BugLens"}
      </button>
    </form>
  );
}

export default LoginForm;
