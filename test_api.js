const testGrade = async () => {
    console.log("Testing /api/grade...");
    try {
        const response = await fetch('http://localhost:3000/api/grade', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                topicTitle: "Python Basics",
                questionsAndAnswers: [
                    {
                        question: "What is a list comprehension?",
                        answer: "A list comprehension is a concise way to create lists in Python using brackets."
                    }
                ]
            })
        });
        
        if (!response.ok) {
            console.error("Grade Error:", await response.text());
            return;
        }
        
        const data = await response.json();
        console.log("Grade Response:", data);
        if (typeof data.passed !== 'boolean' || typeof data.feedback !== 'string') {
            console.error("Invalid response structure from /api/grade");
        } else {
            console.log("✅ /api/grade is working correctly.");
        }
    } catch (err) {
        console.error("Failed to fetch /api/grade:", err);
    }
};

const testVerdict = async () => {
    console.log("\nTesting /api/verdict...");
    try {
        const response = await fetch('http://localhost:3000/api/verdict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                subjectTitle: "Python Full Stack",
                performanceHistory: [
                    { topicTitle: "Python Basics", passed: true, feedback: "Good understanding." },
                    { topicTitle: "Django", passed: false, feedback: "Needs to learn ORM better." }
                ]
            })
        });
        
        if (!response.ok) {
            console.error("Verdict Error:", await response.text());
            return;
        }
        
        const data = await response.json();
        console.log("Verdict Response:", data);
        if (typeof data.verdictTitle !== 'string' || typeof data.verdictMessage !== 'string') {
            console.error("Invalid response structure from /api/verdict");
        } else {
            console.log("✅ /api/verdict is working correctly.");
        }
    } catch (err) {
        console.error("Failed to fetch /api/verdict:", err);
    }
};

const runTests = async () => {
    await testGrade();
    await testVerdict();
};

runTests();
