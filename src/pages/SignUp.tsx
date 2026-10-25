import { AuthForm } from "@/components/AuthForm";
import { usePageMeta } from "@/hooks/use-page-meta";

export default function SignUp() {
  usePageMeta({
    title: "Sign up — Flight Price Notifier",
    description: "Create your Flight Price Notifier account.",
  });
  return <AuthForm mode="signup" />;
}
