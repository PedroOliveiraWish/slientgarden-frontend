import { Auth } from "@/app/types/auth";

export async function authLogin({ username, password }: Auth) {
    const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }),
    })

    if (!response.ok) {
        throw new Error("Failed to login");
    }

    const data = await response.json();
    if (data.error) {
        throw new Error(data.error);
    }
    return data;
}

export async function authRegister({ username, password }: Auth) {
    const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }),
    })

    if (!response.ok) {
        throw new Error("Failed to register");
    }

    const data = await response.json();
    if (data.error) {
        throw new Error(data.error);
    }
    return data;
}