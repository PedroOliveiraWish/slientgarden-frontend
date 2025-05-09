"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Auth } from "../../types/auth";

import "./login.css";

export default function LoginPage() {
  const form = useForm<Auth>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [login, setLogin] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
  }, []);
  

  const handleSubmit = async ({ username, password }: Auth) => {
    setError("");

    if (login) {
      try {
        const response = await fetch("http://localhost:8080/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
          const data: { id: number; username: string } = await response.json();
          localStorage.setItem("user", JSON.stringify(data));
          window.location.href = "/";
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Login failed");
        }
      } catch (error) {
        console.error("Error during login:", error);
        setError("An error occurred. Please try again later.");
      }
    } else {
      try {
        const response = await fetch("http://localhost:8080/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
          const data = await response.json();
          alert(data.message + " You can now login with your credentials.");
          setLogin(true);
        }
      } catch (error) {
        console.error("Error during registration:", error);
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="form-container">
      {login ? (
        <div className="form login">
          <Form {...form}>
            <div className="title-form">
              <h1 className="text-2xl font-bold">Silent Garden Login</h1>
              <p className="text-sm text-gray-600">
                Enter your credentials to access the garden
              </p>
            </div>
            <form
              onSubmit={form.handleSubmit(() =>
                handleSubmit({ username, password })
              )}
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your username"
                        {...field}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <p className="text-red-500">{error}</p>}
              <Button type="submit">Login</Button>
            </form>
          </Form>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">Do not have an account?</p>
            <Button variant="link" onClick={() => setLogin(false)}>
              Register
            </Button>
          </div>
        </div>
      ) : (
        <div className="form register">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(() =>
                handleSubmit({ username, password })
              )}
            >
              <div className="title-form">
                <h1 className="text-2xl font-bold">Silent Garden - Register</h1>
                <p className="text-sm text-gray-600">
                  Create an account to access the garden
                </p>
              </div>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your username"
                        {...field}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <p className="text-red-500">{error}</p>}
              <Button type="submit">Register</Button>
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Already have an account?
                </p>
                <Button variant="link" onClick={() => setLogin(true)}>
                  Login
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}
