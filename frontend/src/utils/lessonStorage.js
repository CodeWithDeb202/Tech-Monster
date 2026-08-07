const STORAGE_KEY = "techmonster_lessons";

export const loadLessonState = () => {

    try {

        const data = localStorage.getItem(STORAGE_KEY);

        return data ? JSON.parse(data) : null;

    } catch {

        return null;

    }

};

export const saveLessonState = (state) => {

    try {

        localStorage.setItem(

            STORAGE_KEY,

            JSON.stringify(state)

        );

    } catch (error) {

        console.error(error);

    }

};