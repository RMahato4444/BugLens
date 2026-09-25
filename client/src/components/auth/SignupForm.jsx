import {
  Mail,
  Sparkles,
  User,
} from "lucide-react";

import { useState } from "react";

import { useAuth } from "../../context/AuthContext";

import PasswordField from "./PasswordField";
import TextField from "./TextField";

function SignupForm({
  onSuccess,
}) {
  const { register } =
    useAuth();

  const [name, setName] =
    useState("");

  const [
    email,
    setEmail,
  ] = useState("");

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
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [
    agree,
    setAgree,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const handleSubmit =
    async (event) => {
      event.preventDefault();

      setError("");

      if (!name.trim()) {
        setError(
          "Please enter your name.",
        );
        return;
      }

      if (!email.trim()) {
        setError(
          "Please enter your email.",
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

      if (!agree) {
        setError(
          "Please accept the BugLens terms of service and privacy policy.",
        );
        return;
      }

      setIsSubmitting(true);

      try {
        await register({
          name:
            name.trim(),

          email:
            email.trim(),

          password,

          agreeToTerms:
            agree,
        });

        onSuccess?.();
      } catch (
        requestError
      ) {
        setError(
          requestError.message ||
            "Unable to create your account.",
        );
      } finally {
        setIsSubmitting(false);
      }
    };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <TextField
        icon={User}
        label="Full name"
        id="signup-name"
        value={name}
        onChange={(event) =>
          setName(
            event.target.value,
          )
        }
        placeholder="Your name"
      />

      <TextField
        icon={Mail}
        label="Email address"
        id="signup-email"
        value={email}
        onChange={(event) =>
          setEmail(
            event.target.value,
          )
        }
        placeholder="you@example.com"
        type="email"
      />

      <PasswordField
        label="Password"
        id="signup-password"
        value={password}
        onChange={(event) =>
          setPassword(
            event.target.value,
          )
        }
        visible={
          showPassword
        }
        onToggle={() =>
          setShowPassword(
            (value) => !value,
          )
        }
        placeholder="At least 8 characters"
      />

      <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
        <Check
          size={13}
          className={
            password.length >= 8
              ? "text-emerald-500"
              : ""
          }
        />

        Use at least 8 characters.
      </div>

      <PasswordField
        label="Confirm password"
        id="signup-confirm"
        value={
          confirmPassword
        }
        onChange={(event) =>
          setConfirmPassword(
            event.target.value,
          )
        }
        visible={
          showConfirmPassword
        }
        onToggle={() =>
          setShowConfirmPassword(
            (value) => !value,
          )
        }
        placeholder="Repeat your password"
      />

      <label className="flex cursor-pointer items-start gap-3 pt-1">
        <input
          type="checkbox"
          checked={agree}
          onChange={(
            event,
          ) =>
            setAgree(
              event.target
                .checked,
            )
          }
          className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-blue-600"
        />

        <span className="text-xs leading-5 text-[var(--text-secondary)]">
          I agree to the
          BugLens terms of
          service and privacy
          policy.
        </span>
      </label>

      {error && (
        <div className="rounded-xl border border-red-500/10 bg-red-500/5 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      <button
        disabled={
          isSubmitting
        }
        type="submit"
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Sparkles
          size={17}
        />

        {isSubmitting
          ? "Creating account..."
          : "Create BugLens account"}
      </button>
    </form>
  );
}

export default SignupForm;