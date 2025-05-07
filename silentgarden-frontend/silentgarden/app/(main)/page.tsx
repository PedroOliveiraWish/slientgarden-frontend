"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { AppBanner } from "../components/banner/Banner";

import "../main.css";

const roles = [
  {
    image: "/assets/main/flower-drawer-1.png",
    title: "Write your thoughts",
    role: "Write your thoughts and let them blossom in the garden.",
  },
  {
    image: "/assets/main/flower-drawer-2.png",
    title: "Share your thoughts",
    role: "Share your thoughts with the world and let them bloom.",
  },
  {
    image: "/assets/main/flower-drawer-3.png",
    title: "Save thoughts",
    role: "Save thoughts and let them grow in the garden.",
  },
];

const AboutSection = () => {
  return (
    <section className="about">
      <div className="image">
        <Image
          src="/assets/tree-drawer.png"
          alt="Tree Drawer"
          width={270}
          height={300}
        />
      </div>
      <div className="text">
        <p>
          Silent Garden was created for those who seek a refuge from the storms
          of the mind.
        </p>

        <p>
          Here, your thoughts can blossom in tranquility and your silence will
          be heard.
        </p>
      </div>
    </section>
  );
};

const CardRole = ({
  image,
  title,
  role,
}: {
  image: string;
  title: string;
  role: string;
}) => {
  return (
    <Card className="role-card">
      <Image src={image} width={100} height={95} alt={title} />
      <CardTitle>{title}</CardTitle>
      <CardDescription style={{ fontSize: "1.1rem" }}>{role}</CardDescription>
    </Card>
  );
};

const CardQuote = ({ quote, author }: { quote: string; author: string }) => {
  return (
    <Card className="quote-card">
      <CardHeader>
        <CardTitle style={{ fontSize: "1.5rem", textTransform: "uppercase" }}>
          Quote of the day
        </CardTitle>
        <CardDescription
          style={{ fontSize: "1.3rem", margin: "1rem 0 0.5rem 0" }}
        >
          {quote}
        </CardDescription>
        <CardDescription style={{ fontSize: "1.2rem" }}>
          — {author}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

const CardLogin = () => {
  return (
    <div className="login-card">
      <div>
        <p>Enter the garden and being you healing journey</p>
        <Button className="login-button">
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </div>
  );
};

export default function MainPage() {
  return (
    <main className="main">
      <AppBanner title="Welcome to Silent Garden" />
      <div className="container">
        <AboutSection />
        <div className="roles">
          {roles.map((role) => (
            <CardRole key={role.title} {...role} />
          ))}
        </div>
        <div className="cards">
          <CardQuote
            quote="The mind is a garden, and the thoughts are the seeds."
            author="Anonymous"
          />
          <CardLogin />
        </div>
      </div>
    </main>
  );
}
