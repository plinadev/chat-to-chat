"use client";

import { auth, firestore } from "@/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AvatarGenerator } from "random-avatar-generator";
import { FormEvent, useEffect, useState } from "react";
type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
};
function RegisterPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  const router = useRouter();

  const generateRandomAvatar = () => {
    const generator = new AvatarGenerator();
    return generator.generateRandomAvatar();
  };

  const handleRefreshAvatar = () => {
    setAvatarUrl(generateRandomAvatar());
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors: FormErrors = {};
    if (!name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!email.trim() || !emailRegex.test(email)) {
      newErrors.email = "Invalid email address";
    }
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (password !== passwordConfirm) {
      newErrors.passwordConfirm = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!validateForm()) return;
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredentials.user;
      const docRef = doc(firestore, "users", user.uid);
      await setDoc(docRef, {
        name,
        email,
        avatarUrl,
      });

      router.push("/");
      setErrors({});
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setAvatarUrl(generateRandomAvatar());
  }, []);

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

        <div className="flex items-center space-y-2 justify-between border border-[var(--color-primary)] p-2 rounded-lg">
          {avatarUrl && (
            <Image
              src={avatarUrl}
              className="rounded-full"
              alt="avatar"
              width={80}
              height={80}
              unoptimized
            />
          )}
          <button
            type="button"
            className="btn btn-outline rounded"
            onClick={handleRefreshAvatar}
            disabled={loading}
          >
            New Avatar
          </button>
        </div>

        <div>
          <label className="label">
            <span className="text-base label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full input input-bordered "
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (
            <span className="text-sm text-[var(--color-error)]">
              {errors.name}
            </span>
          )}
        </div>

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
          <label className="label">
            <span className="text-base label-text">Confirm password</span>
          </label>
          <input
            type="password"
            placeholder="Confirm your password"
            className="w-full input input-bordered "
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          {errors.passwordConfirm && (
            <span className="text-sm text-[var(--color-error)]">
              {errors.passwordConfirm}
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
              "Register"
            )}
          </button>

          <span>
            Already have an account?{" "}
            <Link
              href="/login"
              className="underline hover:text-[var(--color-secondary-content)]"
            >
              Click here to login
            </Link>{" "}
          </span>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
