// app/(auth)/creator/login/page.js
import styles from "@/styles/auth.module.css";
import Link from "next/link";

export const metadata = { title: "Creator Log In - MyFans" };

export default function CreatorLoginPage() {
    return (
        <div className={styles.wrap}>
            <h1 className={styles.title}>Creator login</h1>
            <form className={styles.form}>
                <label>
                    <span>Email or Handle</span>
                    <input name="id" placeholder="you@example.com or @handle" required />
                </label>
                <label>
                    <span>Password</span>
                    <input type="password" name="password" placeholder="••••••••" required />
                </label>
                <button type="submit" className={styles.primary}>Log in</button>
            </form>
            <p className={styles.alt}>
                New creator? <Link href="/creator/signup">Create a creator account</Link>
            </p>
            <p className={styles.alt}>
                Looking for a user account? <Link href="/user/login">User login</Link>
            </p>
        </div>
    );
}
