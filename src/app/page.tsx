"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail, Youtube, ArrowRight, Code2, Database, Cloud } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FluidBackground } from "@/components/ui/fluid-background";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <FluidBackground />
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Background Effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background/50 to-background/80 animate-gradient" />
          <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:50px_50px]" />
        </div>

        {/* Hero Section */}
        <div className="section-padding relative">
          <div className="container-padding mx-auto max-w-7xl">
            <div className="relative space-y-8 py-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                  Arashdeep Mehroke
                </h1>
                <h2 className="text-2xl md:text-3xl text-muted-foreground">
                  Machine Learning Engineer
                </h2>
                <p className="text-lg md:text-xl max-w-2xl mx-auto text-muted-foreground">
                  Building intelligent systems that solve real-world problems through machine learning and software engineering.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button size="lg" asChild className="group">
                    <Link href="#projects">
                      View My Work
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="#contact">Get in Touch</Link>
                  </Button>
                </div>
              </motion.div>
              <div className="flex justify-center gap-8 pt-8">
                <div className="flex flex-col items-center gap-2">
                  <Code2 className="h-8 w-8 text-primary" />
                  <span className="text-sm text-muted-foreground">Clean Code</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Database className="h-8 w-8 text-primary" />
                  <span className="text-sm text-muted-foreground">ML Systems</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Cloud className="h-8 w-8 text-primary" />
                  <span className="text-sm text-muted-foreground">Cloud Native</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <AnimatedSection id="about" className="relative">
          <div className="absolute inset-0 bg-muted/50" />
          <div className="relative space-y-8 py-16">
            <h2 className="text-3xl font-bold text-center">About Me</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground">
                  I&apos;m a Machine Learning Engineer passionate about developing scalable AI solutions.
                  Currently focused on building and deploying machine learning models in production environments.
                </p>
                <p className="text-lg text-muted-foreground">
                  With expertise in Python, TensorFlow, and cloud technologies, I create robust and efficient
                  machine learning systems that drive real business value.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                {["Python", "TensorFlow", "AWS", "Unity", "Kubernetes", "Next.js"].map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-background rounded-full text-sm font-medium border border-border hover:border-primary transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Projects Section */}
        <AnimatedSection id="projects" className="relative py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "ML Pipeline Automation",
                description: "Automated machine learning pipeline for real-time data processing",
                tech: "Python, TensorFlow, AWS",
                github: "#",
                demo: "#"
              },
              {
                title: "Computer Vision System",
                description: "Real-time object detection system for industrial applications",
                tech: "Python, OpenCV, PyTorch",
                github: "#",
                demo: "#"
              },
              {
                title: "Cloud ML Platform",
                description: "Scalable machine learning platform for enterprise use",
                tech: "Kubernetes, TensorFlow, GCP",
                github: "#",
                demo: "#"
              }
            ].map((project, index) => (
              <Card key={index} className="group hover:border-primary transition-colors">
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Tech Stack: {project.tech}
                  </p>
                </CardContent>
                <CardFooter className="flex gap-4">
                  <Button variant="outline" size="sm" asChild className="group">
                    <Link href={project.github} target="_blank">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="group">
                    <Link href={project.demo} target="_blank">
                      <ArrowRight className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      Demo
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </AnimatedSection>

        {/* Experience Section */}
        <AnimatedSection id="experience" className="relative">
          <div className="absolute inset-0 bg-muted/50" />
          <div className="relative space-y-12 max-w-3xl mx-auto py-16">
            <h2 className="text-3xl font-bold text-center">Professional Experience</h2>
            {[
              {
                title: "Senior ML Engineer",
                company: "Tech Corp",
                period: "2020 - Present",
                achievements: [
                  "Led development of ML infrastructure serving 1M+ users",
                  "Implemented automated ML pipelines reducing deployment time by 60%",
                  "Mentored junior engineers and conducted technical interviews"
                ]
              },
              {
                title: "ML Engineer",
                company: "AI Solutions",
                period: "2018 - 2020",
                achievements: [
                  "Developed computer vision models for industrial automation",
                  "Optimized model performance reducing inference time by 40%",
                  "Collaborated with cross-functional teams to deliver ML solutions"
                ]
              }
            ].map((exp, index) => (
              <div key={index} className="space-y-4 p-6 bg-background rounded-lg border border-border hover:border-primary transition-colors">
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold">{exp.title}</h3>
                  <p className="text-muted-foreground">{exp.company} • {exp.period}</p>
                </div>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Contact Section */}
        <AnimatedSection id="contact" className="relative py-16">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold text-center">Get in Touch</h2>
            <form className="space-y-6 p-6 bg-muted/50 rounded-lg border border-border">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Your message"
                  className="min-h-[100px] bg-background"
                />
              </div>
              <Button type="submit" className="w-full group">
                Send Message
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
            <div className="flex justify-center gap-4">
              <Button variant="outline" size="icon" asChild className="hover:bg-primary hover:text-primary-foreground transition-colors">
                <Link href="#" target="_blank">
                  <Github className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild className="hover:bg-primary hover:text-primary-foreground transition-colors">
                <Link href="#" target="_blank">
                  <Linkedin className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild className="hover:bg-primary hover:text-primary-foreground transition-colors">
                <Link href="#" target="_blank">
                  <Youtube className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild className="hover:bg-primary hover:text-primary-foreground transition-colors">
                <Link href="#" target="_blank">
                  <Mail className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="text-center">
              <Button variant="link" asChild className="group">
                <Link href="/resume.pdf" target="_blank">
                  Download Resume
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
}
