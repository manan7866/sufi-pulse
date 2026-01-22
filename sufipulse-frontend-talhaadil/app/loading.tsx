"use client";

import type React from "react";
import { useEffect } from "react";


export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-50">
      <div className="relative">
        <div
          className="w-32 h-32 md:w-40 md:h-40 rounded-full animate-spin"
          style={{
            animationDuration: "2s",
            background: `conic-gradient(from 0deg, #10B981 0deg, #10B981 120deg, transparent 120deg, transparent 360deg)`,
            mask: `radial-gradient(circle, transparent 50%, black 50%, black 55%, transparent 55%)`,
            WebkitMask: `radial-gradient(circle, transparent 50%, black 50%, black 55%, transparent 55%)`,
          }}
        />

        <div
          className="absolute inset-4 md:inset-6 rounded-full animate-spin"
          style={{
            animationDuration: "1.5s",
            animationDirection: "reverse",
            background: `conic-gradient(from 90deg, #065F46 0deg, #065F46 90deg, transparent 90deg, transparent 360deg)`,
            mask: `radial-gradient(circle, transparent 50%, black 50%, black 56%, transparent 56%)`,
            WebkitMask: `radial-gradient(circle, transparent 50%, black 50%, black 56%, transparent 56%)`,
          }}
        />

        <div
          className="absolute inset-8 md:inset-12 rounded-full animate-spin"
          style={{
            animationDuration: "1s",
            background: `conic-gradient(from 180deg, #1E293B 0deg, #1E293B 150deg, transparent 150deg, transparent 360deg)`,
            mask: `radial-gradient(circle, transparent 50%, black 50%, black 57%, transparent 57%)`,
            WebkitMask: `radial-gradient(circle, transparent 50%, black 50%, black 57%, transparent 57%)`,
          }}
        />

        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-emerald-900 rounded-full animate-pulse"
          style={{ animationDuration: "2s" }}
        />

        <div
          className="absolute -top-2 -right-2 w-2 h-2 bg-emerald-50 rounded-full animate-ping"
          style={{ animationDelay: "0s", animationDuration: "2s" }}
        />

        <div
          className="absolute -bottom-1 -left-3 w-1.5 h-1.5 bg-slate-800 rounded-full animate-ping"
          style={{ animationDelay: "0.7s", animationDuration: "2.5s" }}
        />

        <div
          className="absolute -top-3 -left-1 w-1 h-1 bg-emerald-50 rounded-full animate-ping"
          style={{ animationDelay: "1.2s", animationDuration: "2.2s" }}
        />

        <div
          className="absolute -bottom-2 -right-1 w-1.5 h-1.5 bg-slate-900 rounded-full animate-ping"
          style={{ animationDelay: "1.8s", animationDuration: "2.8s" }}
        />
      </div>
    </div>
  );
}
