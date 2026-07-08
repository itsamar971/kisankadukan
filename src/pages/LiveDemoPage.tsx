import React from 'react';
import { ParticleTextEffect } from '../components/ui/particle-text-effect';

export default function LiveDemoPage() {
  const handleRegisterClick = () => {
    // We can dispatch an event to open waitlist modal if available, 
    // or just scroll/redirect as needed. Since it's a demo, we will just alert for now 
    // or use a local state to show waitlist modal.
    // For integration with existing app, we might use a global state or trigger login hash.
    window.location.hash = '#login';
  };

  return (
    <div className="min-h-screen bg-[#f3efe8] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1f2a1d] mb-4 tracking-tight">
          Experience the Future of Farming
        </h1>
        <p className="text-lg text-[#4b5b47] mb-12 max-w-2xl">
          We are working hard behind the scenes. While we are yet to launch the app, check out this live particle demo and register to be the first to know when we are live!
        </p>

        <div className="w-full mb-12">
          <ParticleTextEffect />
        </div>

        <button 
          onClick={handleRegisterClick}
          className="bg-[#1f2a1d] hover:bg-[#2a3827] text-white text-lg font-semibold px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
        >
          Register for Early Access
        </button>
      </div>
    </div>
  );
}
