"use client";

import {
  BarChart3, Bot, Boxes, Cpu, Database, Gem, Globe, LayoutDashboard,
  LineChart, Rocket, Settings2, Sparkles, Target, Workflow, Zap,
  type LucideIcon,
} from "lucide-react";

/** Icones disponiveis para escolher no admin. */
export const ICONS: Record<string, LucideIcon> = {
  Gem, BarChart3, Workflow, LineChart, Database, LayoutDashboard,
  Bot, Cpu, Boxes, Globe, Rocket, Settings2, Sparkles, Target, Zap,
};

export const ICON_NAMES = Object.keys(ICONS);

export function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = ICONS[name] ?? Gem;
  return <Cmp className={className} strokeWidth={1.5} aria-hidden />;
}
