import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

const GENRES = [
  "Action",
  "Comedy",
  "Drama",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "Animation",
  "Documentary",
  "Fantasy",
];

const GENDERS = ["Male", "Female", "Other"];

const steps = [
  {
    label: "What's your name?",
    field: "name",
    input: (value, onChange) => (
      <Input
        label="Name"
        name="name"
        type="text"
        size="lg"
        value={value}
        onChange={onChange}
        required
        autoFocus
      />
    ),
  },
  {
    label: "What's your email?",
    field: "email",
    input: (value, onChange) => (
      <Input
        label="Email"
        name="email"
        type="email"
        size="lg"
        value={value}
        onChange={onChange}
        required
        autoFocus
      />
    ),
  },
  {
    label: "And a password for that?",
    field: "password",
    input: (value, onChange) => (
      <Input
        label="Password"
        name="password"
        type="password"
        size="lg"
        value={value}
        onChange={onChange}
        required
        autoFocus
      />
    ),
  },
  {
    label: "What's your gender?",
    field: "gender",
    input: (value, onChange) => (
      <div className="flex gap-4 mt-2">
        {GENDERS.map((g) => (
          <label key={g} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              value={g}
              checked={value === g}
              onChange={onChange}
              className="accent-blue-500"
              required
            />
            <span>{g}</span>
          </label>
        ))}
      </div>
    ),
  },
  {
    label: "When were you born?",
    field: "dob",
    input: (value, onChange) => (
      <Input
        label="Date of Birth"
        name="dob"
        type="date"
        size="lg"
        value={value}
        onChange={onChange}
        required
        autoFocus
      />
    ),
  },
  {
    label: "The last step... select some genres you like",
    field: "genres",
    input: (value, onChange) => (
      <div className="flex flex-wrap gap-2 mt-2">
        {GENRES.map((genre) => (
          <button
            type="button"
            key={genre}
            className={`px-3 py-1 rounded-full border transition-all ${
              value.includes(genre)
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-blue-500 border-blue-300 hover:bg-blue-100"
            }`}
            onClick={() => onChange(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
    ),
  },
];

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    gender: "",
    password: "",
    dob: "",
    genres: [],
  });
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState("next"); // for animation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenreToggle = (genre) => {
    setForm((prev) => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter((g) => g !== genre)
        : [...prev.genres, genre],
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step < steps.length - 1) {
      setDirection("next");
      setStep((s) => s + 1);
    } else handleSubmit(e);
  };

  const handleBack = () => {
    if (step > 0) {
      setDirection("prev");
      setStep((s) => s - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("movieapp_user", JSON.stringify(form));
    alert("Registration successful!");
    setForm({
      name: "",
      email: "",
      gender: "",
      password: "",
      dob: "",
      genres: [],
    });
    setStep(0);
  };

  // Animation classes
  const animationClass =
    direction === "next"
      ? "animate-fade-in-right"
      : "animate-fade-in-left";

  return (
    <>
      {/* Animation keyframes */}
      <style>
        {`
        @keyframes fadeInRight {
          0% { opacity: 0; transform: translateX(40px);}
          100% { opacity: 1; transform: translateX(0);}
        }
        @keyframes fadeInLeft {
          0% { opacity: 0; transform: translateX(-40px);}
          100% { opacity: 1; transform: translateX(0);}
        }
        .animate-fade-in-right {
          animation: fadeInRight 0.4s cubic-bezier(.4,0,.2,1);
        }
        .animate-fade-in-left {
          animation: fadeInLeft 0.4s cubic-bezier(.4,0,.2,1);
        }
      `}
      </style>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-100 to-blue-200">
        <Card className="w-full max-w-md shadow-xl">
          <form onSubmit={handleNext}>
            <CardBody className={`flex flex-col gap-8 ${animationClass}`}>
              <Typography
                variant="h2"
                className="text-center mb-2 font-extrabold tracking-tight"
                style={{
                  fontFamily: "'Montserrat', 'Segoe UI', Arial, sans-serif",
                  color: "#3b3b7a",
                  fontSize: "2.2rem",
                  letterSpacing: "0.03em",
                }}
              >
                MovieBox
              </Typography>
              <Typography
                variant="h5"
                className="text-center font-semibold"
                style={{
                  fontFamily: "'Montserrat', 'Segoe UI', Arial, sans-serif",
                  color: "#4f46e5",
                  fontSize: "1.25rem",
                }}
              >
                {steps[step].label}
              </Typography>
              {steps[step].field === "genres"
                ? steps[step].input(form.genres, handleGenreToggle)
                : steps[step].input(form[steps[step].field], handleChange)}
            </CardBody>
            <CardFooter className="pt-0 flex flex-col gap-4">
              <div className="flex justify-between">
                <Button
                  type="button"
                  color="gray"
                  variant="outlined"
                  onClick={handleBack}
                  disabled={step === 0}
                >
                  Back
                </Button>
                <Button type="submit" color="blue" fullWidth={false}>
                  {step === steps.length - 1 ? "Register" : "Next"}
                </Button>
              </div>
              <Typography variant="small" className="text-center">
                Already have an account?{" "}
                <a href="/login" className="text-blue-600 hover:underline">
                  Login
                </a>
              </Typography>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
};

export default Register;