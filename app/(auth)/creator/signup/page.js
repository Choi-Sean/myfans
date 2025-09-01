// app/(auth)/creator/signup/page.js
import styles from "@/styles/auth.module.css";
import Link from "next/link";

export const metadata = { title: "Creator Sign Up - MyFans" };

export default function CreatorSignupPage() {
    return (
        <div className={styles.wrap}>
            <h1 className={styles.title}>Become a Creator</h1>
            <form className={styles.form}>
                <label>
                    <span>Email</span>
                    <input type="email" name="email" placeholder="you@example.com" required />
                </label>
                <label>
                    <span>Creator handle</span>
                    <input name="handle" placeholder="@myhandle" required />
                </label>
                <label>
                    <span>Password</span>
                    <input type="password" name="password" placeholder="••••••••" required />
                </label>
                <button type="submit" className={styles.primary}>Create creator account</button>
            </form>
            <p className={styles.alt}>
                Already a creator? <Link href="/creator/login">Log in</Link>
            </p>
            <p className={styles.alt}>
                Not a creator? <Link href="/user/signup">Sign up as user</Link>
            </p>
        </div>
    );
}
