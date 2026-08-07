import "./CircularProgress.css";
import { useState } from "react";
import { useTransform, useMotionValueEvent, motion } from "framer-motion";

export default function CircularProgress({
    progress
}) {
    const percentage = useTransform(progress, [0, 1], [0, 100]);

    const [value, setValue] = useState(0);

    useMotionValueEvent(

        percentage,

        "change",

        latest => {

            setValue(Math.round(latest));

        }

    );

    const radius = 25;
    const stroke = 5;

    const normalizedRadius = radius - stroke * 0.5;

    const circumference = normalizedRadius * 2 * Math.PI;

    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (

        <motion.div
            id="circle-progress"
            initial={{
                opacity: 0,
                scale: .8
            }}
            animate={{
                opacity: 1,
                scale: 1
            }}
            transition={{
                duration: .6
            }}
        >

            <svg
                height={radius * 2}
                width={radius * 2}
            >

                <defs>

                    <linearGradient
                        id="circleGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                    >

                        <stop
                            offset="0%"
                            stopColor="#00d4ff"
                        />
                        <stop
                            offset="100%"
                            stopColor="#00ff95"
                        />
                    </linearGradient>
                </defs>

                <circle
                    id="circle-bg"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />

                <motion.circle
                    id="circle-bar"
                    stroke="url(#circleGradient)"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    fill="transparent"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    strokeDasharray={circumference}
                    initial={{
                        strokeDashoffset:
                            circumference
                    }}
                    animate={{
                        strokeDashoffset
                    }}
                    transition={{
                        duration: 1.2
                    }}
                />
            </svg>

            <div id="circle-content">
                <h2>

                    {value}%

                </h2>
            </div>
        </motion.div>

    );

}