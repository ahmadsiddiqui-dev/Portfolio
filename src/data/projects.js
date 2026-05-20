// Add a new project = append a new entry to this array. The Work page
// auto-numbers entries (01/, 02/, ...) and the CTA section gets the next
// number after the last project. ProjectPage reads `slug` from the URL
// (`/projectpage/:slug`) to find the matching entry.

export const projects = [
  {
    slug: 'notee-ai',
    nameLines: ['Talkie', 'Notes AI'],
    label: 'TALKIE NOTES AI ©2026',
    descriptionLines: [
      'An AI-powered voice note-taking',
      'app that turns recordings into ',
      'transcripts, summaries, and study tools.'
    ],
    coverImage: 'new1project.jpg',
    coverImageAndroid: 'new1project-android.jpg',
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
      'notee1.jpeg',
      'notee2.jpeg',
      'notee3.jpeg',
      'notee4.jpeg',
      'notee5.jpeg',
      'notee6.jpeg',
      'notee7.jpeg',
      'notee8.jpeg',
      'notee9.jpeg',
      'notee10.jpeg',
      'notee11.jpeg',
      'notee12.jpeg'
    ]
  },
  {
    slug: 'capgeno-ai',
    nameLines: ['Capgeno', 'AI'],
    label: 'CAPGENO AI ©2026',
    descriptionLines: [
      'An AI-powered caption generator',
      'app that turns any photo into ',
      'ready-to-post captions and hashtags.'
    ],
    coverImage: 'capgenocover.jpg',
    role: 'Design & Development',
    year: '2026',
    liveUrl: '',
    caseStudyDesktopFontSize: '22px',
    imagesDesktopPaddingLeft: '1000px',
    projectInfoTightTop: true,
    projectInfoWideUnderline: true,
    caseStudyDesktop: [
      'Capgeno AI is a mobile caption generator that turns any ',
      'photo into ready-to-post captions in seconds. Upload an ',
      'image, choose a mood — funny, professional, poetic, ',
      'romantic, or motivational — and the app returns polished ',
      'captions tailored to the moment, complete with relevant ',
      'hashtags and expressive emojis. A length control lets ',
      'users dial captions from short and punchy to long and ',
      'descriptive, while multi-language support generates ',
      'captions in the user’s preferred language. Finished ',
      'captions can be shared directly to social apps or copied ',
      'in a single tap. Built with React Native for a single, ',
      'fast codebase across iOS and Android, the app pairs an ',
      'LLM (Claude / GPT-class) with on-device image understanding, ',
      'and ships with full dark-theme support for day or night.'
    ],
    caseStudyMobile: [
      'Capgeno AI is a mobile caption',
      'generator that turns any photo into',
      'ready-to-post captions in seconds.',
      'Upload an image, choose a mood —',
      'funny, professional, poetic, romantic,',
      'or motivational — and the app returns',
      'polished captions tailored to the',
      'moment, complete with relevant',
      'hashtags and expressive emojis. A',
      'length control lets users dial captions',
      'from short and punchy to long and',
      'descriptive, while multi-language',
      'support generates captions in the',
      'user’s preferred language. Finished',
      'captions can be shared directly to',
      'social apps or copied in a single tap.',
      'Built with React Native for a single,',
      'fast codebase across iOS and Android,',
      'the app pairs an LLM (Claude / GPT-',
      'class) with on-device image',
      'understanding, and ships with full',
      'dark-theme support.'
    ],
    images: [
      'capgeno1.jpeg',
      'capgeno2.jpeg',
      'capgeno3.jpeg',
      'capgeno4.jpeg',
      'capgeno5.jpeg',
      'capgeno6.jpeg'
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
    coverImageAndroid: 'new2project-android.jpg',
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
