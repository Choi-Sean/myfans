// app/(auth)/signup/page.js
import styles from "@/styles/auth.module.css";
import Link from "next/link";

export const metadata = { title: "Sign Up - MyFans" };

export default function SignupPage() {
    return (
        <div className={styles.wrap}>
            <h1 className={styles.title}>Create your account</h1>
            <form className={styles.form} method="post" action="/api/auth/signup">
                <label>
                    <span>Email</span>
                    <input required type="email" name="email" placeholder="you@example.com" />
                </label>
                <label>
                    <span>Username</span>
                    <input required name="username" placeholder="myfans123" />
                </label>
                <label>
                    <span>Password</span>
                    <input required type="password" name="password" placeholder="••••••••" />
                </label>
                <button type="submit" className={styles.primary}>Sign Up</button>
            </form>
            <p className={styles.alt}>
                Already have an account? <Link href="/login">Log in</Link>
            </p>
        </div>
    );
}
