import { useEffect, useMemo, useState } from "react";
import api from "../../../../../../../services/api/axios";
import "./LessonPage.css";

import Heading from "./Components/Heading";
import SubHeading from "./Components/SubHeading";
import Paragraph from "./Components/Paragraph";
import CodeBlock from "./Components/CodeBlock";
import NotePoint from "./Components/NotePoint";
import Lists from "./Components/Lists";
import Table from "./Components/Table";
import OutputPreview from "./Components/OutputPreview";
import Button from "./Components/Button";

export default function LessonPage({ courseSlug: propCourseSlug }) {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);

  const courseSlug = useMemo(() => {
    if (propCourseSlug) return propCourseSlug;

    const path = typeof window !== "undefined" ? window.location.pathname : "";
    const match = path.match(/\/lessons\/([^/]+)/i);
    return match?.[1] || "frontend-dev";
  }, [propCourseSlug]);

  useEffect(() => {
    let mounted = true;

    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/internships/slug/${courseSlug}`);
        const data = response?.data?.internship || null;

        if (!mounted) return;

        if (data?.slug) {
          setCourse(data);
        } else {
          setError("Course content could not be loaded.");
        }
      } catch {
        if (!mounted) return;
        setError("Unable to load the lesson content right now.");
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

  const lessons = useMemo(() => {
    if (!course?.modules) return [];

    return course.modules.flatMap((module) => module.lessons || []);
  }, [course]);

  const activeLesson = lessons[activeLessonIndex] || null;
  const notes = activeLesson?.notes ? [activeLesson.notes] : [];

  const renderNotes = () => {
    if (!notes.length) {
      return <Paragraph text="No lesson content is available for this course yet." />;
    }

    return notes.map((note, index) => (
      <section className="lesson-section" key={`${note?.heading || "note"}-${index}`}>
        <Heading title={note?.heading} />
        <SubHeading text={note?.subHeading || note?.heading} />
        <Paragraph text={note?.paragraph || note?.overview} />

        {note?.importantNotesPoint?.length ? (
          <NotePoint points={note.importantNotesPoint} />
        ) : null}

        {note?.keyPoints?.length ? (
          <Lists items={note.keyPoints} title="Key Points" />
        ) : null}

        {note?.demoCode ? (
          <CodeBlock code={note.demoCode} language={note.codeLanguage || "javascript"} />
        ) : null}

        {note?.tableData ? <Table data={note.tableData} /> : null}
        {note?.expectedOutput || note?.output ? (
          <OutputPreview output={note.expectedOutput || note.output} />
        ) : null}

        {note?.actionButtons?.length ? (
          <div className="lesson-actions">
            {note.actionButtons.map((button, btnIndex) => (
              <Button
                key={`${button.label}-${btnIndex}`}
                label={button.label}
                variant={btnIndex === 0 ? "primary" : "secondary"}
              />
            ))}
          </div>
        ) : null}
      </section>
    ));
  };

  if (loading) {
    return <div id="lesson-page" className="lesson-page--loading">Loading lesson content...</div>;
  }

  if (error) {
    return <div id="lesson-page" className="lesson-page--error">{error}</div>;
  }

  return (
    <div id="lesson-page">
      <div className="lesson-page__header">
        <div>
          <p className="lesson-page__eyebrow">{course?.category || "Course"}</p>
          <h1 className="lesson-page__title">{course?.title || "Lesson Content"}</h1>
        </div>
        <div className="lesson-page__meta">
          <span>{course?.totalEstimatedHours || "40 Hours"}</span>
          <span>{lessons.length} lessons</span>
        </div>
      </div>

      <div className="lesson-page__toolbar">
        {lessons.map((lesson, index) => (
          <button
            key={lesson.lessonId || `${lesson.lessonTitle}-${index}`}
            className={`lesson-page__pill ${index === activeLessonIndex ? "is-active" : ""}`}
            onClick={() => setActiveLessonIndex(index)}
          >
            {lesson.lessonTitle || `Lesson ${index + 1}`}
          </button>
        ))}
      </div>

      {renderNotes()}
    </div>
  );
}