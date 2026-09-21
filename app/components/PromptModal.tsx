"use client";

import React, { useState } from "react";

interface PromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PromptModal({ isOpen, onClose }: PromptModalProps) {
  const [prompt, setPrompt] = useState(
    "Cyberpunk portrait of a futuristic visual artist in neon purple jacket, volumetric lighting, 8k"
  );
  const [selectedStyle, setSelectedStyle] = useState("Cinematic");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImg, setGeneratedImg] = useState<string | null>(null);

  if (!isOpen) return null;

  const styles = [
    { name: "Cinematic", icon: "🎬" },
    { name: "Cyberpunk", icon: "🌆" },
    { name: "Anime Art", icon: "✨" },
    { name: "3D Kinetic", icon: "💎" },
    { name: "Hyperreal", icon: "📸" },
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setGeneratedImg(null);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedImg("/images/dreamframe_ai_portrait.jpg");
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-black border border-white/20 rounded-2xl p-6 sm:p-8 shadow-none overflow-hidden">

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-black font-bold text-xs">
              DF
            </div>
            <div>
              <h3 className="text-base font-medium text-white tracking-wide">
                DREAMFRAME Studio
              </h3>
              <p className="text-xs text-gray-400 font-light">
                Generative Image Engine
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Prompt Input Box */}
        <div className="mt-6 space-y-5 relative z-10">
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-wider text-gray-400 mb-2">
              Prompt Text
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              className="w-full bg-white/5 border border-white/15 rounded-xl p-3.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors resize-none font-light leading-relaxed"
              placeholder="Describe your visual concept..."
            />
          </div>

          {/* Style Selector */}
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-wider text-gray-400 mb-2">
              Style Preset
            </label>
            <div className="flex flex-wrap gap-2">
              {styles.map((style) => (
                <button
                  key={style.name}
                  onClick={() => setSelectedStyle(style.name)}
                  className={`px-3 py-1 rounded-full text-xs font-light transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedStyle === style.name
                      ? "bg-orange-500 text-black font-medium"
                      : "bg-white/5 text-gray-300 border border-white/10 hover:border-white/25"
                  }`}
                >
                  <span>{style.icon}</span>
                  <span>{style.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-medium text-xs tracking-wider uppercase transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-black"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                <span>Rendering Canvas...</span>
              </>
            ) : (
              <span>Generate Image</span>
            )}
          </button>

          {/* Result Preview */}
          {generatedImg && (
            <div className="mt-4 pt-4 border-t border-white/10 animate-in fade-in duration-300">
              <div className="relative rounded-xl overflow-hidden border border-white/15 max-h-56 flex justify-center bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={generatedImg}
                  alt="Generated Result"
                  className="object-cover w-full h-56"
                />
                <div className="absolute bottom-2.5 right-2.5 px-2.5 py-0.5 bg-black/80 rounded-full text-[10px] font-sans text-gray-300 border border-white/10">
                  4096 x 4096 px
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
