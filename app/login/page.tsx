"use client";

import { auth } from "@/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type FormErrors = {
  email?: string;
  password?: string;
  passwordConfirm?: string;
};
function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors: FormErrors = {};

    if (!email.trim() || !emailRegex.test(email)) {
      newErrors.email = "Invalid email address";
    }
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!validateForm()) return;
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredentials.user;
      if (user) {
        router.push("/");
      }
      setErrors({});
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen p-10 m-2">
      <form
        className="space-y-4 w-full max-w-2xl shadow-lg p-10"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl text-center font-bold text-[var(--color-secondary-neutral)] ">
          Chat<span className="font-black text-[var(--color-primary)]">2</span>
          Chat
        </h1>

        <div>
          <label className="label">
            <span className="text-base label-text">Email</span>
          </label>
          <input
            type="text"
            placeholder="Enter your email"
            className="w-full input input-bordered "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <span className="text-sm text-[var(--color-error)]">
              {errors.email}
            </span>
          )}
        </div>

        <div>
          <label className="label">
            <span className="text-base label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full input input-bordered "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <span className="text-sm text-[var(--color-error)]">
              {errors.password}
            </span>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="btn btn-primary rounded w-full"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Login"
            )}
          </button>

          <span>
            Do not have an account?{" "}
            <Link
              href="/register"
              className="underline hover:text-[var(--color-secondary-content)]"
            >
              Click here to register
            </Link>{" "}
          </span>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
