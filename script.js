document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements (existing)
    const subjectSelect = document.getElementById('subject-select');
    const roadmapTimeline = document.getElementById('roadmap-timeline');
    const heroTitle = document.getElementById('hero-title');
    const heroDesc = document.getElementById('hero-desc');
    const hoursInput = document.getElementById('hours-per-day');
    const levelSelect = document.getElementById('experience-level');
    const resetBtn = document.getElementById('reset-progress');
    const totalTimeBadge = document.getElementById('total-time-badge');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    
    // Switch Modal Elements
    const switchModal = document.getElementById('switch-modal');
    const modalStayBtn = document.getElementById('modal-stay-btn');
    const modalSwitchBtn = document.getElementById('modal-switch-btn');
    const currentSubjectNameSpan = document.getElementById('current-subject-name');
    const newSubjectNameSpan = document.getElementById('new-subject-name');
    
    // Quiz Modal Elements
    const quizModal = document.getElementById('quiz-modal');
    const quizTitle = document.getElementById('quiz-title');
    const quizQuestionsContainer = document.getElementById('quiz-questions-container');
    const quizFeedbackContainer = document.getElementById('quiz-feedback-container');
    const quizResultTitle = document.getElementById('quiz-result-title');
    const quizResultText = document.getElementById('quiz-result-text');
    const quizSubmitBtn = document.getElementById('quiz-submit-btn');
    const quizCancelBtn = document.getElementById('quiz-cancel-btn');
    const quizRestudyBtn = document.getElementById('quiz-restudy-btn');
    const quizProceedBtn = document.getElementById('quiz-proceed-btn');
    const quizCloseBtn = document.getElementById('quiz-close-btn');
    const quizActionsDefault = document.getElementById('quiz-actions-default');
    const quizActionsFail = document.getElementById('quiz-actions-fail');
    const quizActionsPass = document.getElementById('quiz-actions-pass');

    // Verdict Modal Elements
    const verdictModal = document.getElementById('verdict-modal');
    const verdictTitle = document.getElementById('verdict-title');
    const verdictText = document.getElementById('verdict-text');
    const verdictLoading = document.getElementById('verdict-loading');
    const verdictCloseBtn = document.getElementById('verdict-close-btn');

    // Notes Modal Elements
    const notesModal = document.getElementById('notes-modal');
    const notesCloseBtn = document.getElementById('notes-close-btn');
    const notesContainer = document.getElementById('notes-container');

    // State
    let currentSubjectKey = localStorage.getItem('curriculum_subject') || 'ai_engineer';
    let studyingSubjectKey = localStorage.getItem('curriculum_studying');
    let pendingSwitchCheckbox = null;
    let pendingQuizCheckbox = null;
    let currentQuizTask = null;
    
    // Ensure data exists
    if (!roadmapsData[currentSubjectKey]) {
        currentSubjectKey = Object.keys(roadmapsData)[0];
    }

    // Load saved preferences
    const savedHours = localStorage.getItem('curriculum_hours');
    const savedLevel = localStorage.getItem('curriculum_level');
    if (savedHours) hoursInput.value = savedHours;
    if (savedLevel) levelSelect.value = savedLevel;

    // Initialize
    if (typeof mermaid !== 'undefined') {
        mermaid.initialize({ startOnLoad: false, theme: 'default' });
    }
    renderSubjectDropdown();
    loadSubject(currentSubjectKey);

    // Event Listeners for Switch Modal
    subjectSelect.addEventListener('change', () => {
        const newKey = subjectSelect.value;
        if (currentSubjectKey !== newKey) {
            executeSwitch(newKey);
        }
    });

    modalStayBtn.addEventListener('click', () => {
        switchModal.classList.add('hidden');
        pendingSwitchCheckbox = null;
        if (studyingSubjectKey && roadmapsData[studyingSubjectKey]) {
            subjectSelect.value = studyingSubjectKey;
            executeSwitch(studyingSubjectKey);
        }
    });

    modalSwitchBtn.addEventListener('click', () => {
        switchModal.classList.add('hidden');
        if (pendingSwitchCheckbox) {
            studyingSubjectKey = currentSubjectKey;
            localStorage.setItem('curriculum_studying', currentSubjectKey);
            
            // Proceed to quiz instead of directly checking
            openQuiz(pendingSwitchCheckbox.id);
            pendingQuizCheckbox = pendingSwitchCheckbox;
            pendingSwitchCheckbox = null;
        }
    });

    // Event Listeners for Settings
    hoursInput.addEventListener('input', () => {
        localStorage.setItem('curriculum_hours', hoursInput.value);
        updateCalculations();
    });

    levelSelect.addEventListener('change', () => {
        localStorage.setItem('curriculum_level', levelSelect.value);
        renderTimeline(); 
    });

    resetBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all progress for this subject?')) {
            const subject = roadmapsData[currentSubjectKey];
            subject.phases.forEach(phase => {
                phase.tasks.forEach(task => {
                    localStorage.removeItem(`curriculum_chk_${currentSubjectKey}_${task.id}`);
                    localStorage.removeItem(`curriculum_feedback_${currentSubjectKey}_${task.id}`);
                });
            });
            renderTimeline();
        }
    });

    window.addEventListener('scroll', revealOnScroll);

    // Quiz Event Listeners
    quizCancelBtn.addEventListener('click', closeQuiz);
    
    quizSubmitBtn.addEventListener('click', async () => {
        const textareas = quizQuestionsContainer.querySelectorAll('textarea');
        const qAndA = [];
        let allAnswered = true;

        textareas.forEach((ta, idx) => {
            const val = ta.value.trim();
            if (!val) allAnswered = false;
            qAndA.push({
                question: topicQuestions[currentQuizTask.id][idx],
                answer: val
            });
        });

        if (!allAnswered) {
            alert('Please answer all questions before submitting.');
            return;
        }

        // Show loading state
        quizSubmitBtn.disabled = true;
        quizSubmitBtn.textContent = 'Grading...';

        try {
            const response = await fetch('http://localhost:3000/api/grade', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    topicTitle: currentQuizTask.label,
                    questionsAndAnswers: qAndA
                })
            });

            if (!response.ok) throw new Error('Network response was not ok');
            
            const result = await response.json();
            
            // Save feedback
            localStorage.setItem(`curriculum_feedback_${currentSubjectKey}_${currentQuizTask.id}`, JSON.stringify({
                passed: result.passed,
                feedback: result.feedback
            }));

            // Hide questions, show feedback
            quizQuestionsContainer.classList.add('hidden');
            quizFeedbackContainer.classList.remove('hidden');
            quizFeedbackContainer.className = 'quiz-feedback ' + (result.passed ? 'pass' : 'fail');
            quizResultTitle.textContent = result.passed ? 'Great Job!' : 'Needs Review';
            quizResultText.textContent = result.feedback;

            // Swap action buttons
            quizActionsDefault.classList.add('hidden');
            if (result.passed) {
                quizActionsPass.classList.remove('hidden');
            } else {
                quizActionsFail.classList.remove('hidden');
            }

        } catch (error) {
            console.error('Error grading:', error);
            alert('There was an error grading your test. Please ensure the backend server is running (node server.js).');
            quizSubmitBtn.disabled = false;
            quizSubmitBtn.textContent = 'Submit Answers';
        }
    });

    quizCloseBtn.addEventListener('click', () => {
        finalizeTaskCompletion();
    });

    quizProceedBtn.addEventListener('click', () => {
        finalizeTaskCompletion();
    });

    quizRestudyBtn.addEventListener('click', () => {
        closeQuiz(); // Box stays unchecked
    });

    verdictCloseBtn.addEventListener('click', () => {
        verdictModal.classList.add('hidden');
    });

    notesCloseBtn.addEventListener('click', () => {
        notesModal.classList.add('hidden');
        notesContainer.innerHTML = '';
    });

    // Close notes when clicking on the dark background overlay
    notesModal.addEventListener('click', (e) => {
        if (e.target === notesModal) {
            notesModal.classList.add('hidden');
            notesContainer.innerHTML = '';
        }
    });

    function finalizeTaskCompletion() {
        if (pendingQuizCheckbox) {
            pendingQuizCheckbox.checked = true;
            processCheckboxChange(pendingQuizCheckbox);
            pendingQuizCheckbox = null;
        }
        closeQuiz();
        checkSubjectCompletion();
    }

    function closeQuiz() {
        quizModal.classList.add('hidden');
        pendingQuizCheckbox = null;
        currentQuizTask = null;
        quizSubmitBtn.disabled = false;
        quizSubmitBtn.textContent = 'Submit Answers';
    }

    function executeSwitch(newKey) {
        currentSubjectKey = newKey;
        localStorage.setItem('curriculum_subject', newKey);
        loadSubject(newKey);
    }

    function renderSubjectDropdown() {
        subjectSelect.innerHTML = '';
        Object.keys(roadmapsData).forEach(key => {
            const subject = roadmapsData[key];
            const option = document.createElement('option');
            option.value = key;
            option.textContent = subject.title;
            if (key === currentSubjectKey) {
                option.selected = true;
            }
            subjectSelect.appendChild(option);
        });
    }

    function loadSubject(key) {
        const subject = roadmapsData[key];
        heroTitle.textContent = `Your ${subject.title} Learning Ground`;
        heroDesc.textContent = subject.description;
        renderTimeline();
    }

    function renderTimeline() {
        const subject = roadmapsData[currentSubjectKey];
        const userLevel = levelSelect.value;
        
        roadmapTimeline.innerHTML = '';
        
        subject.phases.forEach(phase => {
            let isHidden = false;
            if (userLevel === 'intermediate' && phase.level === 'beginner') isHidden = true;
            if (userLevel === 'advanced' && (phase.level === 'beginner' || phase.level === 'intermediate')) isHidden = true;
            
            const itemDiv = document.createElement('div');
            itemDiv.className = `timeline-item reveal ${isHidden ? 'hidden' : ''}`;
            itemDiv.setAttribute('data-hours', phase.hours);
            
            let tasksHtml = '';
            phase.tasks.forEach(task => {
                const isChecked = localStorage.getItem(`curriculum_chk_${currentSubjectKey}_${task.id}`) === 'true';
                
                let linksHtml = '';
                if (task.internalDoc) {
                    linksHtml += `<a href="#" class="doc-link" data-doc="${task.internalDoc}"><i class="fas fa-book-open"></i> Read Notes</a>`;
                } else if (task.mainLink) {
                    linksHtml += `<a href="${task.mainLink.url}" target="_blank">${task.mainLink.text}</a>`;
                }
                if (task.videoLink) {
                    linksHtml += `<a href="${task.videoLink.url}" target="_blank" class="video-link" title="Watch Overview"><i class="fa-brands fa-youtube"></i> ${task.videoLink.text}</a>`;
                }
                
                tasksHtml += `
                    <li>
                        <label class="task-container ${isChecked ? 'completed' : ''}">
                            <input type="checkbox" id="${task.id}" class="task-chk" ${isChecked ? 'checked' : ''}>
                            <span class="checkmark"></span>
                            <span class="task-text">
                                <strong>${task.label}:</strong> ${linksHtml}
                            </span>
                        </label>
                    </li>
                `;
            });
            
            itemDiv.innerHTML = `
                <div class="timeline-icon">${phase.id}</div>
                <div class="timeline-content content-card">
                    <div class="phase-header">
                        <h2>${phase.title}</h2>
                        <span class="time-estimate"><i class="fa-regular fa-calendar"></i> <span class="calc-time">...</span></span>
                    </div>
                    <p class="phase-desc">${phase.desc}</p>
                    <ul class="skills-list">
                        ${tasksHtml}
                    </ul>
                </div>
            `;
            roadmapTimeline.appendChild(itemDiv);
        });
        
        setupCheckboxes();
        setupDocLinks();
        updateCalculations();
        setTimeout(revealOnScroll, 100);
    }

    function findTaskById(id) {
        const subject = roadmapsData[currentSubjectKey];
        for (let phase of subject.phases) {
            for (let task of phase.tasks) {
                if (task.id === id) return task;
            }
        }
        return null;
    }

    function setupDocLinks() {
        const docLinks = document.querySelectorAll('.doc-link');
        docLinks.forEach(link => {
            link.addEventListener('click', async (e) => {
                e.preventDefault();
                const docFile = link.getAttribute('data-doc');
                if (!docFile) return;
                
                try {
                    const response = await fetch(docFile);
                    if (!response.ok) throw new Error("Could not fetch document");
                    const markdown = await response.text();
                    
                    // Convert markdown to HTML using marked
                    let html = marked.parse(markdown);
                    
                    // Format mermaid blocks correctly so mermaid can pick them up
                    // marked parses ```mermaid as <pre><code class="language-mermaid">
                    html = html.replace(/<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g, '<div class="mermaid">$1</div>');
                    
                    notesContainer.innerHTML = html;
                    notesModal.classList.remove('hidden');
                    
                    if (typeof mermaid !== 'undefined') {
                        try {
                            await mermaid.run({ querySelector: '.mermaid' });
                        } catch (mermaidError) {
                            console.error("Mermaid parsing error:", mermaidError);
                        }
                    }
                } catch (error) {
                    console.error("Error loading document:", error);
                    alert("Failed to load notes document. Error: " + error.message + "\nPlease make sure you are accessing the site via http://localhost:3000 and NOT file://");
                }
            });
        });
    }

    function setupCheckboxes() {
        const checkboxes = document.querySelectorAll('.task-chk');
        checkboxes.forEach(chk => {
            chk.addEventListener('click', (e) => {
                if (e.target.checked) {
                    e.preventDefault(); // Stop it from checking immediately
                    
                    if (studyingSubjectKey && studyingSubjectKey !== currentSubjectKey) {
                        if (!isSubjectComplete(studyingSubjectKey)) {
                            pendingSwitchCheckbox = e.target;
                            currentSubjectNameSpan.textContent = roadmapsData[studyingSubjectKey].title;
                            newSubjectNameSpan.textContent = roadmapsData[currentSubjectKey].title;
                            switchModal.classList.remove('hidden');
                            return;
                        }
                    }
                    
                    studyingSubjectKey = currentSubjectKey;
                    localStorage.setItem('curriculum_studying', currentSubjectKey);
                    
                    // Open Quiz
                    pendingQuizCheckbox = e.target;
                    openQuiz(e.target.id);
                } else {
                    processCheckboxChange(e.target);
                }
            });
        });
    }

    function openQuiz(taskId) {
        currentQuizTask = findTaskById(taskId);
        if (!currentQuizTask || !topicQuestions[taskId]) {
            // Fallback if no questions
            pendingQuizCheckbox.checked = true;
            processCheckboxChange(pendingQuizCheckbox);
            pendingQuizCheckbox = null;
            checkSubjectCompletion();
            return;
        }

        quizTitle.textContent = `${currentQuizTask.label} Assessment`;
        quizQuestionsContainer.innerHTML = '';
        
        topicQuestions[taskId].forEach((q, idx) => {
            const block = document.createElement('div');
            block.className = 'quiz-question-block';
            block.innerHTML = `
                <p>${idx + 1}. ${q}</p>
                <textarea placeholder="Type your answer here..."></textarea>
            `;
            quizQuestionsContainer.appendChild(block);
        });

        // Reset UI states
        quizQuestionsContainer.classList.remove('hidden');
        quizFeedbackContainer.classList.add('hidden');
        quizActionsDefault.classList.remove('hidden');
        quizActionsFail.classList.add('hidden');
        quizActionsPass.classList.add('hidden');
        
        quizModal.classList.remove('hidden');
    }

    function processCheckboxChange(chkElement) {
        localStorage.setItem(`curriculum_chk_${currentSubjectKey}_${chkElement.id}`, chkElement.checked);
        const container = chkElement.closest('.task-container');
        if (chkElement.checked) {
            container.classList.add('completed');
        } else {
            container.classList.remove('completed');
            if (studyingSubjectKey === currentSubjectKey && !hasAnyProgress(currentSubjectKey)) {
                studyingSubjectKey = null;
                localStorage.removeItem('curriculum_studying');
            }
        }
        updateProgress();
    }

    async function checkSubjectCompletion() {
        if (isSubjectComplete(currentSubjectKey)) {
            // Fetch all feedback history
            const subject = roadmapsData[currentSubjectKey];
            const history = [];
            
            subject.phases.forEach(phase => {
                phase.tasks.forEach(task => {
                    const fb = localStorage.getItem(`curriculum_feedback_${currentSubjectKey}_${task.id}`);
                    if (fb) {
                        const parsed = JSON.parse(fb);
                        history.push({
                            topicTitle: task.label,
                            passed: parsed.passed,
                            feedback: parsed.feedback
                        });
                    }
                });
            });

            if (history.length === 0) return;

            verdictModal.classList.remove('hidden');
            verdictLoading.classList.remove('hidden');
            verdictTitle.classList.add('hidden');
            verdictText.classList.add('hidden');
            verdictCloseBtn.classList.add('hidden');

            try {
                const response = await fetch('http://localhost:3000/api/verdict', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        subjectTitle: subject.title,
                        performanceHistory: history
                    })
                });

                if (!response.ok) throw new Error('Network error');
                const result = await response.json();

                verdictLoading.classList.add('hidden');
                verdictTitle.classList.remove('hidden');
                verdictText.classList.remove('hidden');
                verdictCloseBtn.classList.remove('hidden');
                
                verdictTitle.textContent = result.verdictTitle;
                verdictText.textContent = result.verdictMessage;

            } catch (error) {
                console.error(error);
                verdictLoading.classList.add('hidden');
                verdictTitle.classList.remove('hidden');
                verdictTitle.textContent = "Great Job!";
                verdictText.classList.remove('hidden');
                verdictText.textContent = "You've completed this roadmap. (Could not connect to AI for final verdict).";
                verdictCloseBtn.classList.remove('hidden');
            }
        }
    }

    function hasAnyProgress(key) {
        if (!key || !roadmapsData[key]) return false;
        let hasProgress = false;
        roadmapsData[key].phases.forEach(phase => {
            phase.tasks.forEach(task => {
                if (localStorage.getItem(`curriculum_chk_${key}_${task.id}`) === 'true') {
                    hasProgress = true;
                }
            });
        });
        return hasProgress;
    }

    function isSubjectComplete(key) {
        if (!key || !roadmapsData[key]) return false;
        let complete = true;
        roadmapsData[key].phases.forEach(phase => {
            // Check visibility first
            const phaseLevel = phase.level;
            const userLevel = levelSelect.value;
            let isHidden = false;
            if (userLevel === 'intermediate' && phaseLevel === 'beginner') isHidden = true;
            if (userLevel === 'advanced' && (phaseLevel === 'beginner' || phaseLevel === 'intermediate')) isHidden = true;

            if (!isHidden) {
                phase.tasks.forEach(task => {
                    if (localStorage.getItem(`curriculum_chk_${key}_${task.id}`) !== 'true') {
                        complete = false;
                    }
                });
            }
        });
        return complete;
    }

    function updateCalculations() {
        const hoursPerDay = parseFloat(hoursInput.value) || 2;
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        let totalHours = 0;
        timelineItems.forEach(item => {
            if (!item.classList.contains('hidden')) {
                const hours = parseInt(item.getAttribute('data-hours'));
                totalHours += hours;
                const days = hours / hoursPerDay;
                const timeSpan = item.querySelector('.calc-time');
                if (timeSpan) timeSpan.textContent = formatTime(days);
            }
        });

        const totalDays = totalHours / hoursPerDay;
        totalTimeBadge.innerHTML = `<i class="fa-regular fa-clock"></i> Total Time: ${formatTime(totalDays)}`;
        updateProgress();
    }

    function updateProgress() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        let total = 0;
        let completed = 0;
        
        timelineItems.forEach(item => {
            if(!item.classList.contains('hidden')) {
                const chks = item.querySelectorAll('.task-chk');
                chks.forEach(chk => {
                    total++;
                    if(chk.checked) completed++;
                });
            }
        });

        const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
        if (progressBar && progressText) {
            progressBar.style.width = `${percentage}%`;
            progressText.textContent = `${percentage}% Completed`;
        }
    }

    function formatTime(days) {
        if (days < 1) return '< 1 Day';
        if (days < 7) return `~${Math.round(days)} Days`;
        if (days < 30) {
            const weeks = Math.round(days / 7);
            return `~${weeks} ${weeks === 1 ? 'Week' : 'Weeks'}`;
        }
        const months = Math.round(days / 30);
        return `~${months} ${months === 1 ? 'Month' : 'Months'}`;
    }

    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;
        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            if (revealTop < windowHeight - 50) {
                reveal.classList.add('active');
            }
        });
    }
});
