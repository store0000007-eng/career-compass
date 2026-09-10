export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const { answers, scores } = req.body;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({
        error: "Answers are required"
      });
    }

    if (!scores) {
      return res.status(400).json({
        error: "Scores are required"
      });
    }

    // Find the user's strongest trait
    const strongestTrait = Object.keys(scores).reduce((best, trait) => {
      return scores[trait] > scores[best] ? trait : best;
    });

    const careerMap = {
      Analytical: [
        "Data Analyst",
        "Software Developer",
        "Researcher"
      ],

      Leadership: [
        "Project Manager",
        "Business Manager",
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
