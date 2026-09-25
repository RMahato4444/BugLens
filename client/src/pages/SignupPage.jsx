import AuthLayout from "../components/auth/AuthLayout";
import SignupForm from "../components/auth/SignupForm";

function SignupPage({ onBack, onLogin, onSuccess }) {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Build your personal AI-powered debugging workspace."
      onBack={onBack}
      bottomText="Already have an account?"
      bottomAction={{ label: "Log in", onClick: onLogin }}
    >
      <SignupForm onSuccess={onSuccess} />
    </AuthLayout>
  );
}

export default SignupPage;
