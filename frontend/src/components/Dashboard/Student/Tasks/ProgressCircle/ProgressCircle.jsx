import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./ProgressCircle.css";

const ProgressCircle = ({
  progress = 39,
  size = 110,
  strokeWidth = 10,
  completed = false,
}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;

    const timer = setInterval(() => {
      start++;

      if (start >= progress) {
        start = progress;
        clearInterval(timer);
      }

      setValue(start);
    }, 15);

    return () => clearInterval(timer);
  }, [progress]);

  const radius = (size - strokeWidth) / 2;

  const circumference = 2 * Math.PI * radius;

  const dashOffset =
    circumference - (value / 100) * circumference;

  return (
    <motion.div
      className="progress-wrapper"
      initial={{ scale: .7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: .5 }}
    >
      <svg
        width={size}
        height={size}
        className="progress-svg"
      >
        <defs>
          <linearGradient id="circleGradient">
            <stop offset="0%" stopColor="#00f5ff" />
            <stop offset="100%" stopColor="#19ff88" />
          </linearGradient>
        </defs>

        <circle
          className="progress-bg"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />

        <motion.circle
          className="progress-bar"
          stroke="url(#circleGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={circumference}
          animate={{
            strokeDashoffset: dashOffset,
          }}
          transition={{
            duration: .7,
          }}
        />

      </svg>

      <div className="progress-content">

        {completed ? (
          <>

            <div className="emoji">
              😊
            </div>

            <span className="completed-text">
              DONE
            </span>

          </>
        ) : (
          <>
            <h2>{value}%</h2>

            <p>Completed</p>
          </>
        )}

      </div>

      <div className="glow-ring"></div>

    </motion.div>
  );
};

export default ProgressCircle;