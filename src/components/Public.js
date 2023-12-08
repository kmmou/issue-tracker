import { Link } from 'react-router-dom';

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Issue Tracker</h1>
            </header>
            <main className="public__main">
                <Link to="/login">Login</Link>
            </main>
        </section>
    )

    return content;
}

export default Public;