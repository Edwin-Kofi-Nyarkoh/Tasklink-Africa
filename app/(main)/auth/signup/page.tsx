import { SignUpForm } from "@/components/auth/signup-form"
import { AuthLayout } from "@/components/auth/auth-layout"

export default function SignUpPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join TaskLink and connect with professionals"
      linkText="Already have an account? Sign in"
      linkHref="/auth/signin"
    >
      <SignUpForm />
    </AuthLayout>
  )
}
