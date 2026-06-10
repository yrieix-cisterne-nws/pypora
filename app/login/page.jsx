export default function Login() {
    return (
        <>
            <h1>Login</h1>
            <div className="error-message hidden">
                <p>Invalid</p>
            </div>
            <form>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />
                <button type="submit">Login</button>
            </form>
            <div>
                <a href="/register">Inscription</a>
            </div>
        </>
    )
}