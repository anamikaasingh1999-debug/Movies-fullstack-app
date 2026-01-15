// import React, { useState } from "react";
// import "./SignInfile.css";
// import { useNavigate } from "react-router-dom";

// function WaveBackground() {
//   return (
//     <div className="wave-background">
//       <svg viewBox="0 0 1440 150" preserveAspectRatio="none">
//         <path
//           fill="#0f5555"
//           d="M0,50 C200,100 400,0 600,50 C800,100 1000,0 1200,50 C1400,100 1440,50 1440,50 L1440,150 L0,150 Z"
//         />
//         <path
//           fill="#0a4545"
//           d="M0,80 C200,120 400,40 600,80 C800,120 1000,40 1200,80 C1400,120 1440,80 1440,80 L1440,150 L0,150 Z"
//         />
//       </svg>
//     </div>
//   );
// }

// function SignIn() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     rememberMe: false,
//   });

//   const navigate = useNavigate();

//   const [errors, setErrors] = useState({});

//   const validate = (name, value) => {
//     let error = "";

//     if (name === "email") {
//       if (!value) error = "Email is required";
//       else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
//         error = "Enter a valid email";
//     }

//     if (name === "password") {
//       if (!value) error = "Password is required";
//       else if (value.length < 6)
//         error = "Password should beat least 6 characters";
//     }

//     return error;
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });

//     const error = validate(name, value);
//     setErrors({ ...errors, [name]: error });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newErrors = {
//       email: validate("email", formData.email),
//       password: validate("password", formData.password),
//     };

//     setErrors(newErrors);

//     if (newErrors.email || newErrors.password) return;

//         localStorage.setItem("formData", JSON.stringify({ formData}));
//         navigate("/", { replace: true }); // 🔥 THIS IS REQUIRED
//     handleReset();
//   };

//   const handleReset = () => {
//     setFormData({
//       email: "",
//       password: "",
//       rememberMe: false,
//     });
//     setErrors({});
//   };

//   const isFormValid =
//     !errors.email &&
//     !errors.password &&
//     formData.email &&
//     formData.password;

//   return (
//     <div className="container">
//       <div className="box">
//         <h1 className="heading">Sign in</h1>

//         <form onSubmit={handleSubmit} noValidate>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             className="inputfield"
//           />
//           {errors.email && <p className="error-text">{errors.email}</p>}

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             className="inputfield"
//           />
//           {errors.password && (
//             <p className="error-text">{errors.password}</p>
//           )}

//           <div className="remember-me">
//             <label>
//               <input
//                 type="checkbox"
//                 name="rememberMe"
//                 checked={formData.rememberMe}
//                 onChange={handleChange}
//               />
//               Remember me
//             </label>
//           </div>

//           <button type="submit" className="submitBtn" disabled={!isFormValid}>
//             Login
//           </button>
//         </form>
//       </div>

//       <WaveBackground />
//     </div>
//   );
// }

// export default SignIn;





import React, { useState } from "react";
import "./SignInfile.css";
import { useNavigate } from "react-router-dom";

/* ===== Wave Background (UNCHANGED) ===== */
function WaveBackground() {
  return (
    <div className="wave-background">
      <svg viewBox="0 0 1440 150" preserveAspectRatio="none">
        <path
          fill="#0f5555"
          d="M0,50 C200,100 400,0 600,50 C800,100 1000,0 1200,50 C1400,100 1440,50 1440,50 L1440,150 L0,150 Z"
        />
        <path
          fill="#0a4545"
          d="M0,80 C200,120 400,40 600,80 C800,120 1000,40 1200,80 C1400,120 1440,80 1440,80 L1440,150 L0,150 Z"
        />
      </svg>
    </div>
  );
}

/* ===== Sign In Component ===== */
function SignIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  /* ===== Validation ===== */
  const validate = (name, value) => {
    let error = "";

    if (name === "email") {
      if (!value) error = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        error = "Enter a valid email";
    }

    if (name === "password") {
      if (!value) error = "Password is required";
      else if (value.length < 6)
        error = "Password should be at least 6 characters";
    }

    return error;
  };

  /* ===== Handle Change ===== */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    setErrors({ ...errors, [name]: validate(name, value) });
  };

  /* ===== Handle Submit (LOGIN API) ===== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    const newErrors = {
      email: validate("email", formData.email),
      password: validate("password", formData.password),
    };

    setErrors(newErrors);
    if (newErrors.email || newErrors.password) return;

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:3000/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password");
      }

      /* ===== Save Login Data ===== */
      localStorage.setItem(
        "formData",
        JSON.stringify({
          token: data.token,
          user: data.user,
        })
      );

      navigate("/", { replace: true });
      handleReset();
    } catch (error) {
      setApiError(error.message);
    } finally {
      setLoading(false);
    }
  };

  /* ===== Reset Form ===== */
  const handleReset = () => {
    setFormData({
      email: "",
      password: "",
      rememberMe: false,
    });
    setErrors({});
  };

  const isFormValid =
    !errors.email &&
    !errors.password &&
    formData.email &&
    formData.password;

  /* ===== UI (UNCHANGED) ===== */
  return (
    <div className="container">
      <div className="box">
        <h1 className="heading">Sign in</h1>

        <form onSubmit={handleSubmit} noValidate>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="inputfield"
          />
          {errors.email && <p className="error-text">{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="inputfield"
          />
          {errors.password && (
            <p className="error-text">{errors.password}</p>
          )}

          {apiError && <p className="error-text">{apiError}</p>}

          <div className="remember-me">
            <label>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="submitBtn"
            disabled={!isFormValid || loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>

      <WaveBackground />
    </div>
  );
}

export default SignIn;
