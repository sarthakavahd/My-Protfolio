"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

export default function ScrambleText({ 
  text, 
  delay = 0, 
  className = "" 
}: { 
  text: string; 
  delay?: number; 
  className?: string;
}) {
  const [displayText, setDisplayText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    let frame = 0;
    const maxFrames = 30; // Number of scramble steps
    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;

    // Start with empty string, then begin scramble after delay
    timeoutId = setTimeout(() => {
      setStarted(true);
      
      // Initialize with random characters
      setDisplayText(
        text.split("").map(c => c === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]).join("")
      );

      intervalId = setInterval(() => {
        frame++;
        const progress = frame / maxFrames;

        if (progress >= 1) {
          setDisplayText(text);
          clearInterval(intervalId);
          return;
        }

        const newText = text.split("").map((char, index) => {
          if (char === " ") return " ";
          // Settle characters sequentially from left to right
          const charSettlePoint = index / text.length; 
          
          if (progress >= charSettlePoint) {
            return char;
          }
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join("");
        
        setDisplayText(newText);
      }, 40); // 40ms per frame
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, delay]);

  return (
    <motion.span 
      initial={{ opacity: 0 }}
      animate={{ opacity: started ? 1 : 0 }}
      className={className}
    >
      {displayText}
    </motion.span>
  );
}
