import "../auth.form.scss";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const Register = () => {

  const { handleRegister, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    handleRegister({
      email,
      username,
      password,
    });

    navigate("/");
  };

  if (loading) {
    return (
      <main className="auth-page">
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <main className="auth-page">
      <div className="auth-shell">

        <aside className="auth-side">
          <div className="auth-side__eyebrow">
            HIGH-PERFORMANCE CAREER HUB
          </div>

          <h1 className="auth-side__title">
            AI-JOB-HELPER
          </h1>

          <p className="auth-side__copy">
            Upload your resume and target job description.
            Our AI analyzes your skill gaps, generates tailored
            technical and behavioral questions, and delivers an
            optimized, high-performance resume PDF.
          </p>
        </aside>

        <section className="auth-panel">

          <div className="auth-panel__top">
            <Link className="auth-top-link" to="/login">
              Login
            </Link>

            <Link
              className="auth-top-link active"
              to="/register"
            >
              Register
            </Link>
          </div>

          <div className="auth-content">

            <p className="auth-eyebrow">
              Register Access
            </p>

            <p className="auth-subtitle">
              Create your credentials to begin.
            </p>

            <div className="auth-switch-tabs">
              <Link to="/login">
                Login
              </Link>

              <Link
                className="active"
                to="/register"
              >
                Register
              </Link>
            </div>

            <form
              className="auth-form"
              onSubmit={handleSubmit}
            >
              <div className="auth-field">
                <label>USERNAME</label>

                <input
                  type="text"
                  placeholder="Commander Handle"
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                />
              </div>

              <div className="auth-field">
                <label>EMAIL</label>

                <input
                  type="email"
                  placeholder="name@career.ai"
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />
              </div>

              <div className="auth-field">
                <label>PASSWORD</label>

                <input
                  type="password"
                  placeholder="••••••••"
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />
              </div>

              <button
                className="auth-submit-button"
                type="submit"
              >
                Sign Up
              </button>
            </form>

            <p className="auth-switch">
              Already have an account?{" "}
              <Link to="/login">
                Login
              </Link>
            </p>

          </div>

        </section>

      </div>
    </main>
  );
};

export default Register;