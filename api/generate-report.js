export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const { answers, scores } = req.body;

    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({
        error: "Answers are required"
      });
    }

    if (!scores || typeof scores !== "object") {
      return res.status(400).json({
        error: "Scores are required"
      });
    }

    const sortedTraits = Object.entries(scores)
      .sort((a, b) => b[1] - a[1]);

    const topTrait = sortedTraits[0][0];
    const secondTrait = sortedTraits[1][0];

    const totalQuestions = answers.length;

    const percentage = (trait) =>
      Math.round((scores[trait] / totalQuestions) * 100);

    const traitData = {
      Analytical: {
        title: "The Analytical Thinker",
        description:
          "You tend to understand problems deeply, look for patterns and prefer logical solutions.",
        careers: [
          "Software Developer",
          "Data Analyst",
          "Engineer",
          "Cybersecurity Specialist"
        ],
        strengths: [
          "Logical problem solving",
          "Pattern recognition",
          "Deep analysis",
          "Learning complex concepts"
        ],
        blindSpots: [
          "Overthinking decisions",
          "Spending too long perfecting solutions",
          "Focusing heavily on logic while overlooking people factors"
        ],
        skills: [
          "Programming",
          "Data analysis",
          "Communication",
          "Decision making",
          "Project execution"
        ],
        projects: [
          "Build a small website or app",
          "Analyze a real-world dataset",
          "Create a simple automation project"
        ]
      },

      Leadership: {
        title: "The Natural Leader",
        description:
          "You tend to take responsibility, make decisions and help move people toward a goal.",
        careers: [
          "Project Manager",
          "Business Manager",
          "Entrepreneur",
          "Marketing Manager"
        ],
        strengths: [
          "Decision making",
          "Taking initiative",
          "Motivating others",
          "Handling responsibility"
        ],
        blindSpots: [
          "Trying to control too much",
          "Moving too quickly",
          "Not always listening enough"
        ],
        skills: [
          "Communication",
          "Negotiation",
          "Project management",
          "Public speaking",
          "Strategic thinking"
        ],
        projects: [
          "Lead a small team project",
          "Organize an event or activity",
          "Run a small business experiment"
        ]
      },

      Creative: {
        title: "The Creative Builder",
        description:
          "You naturally enjoy ideas, originality and creating things that did not exist before.",
        careers: [
          "UI/UX Designer",
          "Product Designer",
          "Content Strategist",
          "Creative Director"
        ],
        strengths: [
          "Idea generation",
          "Original thinking",
          "Visual thinking",
          "Experimentation"
        ],
        blindSpots: [
          "Starting too many ideas",
          "Losing interest in repetitive work",
          "Difficulty finishing projects"
        ],
        skills: [
          "Design",
          "Storytelling",
          "Video editing",
          "User experience",
          "Presentation"
        ],
        projects: [
          "Design a mobile app concept",
          "Create a brand identity",
          "Build a small creative portfolio"
        ]
      },

      People: {
        title: "The People Connector",
        description:
          "You tend to value communication, relationships and understanding different perspectives.",
        careers: [
          "Teacher",
          "Psychologist",
          "Human Resources Specialist",
          "Sales Professional"
        ],
        strengths: [
          "Communication",
          "Empathy",
          "Relationship building",
          "Understanding perspectives"
        ],
        blindSpots: [
          "Taking criticism personally",
          "Saying yes too often",
          "Avoiding difficult conversations"
        ],
        skills: [
          "Public speaking",
          "Negotiation",
          "Active listening",
          "Networking",
          "Leadership"
        ],
        projects: [
          "Interview people about their careers",
          "Volunteer for a community project",
          "Practice public speaking"
        ]
      },

      Entrepreneurial: {
        title: "The Opportunity Seeker",
        description:
          "You tend to notice opportunities, think independently and enjoy building things.",
        careers: [
          "Entrepreneur",
          "Product Manager",
          "Business Development",
          "Marketing Strategist"
        ],
        strengths: [
          "Opportunity spotting",
          "Initiative",
          "Independent thinking",
          "Problem identification"
        ],
        blindSpots: [
          "Chasing too many opportunities",
          "Underestimating execution",
          "Taking unnecessary risks"
        ],
        skills: [
          "Sales",
          "Marketing",
          "Finance basics",
          "Product development",
          "Negotiation"
        ],
        projects: [
          "Identify a real-world problem",
          "Create a simple solution",
          "Build and test a small landing page"
        ]
      },

      Structured: {
        title: "The Organized Strategist",
        description:
          "You tend to value organization, reliability, planning and clear systems.",
        careers: [
          "Financial Analyst",
          "Operations Manager",
          "Project Coordinator",
          "Accountant"
        ],
        strengths: [
          "Organization",
          "Consistency",
          "Planning",
          "Attention to detail"
        ],
        blindSpots: [
          "Over-planning",
          "Discomfort with uncertainty",
          "Difficulty adapting to sudden changes"
        ],
        skills: [
          "Project management",
          "Financial literacy",
          "Excel",
          "Time management",
          "Process improvement"
        ],
        projects: [
          "Build a personal productivity system",
          "Create a budget tracker",
          "Organize a small project"
        ]
      }
    };

    const primary = traitData[topTrait];
    const secondary = traitData[secondTrait];

    if (!primary || !secondary) {
      return res.status(400).json({
        error: "Invalid assessment traits"
      });
    }

    /*
      Create career combinations based on the user's
      strongest TWO traits.
    */

    const combinations = {
      "Analytical+Creative": [
        "Product Designer",
        "UX Engineer",
        "Creative Technologist"
      ],

      "Analytical+Leadership": [
        "Technology Project Manager",
        "Engineering Manager",
        "Product Manager"
      ],

      "Analytical+Entrepreneurial": [
        "Tech Entrepreneur",
        "Startup Product Manager",
        "Business Intelligence Specialist"
      ],

      "Analytical+Structured": [
        "Data Analyst",
        "Systems Analyst",
        "Financial Analyst"
      ],

      "Analytical+People": [
        "Technical Consultant",
        "Product Manager",
        "Technology Trainer"
      ],

      "Leadership+Creative": [
        "Creative Director",
        "Brand Manager",
        "Marketing Manager"
      ],

      "Leadership+Entrepreneurial": [
        "Entrepreneur",
        "Startup Founder",
        "Business Development Manager"
      ],

      "Leadership+Structured": [
        "Project Manager",
        "Operations Manager",
        "Program Manager"
      ],

      "Leadership+People": [
        "HR Manager",
        "Team Manager",
        "Sales Manager"
      ],

      "Creative+Entrepreneurial": [
        "Creative Entrepreneur",
        "Brand Strategist",
        "Product Creator"
      ],

      "Creative+Structured": [
        "UX Designer",
        "Product Designer",
        "Design Operations Specialist"
      ],

      "Creative+People": [
        "Content Strategist",
        "UX Researcher",
        "Communication Specialist"
      ],

      "Entrepreneurial+Structured": [
        "Business Operations Manager",
        "Product Manager",
        "Business Analyst"
      ],

      "Entrepreneurial+People": [
        "Sales Strategist",
        "Business Development Manager",
        "Marketing Manager"
      ],

      "Structured+People": [
        "HR Operations Specialist",
        "Project Coordinator",
        "Customer Success Manager"
      ]
    };

    const key1 = `${topTrait}+${secondTrait}`;
    const key2 = `${secondTrait}+${topTrait}`;

    const careerMatches =
      combinations[key1] ||
      combinations[key2] ||
      primary.careers.slice(0, 3);

    const report = {
      profile: {
        title: primary.title,
        description: primary.description,
        strongestTrait: topTrait,
        secondTrait: secondTrait,

        scores: {
          [topTrait]: percentage(topTrait),
          [secondTrait]: percentage(secondTrait)
        }
      },

      careerMatches,

      strengths: [
        ...primary.strengths.slice(0, 3),
        secondary.strengths[0]
      ],

      blindSpots: [
        primary.blindSpots[0],
        primary.blindSpots[1],
        secondary.blindSpots[0]
      ],

      skills: [
        ...primary.skills.slice(0, 3),
        secondary.skills[0]
      ],

      projects: [
        ...primary.projects,
        secondary.projects[0]
      ],

      personalizedInsight:
        `Your strongest trait is ${topTrait}, while ${secondTrait} is your second strongest trait. ` +
        `This combination suggests you may perform best in careers that allow you to use both abilities rather than relying on only one.`,

      answerCount: answers.length
    };

    return res.status(200).json({
      success: true,
      report
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Something went wrong while generating the report."
    });
  }
}        "Business Manager",
        "Team Leader"
      ],

      Creative: [
        "UI/UX Designer",
        "Content Strategist",
        "Creative Director"
      ],

      People: [
        "Psychologist",
        "Teacher",
        "Human Resources Specialist"
      ],

      Entrepreneurial: [
        "Entrepreneur",
        "Product Manager",
        "Marketing Strategist"
      ],

      Structured: [
        "Financial Analyst",
        "Operations Manager",
        "Accountant"
      ]
    };

    const careers = careerMap[strongestTrait] || [
      "Technology",
      "Business",
      "Creative Fields"
    ];

    return res.status(200).json({
      success: true,

      profile: {
        strongestTrait: strongestTrait,
        scores: scores
      },

      careerMatches: careers,

      answerCount: answers.length,

      message: "Personalized career report generated successfully."
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Something went wrong."
    });
  }
}
