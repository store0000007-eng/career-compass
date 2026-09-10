export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const { answers } = req.body;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({
        error: "Answers are required"
      });
    }

    // AI integration will be connected here later.
    // We are keeping the API key out of the website for security.

    return res.status(200).json({
      success: true,
      message: "Career assessment received successfully.",
      answerCount: answers.length
    });

  } catch (error) {

    return res.status(500).json({
      error: "Something went wrong."
    });

  }
}
