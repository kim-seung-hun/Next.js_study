import { buildFeedbackPath, extractFeedback } from "./feedback";

function handler(req, res) {
  // 이 feedbackId를 써서 feedback.js 파일의 특정 피드백 항목을 검색할 수 있다.
  const feedbackId = req.query.feedbackId;
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  const seletedFeedback = data.find((feedback) => feedback.id === feedbackId);

  res.status(200).json({ feedback: seletedFeedback });
}

export default handler;
