// src/components/mode-toggle.tsx
import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
    const { theme, setTheme } = useTheme(); // expects theme to be 'light'|'dark'|'system'
    const [mounted, setMounted] = useState(false);
    const [checked, setChecked] = useState(false);

    // Resolve initial checked state on client to avoid SSR mismatch.
    useEffect(() => {
        setMounted(true);
    }, []);

    // Update checked whenever theme changes (or when mounted)
    useEffect(() => {
        if (!mounted) return;
        // If theme === 'system', fall back to matchMedia
        if (theme === "dark") setChecked(true);
        else if (theme === "light") setChecked(false);
        else {
            const prefersDark =
                typeof window !== "undefined" &&
                window.matchMedia &&
                window.matchMedia("(prefers-color-scheme: dark)").matches;
            setChecked(prefersDark);
        }
    }, [theme, mounted]);

    // Toggle between dark <-> light. If current is 'system' treat it as resolved fallback,
    // but call setTheme with explicit 'dark' or 'light' so provider persists choice.
    const handleToggle = () => {
        const next = checked ? "light" : "dark";
        setTheme(next);
        setChecked(!checked);
    };

    return (
        <div className="relative inline-block">
            {/* We keep your Button style but use an inline label/input inside so the icon swap animation works */}
            <Button
                variant="ghost"
                size="icon"
                onClick={handleToggle}
                aria-pressed={checked}
                aria-label={checked ? "Switch to light theme" : "Switch to dark theme"}
                className="relative p-3"
            >
                {/* Hidden checkbox to preserve original DOM structure used by CSS selectors logic (optional) */}
                <input
                    id="theme-switch"
                    type="checkbox"
                    checked={checked}
                    onChange={handleToggle}
                    className="sr-only"
                    aria-hidden="true"
                />

                {/* Moon icon (visible in light mode; rotates+scales away when checked) */}
                <span
                    className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${checked ? "transform rotate-360 scale-0" : "transform rotate-0 scale-100"
                        } text-slate-400`}
                    aria-hidden="true"
                >
                    <Moon className="h-5 w-5" />
                </span>

                {/* Sun icon (hidden until checked) */}
                <span
                    className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${checked ? "transform rotate-0 scale-100" : "transform -rotate-90 scale-0"
                        } text-yellow-500`}
                    aria-hidden="true"
                >
                    <Sun className="h-5 w-5" />
                </span>

                {/* For screen readers only */}
                <span className="sr-only">Toggle theme</span>
            </Button>
        </div>
    );
}
