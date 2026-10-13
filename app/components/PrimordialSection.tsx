"use client";

import React, { useState } from "react";
import MicrobeField from "./MicrobeField";
import { useTranslation } from "../i18n";

const PRIMORDIAL_EXCLUSION_ZONES = [
  { xMinPct: 0.08, xMaxPct: 0.92, yMinPct: 0.15, yMaxPct: 0.85 },
];

export default function PrimordialSection() {
  const { t } = useTranslation();
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section
      id="primordial-elements"
      className="relative z-20 w-full bg-transparent text-[#14231a] py-14 sm:py-20 md:py-24 px-5 sm:px-12 md:px-16 overflow-hidden"
    >
      {/* Frame 2 MicrobeField Layer (~22 visible microbes, content area protected) */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-85 contrast-110">
        <MicrobeField
          position="absolute"
          densityMultiplier={3.4}
          opacityMultiplier={1.5}
          minVisibleCount={21}
          exclusionZones={PRIMORDIAL_EXCLUSION_ZONES}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Top Content Area */}
        <div className="max-w-2xl text-left">
          {/* Main Heading */}
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-[48px] font-bold text-[#14231a] tracking-tight leading-[1.15]">
            {t("primordial_title", "Biotechnology begins here.")}
          </h2>
        </div>

        {/* Lower Part: Three Cards with Smooth Green Hover & Focus Interaction */}
        <div className="w-full mt-10 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto select-none">
          {/* Card 1: Not just / Observing life */}
          <div
            tabIndex={0}
            onClick={() => setActiveCard((prev) => (prev === 0 ? null : 0))}
            aria-label="Card 1: Not just Observing life"
            className={`group relative rounded-[20px] border cursor-pointer outline-none transition-all duration-300 ease-in-out motion-reduce:transition-none p-7 sm:p-8 flex flex-col justify-between min-h-[380px] sm:min-h-[410px] ${
              activeCard === 0
                ? "bg-[#167A4A] border-[#167A4A] text-white shadow-xl"
                : "bg-[#FAFDF7] border-[#C6DDA8] text-[#14231a] hover:bg-[#167A4A] hover:border-[#167A4A] hover:text-white focus-visible:bg-[#167A4A] focus-visible:border-[#167A4A] focus-within:bg-[#167A4A] focus-within:border-[#167A4A]"
            }`}
          >
            {/* Top Badge */}
            <div className="flex flex-col items-start">
              <span className="text-[13px] sm:text-[14px] font-semibold tracking-[0.12em] uppercase opacity-85">
                {t("primordial_card1_badge", "Not just")}
              </span>
              <div className="w-8 h-[2px] bg-[#0D4A1A] group-hover:bg-[#A9DF86] mt-1.5 transition-colors" />
            </div>

            {/* Middle Microscope Icon */}
            <div className="my-6 sm:my-8 flex items-center justify-start h-[100px]">
              <div
                className={`transition-all duration-300 ease-in-out ${
                  activeCard === 0
                    ? "brightness-0 invert"
                    : "group-hover:brightness-0 group-hover:invert group-focus-within:brightness-0 group-focus-within:invert group-focus-visible:brightness-0 group-focus-visible:invert"
                }`}
              >
                <svg
                  width="116"
                  height="110"
                  viewBox="55 105 125 110"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="block h-[90px] w-auto"
                >
                  <path
                    d="M162.608 110.312L158.535 113.771L159.647 115.061L155.582 118.524L154.466 117.229L113.76 151.813L114.936 153.176L110.898 158.17L117.5 165.815L123.077 162.62L124.253 163.985L133.687 155.97C135.181 157.48 136.997 158.633 139 159.341C139.532 159.528 140.075 159.672 140.621 159.793C140.974 163.602 141.032 167.663 140.408 171.567C139.452 171.416 138.487 171.335 137.519 171.324C128.925 171.388 121.652 177.011 119.203 184.761L119.193 184.796L116.987 191.136L114.878 189.031C107.197 181.359 109.129 175.435 110.492 173.04L115.983 178.525L120.655 173.858L101.567 154.816L96.9062 159.473L102.856 165.416C100.292 169.07 93.4563 181.197 105.469 193.193L113.485 201.201L110.532 209.688H164.499L155.841 184.799L155.829 184.764C154.861 181.724 153.148 178.974 150.845 176.765C152.95 170.265 152.952 163.402 152.124 157.307C154.319 155.671 155.982 153.424 156.906 150.848C157.52 149.122 157.786 147.292 157.688 145.464C157.589 143.635 157.129 141.844 156.333 140.195C155.946 139.389 155.485 138.621 154.955 137.902L164.952 129.409L163.842 128.122L167.906 124.654L169.024 125.951L173.094 122.489L162.608 110.312ZM118.04 162.642L114.136 158.118L116.193 155.573L120.88 161.017L118.04 162.642ZM101.569 157.156L118.312 173.858L116.758 175.41L100.012 158.715L101.569 157.156ZM137.519 201.164C131.585 201.164 126.78 196.396 126.78 190.508C126.78 184.62 131.585 179.849 137.519 179.849C143.449 179.849 148.257 184.62 148.257 190.508C148.257 196.396 143.449 201.164 137.519 201.164ZM153.785 149.74C152.238 154.11 148.111 156.837 143.697 156.837C142.504 156.837 141.292 156.638 140.103 156.219C134.508 154.243 131.568 148.148 133.531 142.596C135.076 138.229 139.199 135.501 143.611 135.499C144.805 135.499 146.021 135.7 147.212 136.12C152.803 138.089 155.745 144.194 153.785 149.74ZM162.222 126.236L157.205 120.407L161.27 116.942L166.288 122.769L162.222 126.236Z"
                    fill="#487B53"
                  />
                  <path
                    d="M148.72 147.966C149.702 145.19 148.231 142.137 145.435 141.148C142.638 140.159 139.575 141.607 138.593 144.383C137.611 147.159 139.082 150.211 141.878 151.201C144.675 152.19 147.738 150.742 148.72 147.966Z"
                    fill="#487B53"
                  />
                  <path
                    d="M137.519 195.837C140.486 195.837 142.892 193.45 142.892 190.507C142.892 187.563 140.486 185.177 137.519 185.177C134.552 185.177 132.146 187.563 132.146 190.507C132.146 193.45 134.552 195.837 137.519 195.837Z"
                    fill="#487B53"
                  />
                </svg>
              </div>
            </div>

            {/* Bottom Title & Description */}
            <div className="flex flex-col items-start text-left">
              <h3 className="relative inline-block text-2xl sm:text-[26px] lg:text-[28px] font-bold tracking-tight mb-2.5">
                <span className="relative">
                  {t("primordial_card1_title", "Observing life")}
                  <span className="absolute left-0 right-0 top-1/2 h-[2px] bg-[#8B1E1E] -translate-y-1/2 pointer-events-none" />
                </span>
              </h3>
              <p className="text-sm sm:text-[15px] leading-relaxed font-normal opacity-90">
                {t("primordial_card1_desc", "Seeing the microscopic world is only the first step.")}
              </p>
            </div>
          </div>

          {/* Card 2: But / Understanding it */}
          <div
            tabIndex={0}
            onClick={() => setActiveCard((prev) => (prev === 1 ? null : 1))}
            aria-label="Card 2: But Understanding it"
            className={`group relative rounded-[20px] border cursor-pointer outline-none transition-all duration-300 ease-in-out motion-reduce:transition-none p-7 sm:p-8 flex flex-col justify-between min-h-[380px] sm:min-h-[410px] ${
              activeCard === 1
                ? "bg-[#167A4A] border-[#167A4A] text-white shadow-xl"
                : "bg-[#FAFDF7] border-[#C6DDA8] text-[#14231a] hover:bg-[#167A4A] hover:border-[#167A4A] hover:text-white focus-visible:bg-[#167A4A] focus-visible:border-[#167A4A] focus-within:bg-[#167A4A] focus-within:border-[#167A4A]"
            }`}
          >
            {/* Top Badge */}
            <div className="flex flex-col items-start">
              <span className="text-[13px] sm:text-[14px] font-semibold tracking-[0.12em] uppercase opacity-85">
                {t("primordial_card2_badge", "But")}
              </span>
              <div className="w-8 h-[2px] bg-[#0D4A1A] group-hover:bg-[#A9DF86] mt-1.5 transition-colors" />
            </div>

            {/* Middle Magnifier Icon */}
            <div className="my-6 sm:my-8 flex items-center justify-start h-[100px]">
              <div
                className={`transition-all duration-300 ease-in-out ${
                  activeCard === 1
                    ? "brightness-0 invert"
                    : "group-hover:brightness-0 group-hover:invert group-focus-within:brightness-0 group-focus-within:invert group-focus-visible:brightness-0 group-focus-visible:invert"
                }`}
              >
                <svg
                  width="116"
                  height="110"
                  viewBox="490 110 115 110"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="block h-[90px] w-auto"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M554.711 137.526C555.981 137.611 557.169 138.184 558.026 139.125L559.46 137.667L560.41 138.602L558.797 140.242C559.128 140.899 559.317 141.64 559.323 142.426C559.334 143.913 559.858 145.352 560.808 146.497L562.302 144.977L563.253 145.912L561.758 147.432C562.919 148.362 564.366 148.862 565.853 148.847C566.291 148.844 566.714 148.897 567.119 148.999L568.214 147.066L569.374 147.723L568.364 149.506C569.113 149.936 569.736 150.556 570.172 151.302C570.607 152.048 570.84 152.895 570.847 153.758C570.853 154.483 570.703 155.173 570.428 155.795L572.182 156.789L571.525 157.949L569.73 156.933C569.271 157.496 568.693 157.952 568.037 158.266C567.381 158.581 566.664 158.746 565.936 158.752C565.81 158.753 565.683 158.752 565.555 158.75L565.572 160.755L564.239 160.766L564.221 158.677C562.219 158.487 560.269 157.927 558.47 157.025L557.466 158.798L556.306 158.142L557.303 156.38C555.983 155.577 554.783 154.592 553.737 153.455L551.997 155.225L551.046 154.29L552.872 152.433C551.756 151.003 550.887 149.397 550.298 147.681L548.306 148.232L547.95 146.947L549.919 146.402C549.597 145.129 549.429 143.822 549.419 142.509C549.415 142.055 549.473 141.615 549.583 141.196L547.733 140.147L548.39 138.987L550.102 139.957C550.454 139.359 550.927 138.841 551.492 138.438C552.056 138.034 552.699 137.754 553.378 137.614L553.361 135.523L554.694 135.512L554.711 137.526ZM554.341 138.848C553.381 138.856 552.464 139.245 551.791 139.93C551.118 140.614 550.745 141.538 550.752 142.497C550.822 150.807 557.615 157.488 565.925 157.418C566.876 157.398 567.781 157.003 568.443 156.32C569.106 155.637 569.473 154.721 569.465 153.77C569.457 152.818 569.075 151.908 568.401 151.237C567.727 150.565 566.816 150.186 565.864 150.181C561.551 150.217 558.026 146.749 557.99 142.437C557.982 141.477 557.593 140.56 556.909 139.887C556.225 139.214 555.302 138.84 554.342 138.848M554.083 142.184C553.906 142.185 553.737 142.257 553.613 142.383C553.489 142.509 553.421 142.679 553.422 142.856C553.424 143.033 553.495 143.202 553.621 143.326C553.747 143.449 553.918 143.518 554.094 143.517C554.271 143.515 554.44 143.444 554.564 143.318C554.688 143.192 554.757 143.021 554.755 142.845C554.754 142.668 554.682 142.499 554.556 142.375C554.43 142.251 554.26 142.182 554.083 142.184ZM552.089 142.867C552.084 142.336 552.291 141.826 552.663 141.448C553.035 141.07 553.542 140.855 554.072 140.85C554.602 140.846 555.113 141.052 555.491 141.424C555.869 141.796 556.084 142.303 556.089 142.833C556.093 143.364 555.887 143.874 555.515 144.253C555.143 144.631 554.636 144.846 554.106 144.85C553.575 144.855 553.065 144.648 552.686 144.276C552.308 143.904 552.093 143.397 552.089 142.867ZM559.5 152.139C559.499 151.962 559.567 151.792 559.691 151.666C559.815 151.539 559.984 151.468 560.161 151.466C560.338 151.465 560.508 151.534 560.634 151.658C560.76 151.782 560.832 151.951 560.833 152.127C560.835 152.304 560.766 152.474 560.642 152.6C560.518 152.727 560.349 152.798 560.172 152.8C559.995 152.801 559.825 152.732 559.699 152.608C559.573 152.484 559.501 152.315 559.5 152.139ZM560.15 150.133C559.619 150.138 559.113 150.352 558.741 150.731C558.369 151.109 558.162 151.619 558.167 152.15C558.171 152.68 558.386 153.187 558.764 153.559C559.142 153.931 559.653 154.137 560.183 154.133C560.714 154.129 561.221 153.914 561.593 153.535C561.965 153.157 562.171 152.647 562.167 152.116C562.162 151.586 561.947 151.079 561.569 150.707C561.191 150.335 560.68 150.129 560.15 150.133ZM556.8 148.161C556.803 148.515 556.665 148.855 556.417 149.107C556.169 149.359 555.831 149.503 555.478 149.505C555.124 149.508 554.784 149.371 554.532 149.123C554.28 148.875 554.136 148.537 554.133 148.183C554.13 147.83 554.268 147.489 554.516 147.237C554.764 146.985 555.102 146.842 555.456 146.839C555.809 146.836 556.149 146.974 556.402 147.222C556.654 147.469 556.797 147.807 556.8 148.161ZM565.522 154.755C565.876 154.752 566.214 154.609 566.462 154.357C566.71 154.104 566.847 153.764 566.844 153.411C566.841 153.057 566.698 152.719 566.446 152.471C566.194 152.223 565.853 152.085 565.5 152.088C565.146 152.091 564.808 152.235 564.56 152.487C564.312 152.739 564.175 153.079 564.178 153.433C564.181 153.786 564.324 154.124 564.576 154.372C564.828 154.62 565.168 154.758 565.522 154.755Z"
                    fill="#14AE5C"
                  />
                  <path
                    d="M519.972 180.961L533.957 174.254C528.361 167.895 525.271 159.709 525.267 151.231C525.267 131.912 540.949 116.196 560.228 116.196C579.507 116.196 595.189 131.912 595.189 151.231C595.189 170.55 579.507 186.266 560.228 186.266C551.438 186.266 543.396 182.963 537.253 177.557L530.561 191.571L505.588 216.596L495 205.986L519.972 180.961ZM560.228 176.256C574.013 176.256 585.2 165.045 585.2 151.231C585.2 137.417 574.013 126.206 560.228 126.206C546.443 126.206 535.255 137.417 535.255 151.231C535.255 165.045 546.443 176.256 560.228 176.256Z"
                    fill="#487B53"
                  />
                </svg>
              </div>
            </div>

            {/* Bottom Title & Description */}
            <div className="flex flex-col items-start text-left">
              <h3 className="text-2xl sm:text-[26px] lg:text-[28px] font-bold tracking-tight mb-2.5">
                {t("primordial_card2_title", "Understanding it")}
              </h3>
              <p className="text-sm sm:text-[15px] leading-relaxed font-normal opacity-90">
                {t("primordial_card2_desc", "Knowing what each organism makes, and what signals it responds to.")}
              </p>
            </div>
          </div>

          {/* Card 3: And / Working with it */}
          <div
            tabIndex={0}
            onClick={() => setActiveCard((prev) => (prev === 2 ? null : 2))}
            aria-label="Card 3: And Working with it"
            className={`group relative rounded-[20px] border cursor-pointer outline-none transition-all duration-300 ease-in-out motion-reduce:transition-none p-7 sm:p-8 flex flex-col justify-between min-h-[380px] sm:min-h-[410px] ${
              activeCard === 2
                ? "bg-[#167A4A] border-[#167A4A] text-white shadow-xl"
                : "bg-[#FAFDF7] border-[#C6DDA8] text-[#14231a] hover:bg-[#167A4A] hover:border-[#167A4A] hover:text-white focus-visible:bg-[#167A4A] focus-visible:border-[#167A4A] focus-within:bg-[#167A4A] focus-within:border-[#167A4A]"
            }`}
          >
            {/* Top Badge */}
            <div className="flex flex-col items-start">
              <span className="text-[13px] sm:text-[14px] font-semibold tracking-[0.12em] uppercase opacity-85">
                {t("primordial_card3_badge", "And")}
              </span>
              <div className="w-8 h-[2px] bg-[#0D4A1A] group-hover:bg-[#A9DF86] mt-1.5 transition-colors" />
            </div>

            {/* Middle Sprout Icon */}
            <div className="my-6 sm:my-8 flex items-center justify-start h-[100px]">
              <div
                className={`transition-all duration-300 ease-in-out ${
                  activeCard === 2
                    ? "brightness-0 invert"
                    : "group-hover:brightness-0 group-hover:invert group-focus-within:brightness-0 group-focus-within:invert group-focus-visible:brightness-0 group-focus-visible:invert"
                }`}
              >
                <svg
                  width="116"
                  height="110"
                  viewBox="890 115 110 110"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="block h-[90px] w-auto"
                >
                  <path
                    d="M989.308 168.387C987.892 167.169 975.219 156.488 966.399 156.488C955.404 156.488 950.095 166.097 948.821 171.179L948.628 171.957C946.988 172.895 945.449 174 944.036 175.255C942.527 176.602 941.186 178.125 940.039 179.792C939.947 179.355 939.857 178.918 939.746 178.496C938.45 173.747 936.369 169.547 934.126 165.465C932.313 162.239 930.311 159.154 928.213 156.144L928.316 155.936C930.512 151.497 932.45 140.778 924.089 131.993C917.28 124.836 899.537 122.788 897.538 122.582L894 122.208L894.348 125.868C894.547 127.97 896.489 146.579 903.287 153.718C907.072 157.694 911.805 159.797 916.978 159.797C921.228 159.797 924.731 158.386 926.293 157.637C928.157 160.662 929.878 163.774 931.449 166.961C933.393 171.003 935.158 175.216 936.049 179.424C936.263 180.47 934.791 220.415 934.791 220.415H942.066C942.066 220.415 940.929 187.449 941.13 186.657C941.979 183.362 943.828 180.263 946.265 177.74C947.312 176.667 948.457 175.695 949.685 174.836C951.813 179.118 957.06 184.915 966.399 184.915C975.219 184.915 987.892 174.235 989.308 173.017L992 170.701L989.308 168.387Z"
                    fill="#487B53"
                  />
                  <path
                    d="M946.042 201.844C946.705 199.809 947.79 197.938 949.226 196.354C949.346 196.224 949.501 196.133 949.672 196.09C949.843 196.047 950.023 196.055 950.19 196.114L953.619 197.336C953.862 197.423 954.122 197.456 954.379 197.432C954.637 197.409 954.886 197.33 955.11 197.201C955.334 197.071 955.527 196.895 955.677 196.684C955.826 196.473 955.929 196.232 955.976 195.977L956.632 192.399C956.663 192.225 956.745 192.063 956.868 191.936C956.991 191.809 957.15 191.722 957.323 191.687C959.418 191.243 961.582 191.243 963.677 191.687C964.03 191.762 964.302 192.043 964.368 192.399L965.024 195.977C965.071 196.232 965.172 196.474 965.322 196.685C965.471 196.897 965.665 197.074 965.889 197.203C966.113 197.332 966.363 197.411 966.62 197.434C966.878 197.457 967.138 197.424 967.381 197.336L970.81 196.114C970.977 196.055 971.157 196.047 971.328 196.09C971.499 196.133 971.654 196.224 971.774 196.354C973.209 197.938 974.294 199.81 974.956 201.844C975.011 202.013 975.015 202.194 974.966 202.364C974.917 202.534 974.819 202.686 974.683 202.799L971.905 205.152C971.707 205.319 971.548 205.527 971.439 205.762C971.33 205.996 971.273 206.252 971.273 206.511C971.273 206.77 971.33 207.026 971.439 207.261C971.548 207.496 971.707 207.704 971.905 207.871L974.683 210.223C974.961 210.458 975.067 210.835 974.956 211.178C974.294 213.213 973.209 215.085 971.774 216.669C971.654 216.799 971.499 216.89 971.328 216.933C971.157 216.975 970.977 216.967 970.81 216.909L967.381 215.686C967.138 215.6 966.878 215.567 966.621 215.591C966.363 215.614 966.114 215.693 965.89 215.822C965.666 215.951 965.473 216.128 965.323 216.339C965.174 216.55 965.071 216.791 965.024 217.046L964.368 220.624C964.337 220.798 964.254 220.96 964.131 221.087C964.007 221.214 963.848 221.301 963.675 221.336C961.58 221.779 959.417 221.779 957.323 221.336C957.149 221.301 956.99 221.214 956.867 221.087C956.743 220.96 956.66 220.798 956.63 220.624L955.976 217.046C955.929 216.791 955.828 216.549 955.678 216.337C955.529 216.126 955.335 215.949 955.111 215.82C954.887 215.691 954.637 215.612 954.38 215.589C954.122 215.565 953.862 215.599 953.619 215.686L950.19 216.909C950.023 216.967 949.843 216.975 949.672 216.933C949.501 216.89 949.346 216.799 949.226 216.669C947.791 215.085 946.706 213.213 946.044 211.178C945.989 211.01 945.985 210.829 946.034 210.659C946.083 210.489 946.181 210.337 946.317 210.223L949.095 207.871C949.293 207.704 949.451 207.496 949.56 207.261C949.669 207.026 949.725 206.77 949.725 206.511C949.725 206.252 949.669 205.997 949.56 205.762C949.451 205.527 949.293 205.319 949.095 205.152L946.317 202.799C946.181 202.686 946.083 202.534 946.034 202.364C945.985 202.194 945.986 202.013 946.042 201.844ZM956.085 206.511C956.085 207.684 956.55 208.809 957.377 209.638C958.205 210.467 959.327 210.933 960.497 210.933C961.668 210.933 962.79 210.467 963.618 209.638C964.445 208.809 964.91 207.684 964.91 206.511C964.91 205.339 964.445 204.214 963.618 203.385C962.79 202.555 961.668 202.089 960.497 202.089C959.327 202.089 958.205 202.555 957.377 203.385C956.55 204.214 956.085 205.339 956.085 206.511Z"
                    fill="#487B53"
                  />
                </svg>
              </div>
            </div>

            {/* Bottom Title & Description */}
            <div className="flex flex-col items-start text-left">
              <h3 className="text-2xl sm:text-[26px] lg:text-[28px] font-bold tracking-tight mb-2.5">
                {t("primordial_card3_title", "Working with it")}
              </h3>
              <p className="text-sm sm:text-[15px] leading-relaxed font-normal opacity-90">
                {t("primordial_card3_desc", "Turning that understanding into biological products that operate at scale.")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
