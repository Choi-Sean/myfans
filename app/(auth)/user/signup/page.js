// app/(auth)/user/signup/page.js
import styles from "@/styles/auth.module.css";
import Link from "next/link";

export const metadata = { title: "User Sign Up - MyFans" };

export default function UserSignupPage() {
    return (
        <div className={styles.wrap}>
            <h1 className={styles.title}>Create your account</h1>
            <form className={styles.form}>
                <label>
                    <span>Email</span>
                    <input type="email" name="email" placeholder="you@example.com" required />
                </label>
                <label>
                    <span>Username</span>
                    <input name="username" placeholder="myfans123" required />
                </label>
                <label>
                    <span>Password</span>
                    <input type="password" name="password" placeholder="••••••••" required />
                </label>
                <button type="submit" className={styles.primary}>Sign up</button>
            </form>
            <p className={styles.alt}>
                Already have an account? <Link href="/user/login">Log in</Link>
            </p>
            <p className={styles.alt}>
                Want to earn as a creator? <Link href="/creator/signup">Become a creator</Link>
            </p>
        </div>
    );
}
