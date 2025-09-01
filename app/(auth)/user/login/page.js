// app/(auth)/user/login/page.js
import styles from "@/styles/auth.module.css";
import Link from "next/link";

export const metadata = { title: "User Log In - MyFans" };

export default function UserLoginPage() {
  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>Welcome back</h1>
      <form className={styles.form}>
        <label>
          <span>Email or Username</span>
          <input name="id" placeholder="you@example.com" required />
        </label>
        <label>
          <span>Password</span>
          <input type="password" name="password" placeholder="••••••••" required />
        </label>
        <button type="submit" className={styles.primary}>Log in</button>
      </form>
      <p className={styles.alt}>
        New here? <Link href="/user/signup">Create an account</Link>
      </p>
      <p className={styles.alt}>
        Are you a creator? <Link href="/creator/login">Creator login</Link>
      </p>
    </div>
  );
}
