import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.join(__dirname, 'data', 'courses');

const courseDefinitions = [
  {
    slug: 'frontend-dev',
    title: 'Frontend Development Internship Track',
    category: 'Frontend Engineering',
    totalEstimatedHours: '40 Hours',
    modules: [
      {
        title: 'Modern Frontend Foundations',
        lessons: ['Semantic HTML and Accessibility', 'CSS Architecture and Responsive Layout', 'JavaScript Essentials for UI']
      },
      {
        title: 'Component-Driven UI Development',
        lessons: ['React Fundamentals', 'State Management Patterns', 'Routing and Form Handling']
      },
      {
        title: 'Performance, Testing and Delivery',
        lessons: ['Performance Optimization', 'Testing Strategies', 'Deployment Workflows']
      }
    ]
  },
  {
    slug: 'backend-dev',
    title: 'Backend Development Internship Track',
    category: 'Backend Engineering',
    totalEstimatedHours: '40 Hours',
    modules: [
      {
        title: 'Server-Side Foundations',
        lessons: ['HTTP, REST and API Design', 'Node.js Runtime Basics', 'Express Middleware Patterns']
      },
      {
        title: 'Data and Authentication',
        lessons: ['Database Integration', 'Authentication and Authorization', 'Caching and Session Management']
      },
      {
        title: 'Reliability and Scaling',
        lessons: ['Logging and Error Handling', 'Queueing and Background Jobs', 'Deployment and Monitoring']
      }
    ]
  },
  {
    slug: 'fullstack-dev',
    title: 'Full Stack Development Internship Track',
    category: 'Full Stack Engineering',
    totalEstimatedHours: '40 Hours',
    modules: [
      {
        title: 'Full Stack Architecture',
        lessons: ['Client-Server Architecture', 'Project Structure and Tooling', 'Environment Configuration']
      },
      {
        title: 'End-to-End Product Building',
        lessons: ['Building APIs and UIs', 'Authentication Flows', 'Data Validation and Forms']
      },
      {
        title: 'Delivery and Production Readiness',
        lessons: ['Deployment Pipelines', 'Observability and Debugging', 'Security Hardening']
      }
    ]
  },
  {
    slug: 'mongodb',
    title: 'MongoDB Database Internship Track',
    category: 'Database Engineering',
    totalEstimatedHours: '40 Hours',
    modules: [
      {
        title: 'MongoDB Foundations',
        lessons: ['Document Model Basics', 'Schema Design Principles', 'CRUD Operations']
      },
      {
        title: 'Querying and Indexing',
        lessons: ['Filtering and Sorting', 'Aggregation Pipelines', 'Indexing for Performance']
      },
      {
        title: 'Operations and Scaling',
        lessons: ['Replica Sets and Sharding', 'Transactions and Concurrency', 'Backup and Monitoring']
      }
    ]
  },
  {
    slug: 'sql-database',
    title: 'SQL Database Internship Track',
    category: 'Database Engineering',
    totalEstimatedHours: '40 Hours',
    modules: [
      {
        title: 'Relational Foundations',
        lessons: ['Tables, Rows and Keys', 'Selecting and Filtering Data', 'Joins and Relationships']
      },
      {
        title: 'Data Integrity and Design',
        lessons: ['Normalization and Constraints', 'Indexes and Query Plans', 'Views and Stored Procedures']
      },
      {
        title: 'Production SQL Skills',
        lessons: ['Transactions and Locking', 'Backup and Recovery', 'Performance Tuning']
      }
    ]
  },
  {
    slug: 'python-programming',
    title: 'Python Programming Internship Track',
    category: 'Programming',
    totalEstimatedHours: '40 Hours',
    modules: [
      {
        title: 'Python Essentials',
        lessons: ['Variables, Conditionals and Loops', 'Functions and Modules', 'Data Structures']
      },
      {
        title: 'Practical Python Development',
        lessons: ['File Handling and Exceptions', 'Object-Oriented Programming', 'Testing and Packaging']
      },
      {
        title: 'Python in Modern Applications',
        lessons: ['Automation and Scripting', 'Web Scraping Basics', 'APIs and Data Processing']
      }
    ]
  },
  {
    slug: 'java-development',
    title: 'Java Development Internship Track',
    category: 'Programming',
    totalEstimatedHours: '40 Hours',
    modules: [
      {
        title: 'Java Fundamentals',
        lessons: ['Syntax and Core Concepts', 'Classes and Objects', 'Collections and Generics']
      },
      {
        title: 'Enterprise Java Patterns',
        lessons: ['Exception Handling', 'Interfaces and Inheritance', 'Multithreading Basics']
      },
      {
        title: 'Java Ecosystem Skills',
        lessons: ['Streams and Lambdas', 'Build Tools and Dependency Management', 'Testing with JUnit']
      }
    ]
  },
  {
    slug: 'cpp-systems',
    title: 'C++ Systems Programming Internship Track',
    category: 'Systems Programming',
    totalEstimatedHours: '40 Hours',
    modules: [
      {
        title: 'C++ Core Concepts',
        lessons: ['Memory and Pointers', 'Classes and Templates', 'Standard Library Basics']
      },
      {
        title: 'Systems-Level Programming',
        lessons: ['RAII and Resource Management', 'Concurrency and Threads', 'Low-Level I/O']
      },
      {
        title: 'Performance and Reliability',
        lessons: ['Optimization Techniques', 'Debugging and Profiling', 'Safe Coding Practices']
      }
    ]
  },
  {
    slug: 'c-programming',
    title: 'C Programming Internship Track',
    category: 'Systems Programming',
    totalEstimatedHours: '40 Hours',
    modules: [
      {
        title: 'C Foundations',
        lessons: ['Variables and Control Flow', 'Functions and Scope', 'Pointers and Arrays']
      },
      {
        title: 'Memory and Structures',
        lessons: ['Dynamic Memory Allocation', 'Structs and Unions', 'File Handling']
      },
      {
        title: 'Robust C Development',
        lessons: ['Debugging Strategies', 'Command-Line Programs', 'Code Review Essentials']
      }
    ]
  },
  {
    slug: 'php-mysql',
    title: 'PHP and MySQL Internship Track',
    category: 'Web Development',
    totalEstimatedHours: '40 Hours',
    modules: [
      {
        title: 'PHP Fundamentals',
        lessons: ['Syntax and Variables', 'Functions and Forms', 'Sessions and Cookies']
      },
      {
        title: 'Database Integration',
        lessons: ['Connecting PHP to MySQL', 'Prepared Statements', 'CRUD Workflows']
      },
      {
        title: 'Secure Web Applications',
        lessons: ['Input Validation', 'Security Best Practices', 'Deployment Basics']
      }
    ]
  },
  {
    slug: 'data-science',
    title: 'Data Science Internship Track',
    category: 'Data Science',
    totalEstimatedHours: '40 Hours',
    modules: [
      {
        title: 'Data Analysis Foundations',
        lessons: ['Data Wrangling Basics', 'Exploratory Data Analysis', 'Visualization Principles']
      },
      {
        title: 'Statistical Thinking',
        lessons: ['Probability and Distributions', 'Hypothesis Testing', 'Regression Basics']
      },
      {
        title: 'Data Science Workflow',
        lessons: ['Feature Engineering', 'Model Evaluation', 'Reporting and Storytelling']
      }
    ]
  },
  {
    slug: 'machine-learning-ai',
    title: 'Machine Learning and AI Internship Track',
    category: 'Artificial Intelligence',
    totalEstimatedHours: '40 Hours',
    modules: [
      {
        title: 'Machine Learning Foundations',
        lessons: ['Understanding Supervised Learning', 'Unsupervised Learning Basics', 'Evaluation Metrics']
      },
      {
        title: 'Model Building Practice',
        lessons: ['Feature Scaling and Encoding', 'Decision Trees and Ensembles', 'Neural Network Basics']
      },
      {
        title: 'Responsible AI Deployment',
        lessons: ['Bias and Fairness', 'Model Deployment', 'Monitoring AI Systems']
      }
    ]
  },
  {
    slug: 'devops-cloud',
    title: 'DevOps and Cloud Internship Track',
    category: 'Cloud Engineering',
    totalEstimatedHours: '40 Hours',
    modules: [
      {
        title: 'DevOps Culture and Practices',
        lessons: ['CI/CD Pipelines', 'Version Control Workflows', 'Infrastructure as Code']
      },
      {
        title: 'Cloud Operations',
        lessons: ['Containers and Docker', 'Cloud Networking Basics', 'Secrets and Config Management']
      },
      {
        title: 'Reliability Engineering',
        lessons: ['Monitoring and Alerts', 'Scaling and Auto-Healing', 'Disaster Recovery']
      }
    ]
  },
  {
    slug: 'cyber-security',
    title: 'Cyber Security Internship Track',
    category: 'Security',
    totalEstimatedHours: '40 Hours',
    modules: [
      {
        title: 'Security Foundations',
        lessons: ['Threat Modeling Basics', 'Authentication and Password Safety', 'Common Vulnerabilities']
      },
      {
        title: 'Defensive Practices',
        lessons: ['Network Security Basics', 'Secure Coding Practices', 'Incident Response Principles']
      },
      {
        title: 'Security Operations',
        lessons: ['Log Analysis', 'Security Tools and Scanning', 'Compliance and Risk Management']
      }
    ]
  },
  {
    slug: 'android-dev',
    title: 'Android Development Internship Track',
    category: 'Mobile Engineering',
    totalEstimatedHours: '40 Hours',
    modules: [
      {
        title: 'Android Foundations',
        lessons: ['App Architecture Basics', 'Layouts and UI Components', 'Activity and Fragment Lifecycle']
      },
      {
        title: 'Mobile Data and Navigation',
        lessons: ['State Management in Android', 'Networking with Retrofit', 'Navigation and Deep Links']
      },
      {
        title: 'Production Android Apps',
        lessons: ['Persistence and Room', 'Testing and Debugging', 'Publishing and Performance']
      }
    ]
  },
  {
    slug: 'system-design',
    title: 'System Design Internship Track',
    category: 'Software Architecture',
    totalEstimatedHours: '40 Hours',
    modules: [
      {
        title: 'System Design Foundations',
        lessons: ['Requirements and Constraints', 'Scalability Principles', 'API and Data Flow Design']
      },
      {
        title: 'High-Level Architecture',
        lessons: ['Load Balancing and Caching', 'Databases and Storage Choices', 'Message Queues and Async Flows']
      },
      {
        title: 'Reliability and Tradeoffs',
        lessons: ['Consistency and Availability', 'Fault Tolerance', 'Capacity Planning']
      }
    ]
  }
];

function getDifficulty(index) {
  if (index % 3 === 0) return 'Beginner';
  if (index % 3 === 1) return 'Intermediate';
  return 'Advanced';
}

function getEstimatedTime(difficulty) {
  if (difficulty === 'Advanced') return '30 mins';
  if (difficulty === 'Intermediate') return '25 mins';
  return '20 mins';
}

function buildActionButtons(language) {
  const compilerLang = language === 'sql' ? 'sql' : language === 'python' ? 'python' : language === 'java' ? 'java' : 'javascript';
  return [
    {
      label: 'Try It Yourself',
      actionType: 'OPEN_COMPILER',
      targetUrl: `/compiler?lang=${compilerLang}`
    },
    {
      label: 'View Live Demo',
      actionType: 'OPEN_DEMO',
      targetUrl: 'https://demo.example.com'
    }
  ];
}

function buildDemoCode(courseSlug, topic, language) {
  const snippets = {
    'frontend-dev': {
      javascript: `// Build a reusable card component\nconst card = ({ title, subtitle }) => {\n  return ` + "`<section class=\"card\">\n  <h3>${title}</h3>\n  <p>${subtitle}</p>\n</section>`" + `;\n};\n\nconsole.log(card({ title: 'Launch', subtitle: 'Ready for review' }));`,
      css: `.card { padding: 16px; border-radius: 12px; background: #111827; color: #fff; }`
    },
    'backend-dev': {
      javascript: `import express from 'express';\n\nconst app = express();\napp.get('/health', (req, res) => res.json({ ok: true }));\napp.listen(3000);`,
      sql: `SELECT id, name FROM projects WHERE status = 'active';`
    },
    'fullstack-dev': {
      javascript: `const apiUrl = '/api/projects';\nfetch(apiUrl).then((res) => res.json()).then((data) => console.log(data));`
    },
    'mongodb': {
      javascript: `const pipeline = [\n  { $match: { status: 'active' } },\n  { $group: { _id: '$owner', total: { $sum: 1 } } }\n];\nconsole.log(JSON.stringify(pipeline, null, 2));`
    },
    'sql-database': {
      sql: `SELECT department, COUNT(*) AS total_employees\nFROM employees\nGROUP BY department;`
    },
    'python-programming': {
      python: `def greet(name):\n    return f"Hello, {name}"\n\nprint(greet("Asha"))`
    },
    'java-development': {
      java: `public class Hello {\n  public static void main(String[] args) {\n    System.out.println("Hello, Java");\n  }\n}`
    },
    'cpp-systems': {
      cpp: `#include <iostream>\nint main() { std::cout << \"C++ ready\" << std::endl; return 0; }`
    },
    'c-programming': {
      c: `#include <stdio.h>\nint main(void) { printf(\"Hello, C\\n\"); return 0; }`
    },
    'php-mysql': {
      php: `<?php\n$pdo = new PDO('mysql:host=localhost;dbname=app', 'root', '');\necho 'Connected';` 
    },
    'data-science': {
      python: `import pandas as pd\n\ndf = pd.DataFrame({'score': [88, 92, 95]})\nprint(df.describe())`
    },
    'machine-learning-ai': {
      python: `from sklearn.linear_model import LogisticRegression\nmodel = LogisticRegression(max_iter=1000)\nprint(type(model).__name__)`
    },
    'devops-cloud': {
      yaml: `services:\n  web:\n    image: nginx:latest\n    ports:\n      - \"80:80\"`
    },
    'cyber-security': {
      bash: `curl -I https://example.com` 
    },
    'android-dev': {
      kotlin: `fun main() { println(\"Android ready\") }`
    },
    'system-design': {
      javascript: `const services = ['api', 'cache', 'db'];\nconsole.log(services.join(' -> '));`
    }
  };

  const languageMap = {
    javascript: 'javascript',
    python: 'python',
    java: 'java',
    cpp: 'cpp',
    c: 'c',
    php: 'php',
    sql: 'sql',
    yaml: 'yaml',
    bash: 'bash',
    kotlin: 'kotlin'
  };

  const snippet = snippets[courseSlug]?.[language] || snippets[courseSlug]?.javascript || `// ${topic} demo`;
  return { code: snippet, language: languageMap[language] || language };
}

function buildOverview(courseTitle, topic, difficulty) {
  return `This lesson introduces ${topic.toLowerCase()} in a practical, beginner-friendly way for ${courseTitle}. You will learn the core concepts, see how they fit into real delivery workflows, and understand how to apply them to building reliable software products. The content is designed to make complex ideas approachable while still preparing you for real-world implementation and interviews.`;
}

function buildKeyPoints(topic, courseSlug) {
  return [
    `${topic} helps you connect theory with implementation`,
    `A strong grasp of ${topic.toLowerCase()} improves debugging and collaboration`,
    `Applying ${topic.toLowerCase()} consistently leads to cleaner systems and better reviews`
  ];
}

function buildFlashcards(topic) {
  return [
    {
      question: `Why is ${topic.toLowerCase()} important?`,
      answer: 'It provides a foundation for building maintainable and production-ready solutions.'
    },
    {
      question: `What does ${topic.toLowerCase()} improve in practice?`,
      answer: 'It improves clarity, reliability, and team communication during implementation.'
    }
  ];
}

function buildInterviewQuestions(topic) {
  return [
    {
      question: `How would you explain ${topic.toLowerCase()} to a team member?`,
      answer: 'I would describe it as a practical technique that improves structure, maintainability, and problem solving.'
    },
    {
      question: `What is one real-world benefit of ${topic.toLowerCase()}?`,
      answer: 'It reduces confusion, speeds up debugging, and makes systems easier to evolve.'
    }
  ];
}

function buildTasks(courseSlug, topic, language, level, taskIndex) {
  const base = [
    {
      taskId: 'task-1',
      title: 'Task 1: Warm-up Practice',
      level: 'Easy',
      problemStatement: `Create a small practice example that demonstrates ${topic.toLowerCase()} in a simple way.`,
      hint: 'Start with a minimal working example and expand it once the core behavior is clear.',
      solutionCode: buildDemoCode(courseSlug, topic, language).code
    },
    {
      taskId: 'task-2',
      title: 'Task 2: Scenario-Based Challenge',
      level: 'Medium',
      problemStatement: `Build a realistic scenario around ${topic.toLowerCase()} that solves a common product requirement.`,
      hint: 'Think about edge cases, input validation, and maintainability before coding.',
      solutionCode: buildDemoCode(courseSlug, topic, language).code
    },
    {
      taskId: 'task-3',
      title: 'Task 3: Advanced Optimization Task',
      level: 'Hard',
      problemStatement: `Refine your solution so ${topic.toLowerCase()} is applied efficiently and can scale for a larger use case.`,
      hint: 'Focus on structure, clarity, and performance while keeping the solution readable.',
      solutionCode: buildDemoCode(courseSlug, topic, language).code
    }
  ];

  return base.map((task, idx) => ({ ...task, taskId: `task-${idx + 1}` }));
}

function buildLesson(courseSlug, courseTitle, lessonTitle, topic, index, language) {
  const difficulty = getDifficulty(index);
  const estimatedTime = getEstimatedTime(difficulty);
  const demo = buildDemoCode(courseSlug, topic, language);
  const notes = {
    heading: `${lessonTitle} Essentials`,
    estimatedTime,
    difficulty,
    overview: buildOverview(courseTitle, topic, difficulty),
    architectureDiagramUrl: `https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80`,
    keyPoints: buildKeyPoints(topic, courseSlug),
    actionButtons: buildActionButtons(demo.language),
    demoCode: demo.code,
    codeLanguage: demo.language,
    codeExplanation: `The demo shows how ${topic.toLowerCase()} can be applied in a clear and practical example. It highlights the control flow, the important building blocks, and how the idea connects to everyday development work.`,
    expectedOutput: 'The example runs successfully and prints or logs the expected result for the sample scenario.',
    commonMistakes: [
      `Trying to memorize ${topic.toLowerCase()} without practicing it on a small example`,
      `Ignoring structure and readability when the solution grows larger`
    ],
    cheatsheetSummary: `${topic} is most useful when you practice it repeatedly and connect it to real product problems.`,
    flashcards: buildFlashcards(topic),
    interviewQuestions: buildInterviewQuestions(topic)
  };

  return {
    lessonId: `less-${String(index).padStart(3, '0')}`,
    lessonTitle: `Lesson ${index}: ${lessonTitle}`,
    notes,
    tasks: buildTasks(courseSlug, topic, demo.language, difficulty, index)
  };
}

function buildCourse(definition) {
  const modules = definition.modules.map((module, moduleIndex) => ({
    moduleId: `mod-${moduleIndex + 1}`,
    moduleTitle: `Module ${moduleIndex + 1}: ${module.title}`,
    lessons: module.lessons.map((lessonTitle, lessonIndex) => {
      const lessonNumber = moduleIndex * 3 + lessonIndex + 1;
      const language = definition.slug === 'sql-database'
        ? 'sql'
        : definition.slug === 'python-programming'
          ? 'python'
          : definition.slug === 'java-development'
            ? 'java'
            : definition.slug === 'cpp-systems'
              ? 'cpp'
              : definition.slug === 'c-programming'
                ? 'c'
                : definition.slug === 'php-mysql'
                  ? 'php'
                  : definition.slug === 'data-science'
                    ? 'python'
                    : definition.slug === 'machine-learning-ai'
                      ? 'python'
                      : definition.slug === 'devops-cloud'
                        ? 'yaml'
                        : definition.slug === 'cyber-security'
                          ? 'bash'
                          : definition.slug === 'android-dev'
                            ? 'kotlin'
                            : 'javascript';
      return buildLesson(definition.slug, definition.title, lessonTitle, lessonTitle, lessonNumber, language);
    })
  }));

  return {
    slug: definition.slug,
    title: definition.title,
    category: definition.category,
    totalEstimatedHours: definition.totalEstimatedHours,
    modules
  };
}

async function main() {
  await mkdir(outputDir, { recursive: true });

  for (const definition of courseDefinitions) {
    const course = buildCourse(definition);
    const filePath = path.join(outputDir, `${definition.slug}.json`);
    await writeFile(filePath, JSON.stringify(course, null, 2));
  }

  console.log(`Created ${courseDefinitions.length} course files in ${outputDir}`);
}

main().catch((error) => {
  console.error('Failed to generate courses:', error);
  process.exit(1);
});
