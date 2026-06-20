"use client";

import { UserPlus, Sprout, Handshake, ShieldCheck, Truck } from "lucide-react";
import RadialOrbitalTimeline from "./ui/radial-orbital-timeline";

const timelineData = [
  {
    id: 1,
    title: "Onboarding",
    date: "Step 1",
    content: "Farmers and buyers register and undergo KYC verification for a trusted network.",
    category: "Identity",
    icon: UserPlus,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Live Listings",
    date: "Step 2",
    content: "Farmers list their harvest with real-time pricing and quality indicators.",
    category: "Marketplace",
    icon: Sprout,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 3,
    title: "Smart Matching",
    date: "Step 3",
    content: "Buyers are matched with local farmers based on requirements and location.",
    category: "Logistics",
    icon: Handshake,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 60,
  },
  {
    id: 4,
    title: "Secure Transaction",
    date: "Step 4",
    content: "Funds are held securely until the produce is quality-checked and dispatched.",
    category: "Finance",
    icon: ShieldCheck,
    relatedIds: [3, 5],
    status: "pending" as const,
    energy: 30,
  },
  {
    id: 5,
    title: "Direct Delivery",
    date: "Step 5",
    content: "Optimized routing ensures farm-fresh delivery straight to the buyer's warehouse.",
    category: "Logistics",
    icon: Truck,
    relatedIds: [4],
    status: "pending" as const,
    energy: 10,
  },
];

export function RadialOrbitalTimelineDemo() {
  return (
    <div className="w-full relative z-10 py-2 sm:py-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        {/* Left Content */}
        <div className="w-full md:w-5/12 space-y-6 text-left">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#1f2a1d]/10 border border-[#1f2a1d]/20 text-[#1f2a1d] text-xs font-bold tracking-[0.2em] uppercase">
            The Flow
          </div>
          
          <h2 
            className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0f0f0f] leading-[1.1] tracking-tight"
            style={{ letterSpacing: '-0.03em' }}
          >
            Built for Trust <br/>and Efficiency
          </h2>
          
          <p className="text-lg sm:text-xl text-[#1f2a1d]/80 leading-relaxed font-medium">
            This is how our ecosystem actually works. From the moment a farmer joins our network to the second fresh produce hits your warehouse, every step is optimized to guarantee transparency, fairness, and speed.
          </p>
          
          <div className="pt-4 border-t border-[#1f2a1d]/10">
            <p className="text-sm font-semibold text-[#1f2a1d]/60 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#dfb15b]/30 text-[#6a4f1a]">i</span>
              Interact with the orbital nodes to explore each phase.
            </p>
          </div>
        </div>

        {/* Right Content - Timeline */}
        <div className="w-full md:w-7/12 relative flex justify-center">
          <RadialOrbitalTimeline timelineData={timelineData} />
        </div>
      </div>
    </div>
  );
}

export default RadialOrbitalTimelineDemo;
