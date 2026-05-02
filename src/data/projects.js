// Add a new project = append a new entry to this array. The Work page
// auto-numbers entries (01/, 02/, ...) and the CTA section gets the next
// number after the last project. ProjectPage reads `slug` from the URL
// (`/projectpage/:slug`) to find the matching entry.

export const projects = [
  {
    slug: 'notee-ai',
    nameLines: ['notee', 'AI-APP'],
    label: 'NOTEE AI ©2026',
    descriptionLines: [
      'An AI-powered voice note-taking',
      'app that turns recordings into ',
      'transcripts, summaries, and study tools.'
    ],
    coverImage: 'new1project.jpg',
    role: 'Design & Development',
    year: '2026',
    liveUrl: '',
    caseStudyDesktopFontSize: '22px',
    imagesDesktopPaddingLeft: '1000px',
    projectInfoTightTop: true,
    projectInfoWideUnderline: true,
    caseStudyDesktop: [
      'Notee AI is an iOS voice intelligence app that captures meetings, ',
      'interviews, and lectures with a single tap and converts them into ',
      'accurate, speaker-labeled transcripts with automatically generated ',
      'summaries. It also ingests uploaded audio files and YouTube URLs, ',
      'making any spoken content searchable. Each note is extended by ',
      'three AI features: a Study mode that produces flashcards and ',
      'quizzes for active recall, a Translate function that localizes ',
      'notes into any language while preserving speaker attribution, ',
      'and a Chat interface that answers questions grounded in the ',
      'user’s own recordings. Engineered in Flutter with a native Swift ',
      'audio layer, the app relies on AssemblyAI for transcription and ',
      'diarization, and LLMs (Claude / GPT-class) for Study, Translate, ',
      'and Chat. Notes are stored locally in SQLite and synced to AWS S3.'
    ],
    caseStudyMobile: [
      'Notee AI is an iOS voice intelligence app',
      'that captures meetings, interviews, and',
      'lectures with a single tap and converts',
      'them into accurate, speaker-labeled',
      'transcripts with automatically generated',
      'summaries. It also ingests uploaded audio',
      'files and YouTube URLs, making any spoken',
      'content searchable. Each note is extended',
      'by three AI features: a Study mode that',
      'produces flashcards and quizzes for active',
      'recall, a Translate function that',
      'localizes notes into any language while',
      'preserving speaker attribution, and a',
      'Chat interface that answers questions',
      'grounded in the user’s own recordings.',
      'Engineered in Flutter with a native',
      'Swift audio layer, the app relies on',
      'AssemblyAI for transcription and',
      'diarization, and LLMs (Claude / GPT-',
      'class) for Study, Translate, and Chat.',
      'Notes are stored locally in SQLite',
      'and synced to AWS S3.'
    ],
    images: [
      'notee1.PNG',
      'notee2.PNG',
      'notee3.PNG',
      'notee4.PNG',
      'notee5.PNG',
      'notee6.PNG',
      'notee7.PNG',
      'notee8.PNG'
    ]
  },
  {
    slug: 'portfolio',
    nameLines: ['ahmad', 'siddiqui'],
    label: 'PORTFOLIO ©2026',
    descriptionLines: [
      'A personal portfolio website',
      'designed and developed using ',
      'React, GSAP, Lenis, and Three.js.'
    ],
    coverImage: 'new2project.jpg',
    role: 'Design & Development',
    year: '2025',
    liveUrl: 'https://ahmadjavaidsiddiqui.com',
    caseStudyDesktop: [
      'The site features interactive sections such as ',
      'project galleries, animated page transitions, ',
      'and tab-based 3D model interactions on the ',
      'About page. React powers the component logic ',
      'and routing, while GSAP and ScrollTrigger ',
      'drive the blur-reveal letter cascades, parallax ',
      'effects, and image covers throughout. Lenis ',
      'handles the buttery smooth scrolling, and ',
      'Three.js renders the interactive 3D models. ',
      'The result feels fluid and modern across ',
      'mobile, tablet, and desktop.'
    ],
    caseStudyMobile: [
      'The site features interactive',
      'sections such as project galleries,',
      'animated page transitions, and',
      'tab-based 3D model interactions',
      'on the About page. React powers',
      'the component logic and routing,',
      'while GSAP and ScrollTrigger drive',
      'blur-reveal letter cascades,',
      'parallax effects, and image covers',
      'throughout. Lenis handles the',
      'smooth scrolling, and Three.js',
      'renders the interactive 3D models.'
    ],
    images: [
      'projectportfolio1.png',
      'projectportfolio2.png',
      'projectportfolio3.png',
      'projectportfolio4.png',
      'projectportfolio5.png'
    ]
  }
];

export const findProjectBySlug = (slug) => projects.find((p) => p.slug === slug);

export const featuredProject = projects[0];
