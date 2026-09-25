import AuthLayout from "../components/auth/AuthLayout";
import LoginForm from "../components/auth/LoginForm";

function LoginPage({
  onBack,
  onSignup,
  onSuccess,
  onForgotPassword,
}) {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue analyzing bugs with BugLens."
      onBack={onBack}
      bottomText="Don't have an account?"
      bottomAction={{
        label: "Create one",
        onClick: onSignup,
      }}
    >
      <LoginForm
        onSuccess={onSuccess}
        onForgotPassword={
          onForgotPassword
        }
      />
    </AuthLayout>
  );
}

export default LoginPage;