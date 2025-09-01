// app/(auth)/login/page.js
import styles from "@/styles/auth.module.css";
import Link from "next/link";

export const metadata = { title: "Log In - MyFans" };

export default function LoginPage() {
    return (
        <div className={styles.wrap}>
            <h1 className={styles.title}>Welcome back</h1>
            <form className={styles.form} method="post" action="/api/auth/login">
                <label>
                    <span>Email or Username</span>
                    <input required name="id" placeholder="you@example.com" />
                </label>
                <label>
                    <span>Password</span>
                    <input required type="password" name="password" placeholder="••••••••" />
                </label>
                <button type="submit" className={styles.primary}>Log In</button>
            </form>
            <p className={styles.alt}>
                New here? <Link href="/signup">Create an account</Link>
            </p>
        </div>
    );
}
