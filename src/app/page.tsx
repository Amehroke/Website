"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ArrowRight, 
  Code2, 
  Database, 
  Cloud,
  Code as PythonIcon,
  Database as SQLIcon,
  Code2 as CppIcon,
  Brain,
  Layers,
  LineChart,
  Cloud as CloudIcon,
  Container,
  GitBranch,
  GitCommit,
  GitPullRequest,
  Beaker as FlaskIcon,
  Server,
  Globe,
  Terminal,
  BarChart,
  Map
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FluidBackground } from "@/components/ui/fluid-background";
import { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: "" });

    try {
      // Send form submission to your email
      const formResponse = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: "arashdeepmehrokework@gmail.com",
        }
      );

      if (formResponse.status === 200) {
        try {
          // Send auto-reply to the sender
          const autoReplyResponse = await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
            process.env.NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID!,
            {
              to_name: formData.name,
              to_email: formData.email,
              from_name: "Arashdeep Mehroke",
              reply_to: "arashdeepmehrokework@gmail.com",
              message: formData.message,
            }
          );

          if (autoReplyResponse.status === 200) {
            setFormStatus({
              type: "success",
              message: "Message sent successfully! You will receive a confirmation email shortly.",
            });
            setFormData({ name: "", email: "", message: "" });
          } else {
            console.error("Auto-reply failed:", autoReplyResponse);
            setFormStatus({
              type: "success",
              message: "Message sent successfully! However, there was an issue sending the confirmation email.",
            });
          }
        } catch (autoReplyError) {
          console.error("Auto-reply error:", autoReplyError);
          setFormStatus({
            type: "success",
            message: "Message sent successfully! However, there was an issue sending the confirmation email.",
          });
        }
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus({
        type: "error",
        message: "Failed to send message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
                <h1 className="text-5xl md:text-7xl font-bold animated-gradient">
                  Arashdeep Mehroke
                </h1>
                <h2 className="text-2xl md:text-3xl text-muted-foreground">
                  Machine Learning Engineer | Data Scientist
                </h2>
                <p className="text-lg md:text-xl max-w-2xl text-muted-foreground">
                  Solving real-world problems with AI, cloud infrastructure, and big data. With 3+ years of experience and a Master&apos;s in progress at Georgia Tech, I build intelligent systems that scale.
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
                  I&apos;m deeply passionate about data science and machine learning—fields that constantly challenge me to think critically, build creatively, and solve meaningful problems. I&apos;m currently pursuing a Master&apos;s in Data Science at Georgia Tech to deepen my understanding, while continuously working on hands-on projects ranging from real-time emotion recognition to computer vision and synthetic data generation.
                </p>
                <p className="text-lg text-muted-foreground">
                  I thrive on learning by doing, whether it&apos;s building full-stack applications or optimizing machine learning pipelines. My technical toolkit includes Python, SQL, Java, TensorFlow, PyTorch, Scikit-learn, Docker, Kubernetes, AWS, GCP, Pandas, NumPy, Tableau, Power BI, and ArcGIS.
                </p>
              </div>
              <div className="flex flex-wrap gap-6 justify-center">
                {[
                  { name: "Python", icon: PythonIcon },
                  { name: "SQL", icon: SQLIcon },
                  { name: "C++", icon: CppIcon },
                  { name: "TensorFlow", icon: Brain },
                  { name: "PyTorch", icon: Layers },
                  { name: "Scikit-learn", icon: LineChart },
                  { name: "XGBoost", icon: LineChart },
                  { name: "AWS", icon: CloudIcon },
                  { name: "GCP", icon: CloudIcon },
                  { name: "Docker", icon: Container },
                  { name: "Kubernetes", icon: GitBranch },
                  { name: "Git", icon: GitCommit },
                  { name: "CI/CD", icon: GitPullRequest },
                  { name: "Flask", icon: FlaskIcon },
                  { name: "Django", icon: Server },
                  { name: "React", icon: Globe },
                  { name: "Node.js", icon: Terminal },
                  { name: "Power BI", icon: BarChart },
                  { name: "ArcGIS", icon: Map }
                ].map((skill) => (
                  <div
                    key={skill.name}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="p-3 rounded-lg bg-background border border-border group-hover:border-primary transition-colors">
                      <skill.icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                      {skill.name}
                    </span>
                  </div>
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
                title: "Machine Learning Engineer",
                description: "Real-time DL model for facial emotion recognition with 88% accuracy",
                tech: "Python, TensorFlow, OpenCV",
                github: "https://github.com/yourusername/emotion-detection",
                demo: "#"
              },
              {
                title: "Real-Time Theft Detection System",
                description: "Edge-based CV system using YOLOv8n and pose tracking to detect theft via live RTSP camera feeds",
                tech: "Python, YOLOv8, OpenCV",
                github: "https://github.com/Amehroke/IP_Camera_App",
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
          <div className="relative space-y-12 max-w-3xl mx-auto py-16">
            <h2 className="text-3xl font-bold text-center">Professional Experience</h2>
            {[
              {
                title: "Machine Learning Engineer",
                company: "Office of Performance and Data Analytics",
                period: "May 2024 - Present",
                achievements: [
                  "Developed and optimized PyTorch-based deep learning models to enhance urban safety initiatives",
                  "Designed and deployed ETL pipelines using Azure Databricks, improving efficiency and ensuring data integrity",
                  "Created an interactive dashboard for real-time analytics on city data, enhancing accessibility and decision-making",
                  "Deployed AI models using AWS SageMaker, S3, and Lambda for scalable, cloud-based inference",
                  "Built a large-scale feature engineering framework, increasing predictive model accuracy by 15%"
                ]
              },
              {
                title: "Technical Lead",
                company: "Western Digital",
                period: "January 2023 - May 2024",
                achievements: [
                  "Utilized Python and OpenCV to generate synthetic silicon wafer images with defects for model training",
                  "Improved defect classification models by increasing dataset diversity, boosting detection accuracy by 25%",
                  "Designed and implemented a data lake using S3 for efficient storage and retrieval of image data",
                  "Optimized distributed model training and hyperparameter tuning with Apache Spark"
                ]
              },
              {
                title: "Web Application Developer",
                company: "Sierra Nevada Research Institute",
                period: "January 2022 - December 2022",
                achievements: [
                  "Developed a dynamic front-end application using React and JavaScript",
                  "Implemented a Django-based backend for data storage, ensuring ACID compliance",
                  "Designed and deployed RESTful API endpoints for efficient data serving"
                ]
              },
              {
                title: "Data Analyst",
                company: "Blu-Lite Inc.",
                period: "May 2018 - December 2021",
                achievements: [
                  "Developed regression models to forecast sales and inventory trends, driving a 5% increase in revenue",
                  "Created dashboards and visual reports with Power BI and Excel, improving data accessibility by 25%",
                  "Automated routine data reporting processes, reducing manual effort by 20%"
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
            <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-muted/50 rounded-lg border border-border">
              {formStatus.type && (
                <div
                  className={`p-4 rounded-md ${
                    formStatus.type === "success"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {formStatus.message}
                </div>
              )}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="bg-background"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="bg-background"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  className="min-h-[100px] bg-background"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full group"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
              </Button>
            </form>
            <div className="flex justify-center gap-4">
              <Button variant="outline" size="icon" asChild className="hover:bg-primary hover:text-primary-foreground transition-colors">
                <Link href="https://github.com/Amehroke" target="_blank">
                  <Github className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild className="hover:bg-primary hover:text-primary-foreground transition-colors">
                <Link href="https://www.linkedin.com/in/arashdeep-singh-020398251/" target="_blank">
                  <Linkedin className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild className="hover:bg-primary hover:text-primary-foreground transition-colors">
                <Link href="mailto:arashdeepmehrokework@gmail.com">
                  <Mail className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="text-center">
              <Button variant="link" asChild className="group">
                <Link href="/UpdatedResume.pdf" download>
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
