import React from 'react';

export const BloodSplatter = ({ className }) => (
  <svg className={`absolute pointer-events-none opacity-80 mix-blend-multiply text-red-800 ${className}`} viewBox="0 0 200 200" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M45.7,-76.3C58.9,-68.5,69.1,-55.4,78.5,-41.6C88,-27.7,96.6,-13.9,96.5,-0.1C96.3,13.8,87.3,27.5,77.7,40.9C68.1,54.2,57.9,67.1,44.5,75.3C31.1,83.5,15.5,86.9,0.5,86.1C-14.6,85.3,-29.2,80.3,-42.9,72.4C-56.7,64.5,-69.5,53.7,-78.4,40.4C-87.3,27.1,-92.3,11.3,-91.2,-3.9C-90.1,-19.1,-82.9,-33.7,-73.4,-46C-63.9,-58.3,-52,-68.3,-38.7,-75.7C-25.4,-83.1,-12.7,-88,2.3,-91.3C17.3,-94.6,34.6,-96.4,45.7,-76.3Z" transform="translate(100 100) scale(0.8)" />
    <circle cx="150" cy="40" r="12" />
    <circle cx="170" cy="80" r="8" />
    <circle cx="30" cy="160" r="15" />
    <circle cx="60" cy="180" r="6" />
    <path d="M120,160 Q130,190 140,160" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
  </svg>
);

export const Stamp = ({ text, rotation = "-12deg" }) => (
  <div className="stamp" style={{ transform: `rotate(${rotation})` }}>
    {text}
  </div>
);

export const CreepySketch = ({ type, className }) => {
  if (type === 'eye') {
    return (
      <svg className={`absolute pointer-events-none opacity-20 mix-blend-multiply text-black ${className}`} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M10,50 Q50,10 90,50 Q50,90 10,50 Z" />
        <circle cx="50" cy="50" r="15" />
        <circle cx="50" cy="50" r="5" fill="currentColor" />
        <path d="M50,35 Q60,40 65,50" />
        <path d="M30,50 Q40,30 50,20" />
        <path d="M70,50 Q60,70 50,80" />
        <path d="M10,50 L5,45 M90,50 L95,55 M50,10 L48,5 M50,90 L52,95 M25,30 L20,22 M75,30 L80,22 M25,70 L20,78 M75,70 L80,78" strokeWidth="1" />
      </svg>
    );
  }
  if (type === 'veins') {
    return (
      <svg className={`absolute pointer-events-none opacity-15 mix-blend-multiply text-[#3a110a] ${className}`} viewBox="0 0 100 200" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M50,0 Q55,20 40,40 T30,80 T50,120 T20,160 T40,200" />
        <path d="M40,40 Q20,50 10,70" />
        <path d="M45,60 Q70,70 80,90" />
        <path d="M50,120 Q70,130 90,110" />
        <path d="M30,140 Q10,150 0,130" />
        <path d="M20,160 Q10,180 5,200" />
        <path d="M25,180 Q40,190 50,185" />
      </svg>
    );
  }
  return null;
};
