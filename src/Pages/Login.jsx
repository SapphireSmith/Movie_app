import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    alert("Logged in!");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <Card className="w-full max-w-sm shadow-lg">
        <form onSubmit={handleSubmit}>
          <CardBody className="flex flex-col gap-6">
            <Typography variant="h4" color="blue-gray" className="text-center">
              Sign In
            </Typography>
            <Input
              label="Email"
              name="email"
              type="email"
              size="lg"
              value={form.email}
              onChange={handleChange}
              required
              crossOrigin=""
            />
            <Input
              label="Password"
              name="password"
              type="password"
              size="lg"
              value={form.password}
              onChange={handleChange}
              required
              crossOrigin=""
            />
          </CardBody>
          <CardFooter className="pt-0 flex flex-col gap-4">
            <Button type="submit" color="blue" fullWidth>
              Login
            </Button>
            <Typography variant="small" className="text-center">
              Don&apos;t have an account?{" "}
              <a href="/register" className="text-blue-600 hover:underline">
                Register
              </a>
            </Typography>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;