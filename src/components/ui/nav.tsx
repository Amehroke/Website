import { Button } from "@/components/ui/button";
import Link from "next/link";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container-padding mx-auto max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="font-semibold">
            AM
          </Link>
          <div className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              <Button key={item.href} variant="ghost" asChild>
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
} 