export default function Register() {
    return (
        <>
            <h1>Register</h1>
            <div className="error-message hidden">
                <p>Invalid</p>
            </div>
            <form>
                <label htmlFor="Username">Username:</label>
                <input type="text" id="Username" name="Username" required />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />
                <button type="submit">Register</button>
            </form>
            <div>
                <a href="/login">Déjà un compte ?</a>
            </div>
        </>
    )
}