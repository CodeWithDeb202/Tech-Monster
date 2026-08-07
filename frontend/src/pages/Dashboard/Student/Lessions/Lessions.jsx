import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import "./Lessions.css";

import {
    saveLessonState
} from "../../../../utils/lessonStorage";

import { toast } from "react-toastify";
import api from "../../../../services/api/axios";

// Components
import LessonSidebar from "../../../../components/Dashboard/Student/Lessions/LessonSidebar";
import LessonContent from "../../../../components/Dashboard/Student/Lessions/LessonContent";
import Pagination from "../../../../components/Dashboard/Student/Lessions/Pagination";

const normalizeCourseData = (courseData) => {
    if (!courseData?.modules) {
        return {
            title: courseData?.title || "Course",
            category: courseData?.category || "",
            modules: [],
            lessons: []
        };
    }

    const modules = courseData.modules.map((module, moduleIndex) => {
        const sections = (module.lessons || []).map((lesson, lessonIndex) => {
            const notes = lesson.notes || {};
            return {
                id: lesson.lessonId || `${moduleIndex + 1}-${lessonIndex + 1}`,
                title: lesson.lessonTitle || `Lesson ${lessonIndex + 1}`,
                heading: notes.heading || lesson.lessonTitle || `Lesson ${lessonIndex + 1}`,
                paragraph: notes.overview || notes.paragraph || "",
                completed: false,
                bookmarked: false,
                lesson,
                moduleTitle: module.moduleTitle || `Module ${moduleIndex + 1}`
            };
        });

        return {
            id: module.moduleId || `module-${moduleIndex + 1}`,
            title: module.moduleTitle || `Module ${moduleIndex + 1}`,
            length: sections.length,
            sections
        };
    });

    return {
        ...courseData,
        title: courseData.title || "Course",
        category: courseData.category || "",
        modules,
        lessons: modules.flatMap((module) => module.sections)
    };
};


// Normalize a slug so both "frontend_dev" and "frontend-dev" resolve to the
// dash-based slug used by the backend/JSON files.
const normalizeSlug = (slug) =>
    String(slug || "")
        .trim()
        .toLowerCase()
        .replace(/_/g, "-");

export default function Lessions() {
    const { slug, courseSlug: routeCourseSlug } = useParams();
    const [courseSlug, setCourseSlug] = useState(
        normalizeSlug(routeCourseSlug || slug || "")
    );

    const [activeLesson, setActiveLesson] = useState(0);
    const [lessonDataState, setLessonDataState] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        localStorage.removeItem("techmonster_lessons");
    }, []);

    useEffect(() => {
        localStorage.setItem("activeLesson", activeLesson);
    }, [activeLesson]);

    useEffect(() => {
        if (lessonDataState) {
            saveLessonState(lessonDataState);
        }
    }, [lessonDataState]);

    const [search, setSearch] = useState(() => localStorage.getItem("lessonSearch") || "");

    useEffect(() => {
        localStorage.setItem("lessonSearch", search);
    }, [search]);

    const [readingMode, setReadingMode] = useState(() => localStorage.getItem("readingMode") === "true");

    useEffect(() => {
        localStorage.setItem("readingMode", readingMode);
    }, [readingMode]);

// Resolve a course slug when the URL does not provide one.
    // Priority: (1) enrolled internship from "my internships",
    // (2) first available published internship.
    const resolveCourseSlug = async () => {
        // 1) Try the logged-in student's enrolled internships first.
        try {
            const myRes = await api.get("/internships/student/my");
            const myList = myRes?.data?.internships || [];
            const enrolledSlug =
                myList.find((item) => item.slug)?.slug ||
                myList[0]?.internship?.slug ||
                myList[0]?.slug;

if (enrolledSlug) {
                return normalizeSlug(enrolledSlug);
            }
        } catch {
            // Fall through to the public list if the auth call fails.
        }

        // 2) Fall back to the first available published internship.
        try {
            const allRes = await api.get("/internships");
            const allList = allRes?.data?.internships || [];
            const firstSlug =
                allList.find((item) => item.slug)?.slug || allList[0]?.slug || null;
            return firstSlug ? normalizeSlug(firstSlug) : null;
        } catch {
            return null;
        }
    };

    useEffect(() => {
        let mounted = true;

        const fetchCourse = async () => {
            try {
                setLoading(true);
                setError(null);

                let targetSlug = courseSlug;

                // No slug in the URL -> resolve a default course.
                if (!targetSlug) {
                    targetSlug = await resolveCourseSlug();
                    if (mounted && targetSlug) {
                        setCourseSlug(targetSlug);
                    }
                }

                if (!targetSlug) {
                    if (mounted) {
                        setError("No internship found. Please enroll in a course first.");
                        setLoading(false);
                    }
                    return;
                }

                const response = await api.get(`/internships/slug/${targetSlug}`);
                const courseData = response?.data?.internship || response?.data || null;

                if (!mounted) return;

                if (courseData) {
                    setLessonDataState(normalizeCourseData(courseData));
                    setActiveLesson(0);
                } else {
                    setError("Course content could not be loaded.");
                    toast.error("Course content could not be loaded.");
                }
            } catch {
                if (!mounted) return;
                setError("Unable to load lesson data right now.");
                toast.error("Unable to load lesson data right now.");
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        fetchCourse();

        return () => {
            mounted = false;
        };
    }, [courseSlug]);

    const lessons = useMemo(() => lessonDataState?.lessons || [], [lessonDataState]);
    const currentLesson = lessons[activeLesson] || null;

    const filteredLessons = useMemo(() => {
        if (!lessonDataState?.modules) return [];

        const query = search.toLowerCase();
        return lessonDataState.modules.filter((module) => {
            const matchesModule = module.title.toLowerCase().includes(query);
            const matchesLesson = module.sections.some((section) =>
                section.heading.toLowerCase().includes(query)
            );
            return matchesModule || matchesLesson;
        });
    }, [lessonDataState, search]);

    if (loading) {
        return (
            <motion.div className="lesson-layout" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div id="lesson-right" style={{ width: "100%" }}>
                    <div className="lesson-page--loading">Loading lesson content...</div>
                </div>
            </motion.div>
        );
    }

    if (error || !lessonDataState || !lessons.length) {
        return (
            <motion.div className="lesson-layout" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div id="lesson-right" style={{ width: "100%" }}>
                    <div className="lesson-page--error">{error || "No lesson content found for this course."}</div>
                </div>
            </motion.div>
        );
    }

    const handleNext = () => {
        if (activeLesson < lessons.length - 1) {
            setActiveLesson((prev) => prev + 1);

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    };

    const handlePrevious = () => {
        if (activeLesson > 0) {
            setActiveLesson((prev) => prev - 1);

            document.querySelector(".lesson-right")?.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    };

    const handleComplete = () => {
        if (!currentLesson) return;

        if (currentLesson.completed) {
            toast.info("Lesson already completed");
            return;
        }

        const updatedModules = lessonDataState.modules.map((module) => ({
            ...module,
            sections: module.sections.map((lesson) =>
                lesson.id === currentLesson.id ? { ...lesson, completed: true } : lesson
            )
        }));

        setLessonDataState({
            ...lessonDataState,
            modules: updatedModules,
            lessons: updatedModules.flatMap((module) => module.sections)
        });
    };

    const toggleBookmark = () => {
        if (!currentLesson) return;

        const isBookmarked = currentLesson.bookmarked;

        const updatedModules = lessonDataState.modules.map((module) => ({
            ...module,
            sections: module.sections.map((lesson) =>
                lesson.id === currentLesson.id ? { ...lesson, bookmarked: !lesson.bookmarked } : lesson
            )
        }));

        setLessonDataState({
            ...lessonDataState,
            modules: updatedModules,
            lessons: updatedModules.flatMap((module) => module.sections)
        });

        if (isBookmarked) {
            toast.info("Bookmark removed");
        } else {
            toast.success("Lesson bookmarked ⭐");
        }
    };

    const completedLessons = lessons.filter((lesson) => lesson.completed).length;
    const progress = lessons.length ? Math.round((completedLessons / lessons.length) * 100) : 0;

    return (
        <motion.div
            className={`lesson-layout ${readingMode ? "reading" : ""}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div id="lession-left">
                {!readingMode && (
                    <LessonSidebar
                        lessonData={lessonDataState}
                        filteredLessons={filteredLessons}
                        search={search}
                        setSearch={setSearch}
                        lessons={lessons}
                        activeLesson={currentLesson.id}
                        progress={progress}
                        completedLessons={completedLessons}
                        setActiveLesson={(lessonId) => {
                            const index = lessons.findIndex((lesson) => lesson.id === lessonId);
                            if (index !== -1) {
                                setActiveLesson(index);
                            }
                        }}
                    />
                )}
            </div>

            <div id="lesson-right">
                <LessonContent
                    lesson={currentLesson}
                    lessonData={lessonDataState}
                    activeLesson={activeLesson}
                    handleComplete={handleComplete}
                    toggleBookmark={toggleBookmark}
                    readingMode={readingMode}
                    setReadingMode={setReadingMode}
                />

                <Pagination
                    current={activeLesson}
                    total={lessons.length}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                />
            </div>
        </motion.div>
    );
}