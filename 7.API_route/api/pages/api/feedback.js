// next.js에서 api 폴더에 있는 파일들을은 React 컴포넌트를 내보내지 않는다.

// 서버측 코드를 실행할 수 있다.
// 여기에 추가된 코드는 클라이언트측에 도달하지 않는다.(즉, 웹사이트에 방문한 사람들에겐 보이지 않는다.)

import fs from "fs";
import path from "path";

export function buildFeedbackPath() {
  return path.join(process.cwd(), "data", "feedback.json");
}

export function extractFeedback(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}

function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const feedbackText = req.body.text;

    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      text: feedbackText,
    };

    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));

    res
      .status(201)
      .json({ message: "data push success!", feedback: newFeedback });
  } else {
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    // 응답 성공을 200으로 상태를 표시하고, 첫번째 메서드 호출의 결과를 json 데이터를 반환한다.
    res.status(200).json({ feedback: data });
  }
}

export default handler;
