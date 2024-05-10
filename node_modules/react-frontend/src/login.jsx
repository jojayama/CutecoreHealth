import React, { useState, useEffect } from "react";

export default function LoginPage() {
    return(
        <div className={styles.container}>
                <form className={styles.formBox} onSubmit={handleSubmit}>
                    <h2 className={styles.title}>Login To Your Account</h2>
                    <p className={styles.subtitle}>
                        Organizations & Charities Only
                    </p>

                    <div className={styles.inputBox}>
                        <label htmlFor="email" className={styles.label}>
                            Email Address
                        </label>

                        <div className={styles.inputContainer}>
                            <PersonIcon className={styles.icon}></PersonIcon>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter Your Email Address"
                                className={styles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className={styles.inputBox}>
                        <label htmlFor="email" className={styles.label}>
                            Password
                        </label>

                        <div className={styles.inputContainer}>
                            <LockIcon className={styles.icon}></LockIcon>
                            <input
                                type={showPassword ? "text" : "password"} // Toggle password visibility
                                id="email"
                                placeholder="Enter Your Password"
                                className={styles.input}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)} // Toggle the state on button click
                                className={styles.togglePasswordButton}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <div style={{ paddingTop: "1vw" }}></div>

                    <button
                        type="submit"
                        className={`${styles.button} ${styles.buttonSent}`}
                    >
                        {"Login"}
                    </button>

                    <div className={styles.bottomText}>
                        <Link href="/forgot-password">Forgot Password?</Link>
                    </div>

                    <div className={styles.bottomText}>
                        Don&apos;t Have an Account? Apply for one now!
                    </div>

                    <button
                        type="submit"
                        className={`${styles.button} ${styles.buttonSent}`}
                        onClick={goToSignUp}
                    >
                        {"Sign Up"}
                    </button>
                </form>
            </div>
    )
}