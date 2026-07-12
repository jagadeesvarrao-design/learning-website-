const roadmapsData = {
    "ai_engineer": {
        title: "AI Engineering",
        icon: "fa-robot",
        description: "A definitive path to mastering Machine Learning, Deep Learning, and AI systems.",
        phases: [
            {
                id: 1,
                level: "beginner",
                hours: 80,
                title: "Foundations",
                desc: "The essential building blocks of code and mathematics.",
                tasks: [
                    {
                        id: "ai_python",
                        label: "Python",
                        internalDoc: "python_notes.md",
                        videoLink: { text: "Python Playlist", url: "https://www.youtube.com/playlist?list=PL-osiE80TeTt2d9bfVyTiXJA-UTHn6WwU" }
                    },
                    {
                        id: "ai_math",
                        label: "Linear Algebra & Calculus",
                        internalDoc: "doc_ai_math.md",
                        videoLink: { text: "Math for ML Playlist", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab" }
                    },
                    {
                        id: "ai_stats",
                        label: "Statistics",
                        internalDoc: "doc_ai_stats.md",
                        videoLink: { text: "Statistics Playlist", url: "https://www.youtube.com/playlist?list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9" }
                    }
                ]
            },
            {
                id: 2,
                level: "beginner",
                hours: 60,
                title: "Data & Classical ML",
                desc: "Train your first predictive models using structured data.",
                tasks: [
                    {
                        id: "ai_data",
                        label: "Data Manipulation",
                        internalDoc: "doc_ai_data.md",
                        videoLink: { text: "Data Analysis Playlist", url: "https://www.youtube.com/results?search_query=pandas+data+analysis+playlist" }
                    },
                    {
                        id: "ai_ml",
                        label: "Machine Learning",
                        internalDoc: "doc_ai_ml.md",
                        videoLink: { text: "Machine Learning Playlist", url: "https://www.youtube.com/playlist?list=PLkDaE6sCZn6FNC6YRfRQc_FbeQrF8BwGI" }
                    }
                ]
            },
            {
                id: 3,
                level: "intermediate",
                hours: 80,
                title: "Deep Learning",
                desc: "A practical, top-down approach to modern neural networks.",
                tasks: [
                    {
                        id: "ai_dl",
                        label: "Deep Learning",
                        internalDoc: "doc_ai_dl.md",
                        videoLink: { text: "Deep Learning Playlist", url: "https://www.youtube.com/playlist?list=PLKnIA16_RmvYuZauWaPlRTC54KxSNLtNn" }
                    }
                ]
            },
            {
                id: 4,
                level: "intermediate",
                hours: 60,
                title: "NLP & Transformers",
                desc: "The underlying architecture powering modern language models.",
                tasks: [
                    {
                        id: "ai_nlp",
                        label: "NLP & Transformers",
                        internalDoc: "doc_ai_nlp.md",
                        videoLink: { text: "NLP Course Playlist", url: "https://www.youtube.com/playlist?list=PLo2EIpI_JMQvWfQndUesu0nPBAtZ9gP1o" }
                    }
                ]
            },
            {
                id: 5,
                level: "advanced",
                hours: 50,
                title: "Generative AI & LLMs",
                desc: "Understand the mechanics of Large Language Models.",
                tasks: [
                    {
                        id: "ai_llm",
                        label: "Build LLMs from Scratch",
                        internalDoc: "doc_ai_llm.md",
                        videoLink: { text: "Neural Networks Playlist", url: "https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ" }
                    }
                ]
            },
            {
                id: 6,
                level: "advanced",
                hours: 40,
                title: "Agentic AI",
                desc: "Systems that can reason, plan, and use tools.",
                tasks: [
                    {
                        id: "ai_agents",
                        label: "Building Agents",
                        internalDoc: "doc_ai_agents.md",
                        videoLink: { text: "AI Agents Playlist", url: "https://www.youtube.com/playlist?list=PL8n_RR1gqRmycHk4pYlQPYd2RoqE5fHCF" }
                    }
                ]
            },
            {
                id: 7,
                level: "advanced",
                hours: 40,
                title: "MLOps & Production",
                desc: "Deploy and maintain your models in the real world.",
                tasks: [
                    {
                        id: "ai_mlops",
                        label: "End-to-End MLOps",
                        internalDoc: "doc_ai_mlops.md",
                        videoLink: { text: "MLOps Playlist", url: "https://www.youtube.com/playlist?list=PLupK5DK91flV45dkPXyGViMLtHadRr6sp" }
                    }
                ]
            }
        ]
    },
    "python_fullstack": {
        title: "Python Full Stack",
        icon: "fa-laptop-code",
        description: "Build complete web applications from the database to the browser.",
        phases: [
            {
                id: 1,
                level: "beginner",
                hours: 60,
                title: "Python Fundamentals",
                desc: "Master the backend language.",
                tasks: [
                    {
                        id: "fs_python",
                        label: "Python Basics",
                        internalDoc: "python_notes.md",
                        videoLink: { text: "Python Full Course Playlist", url: "https://www.youtube.com/playlist?list=PL-osiE80TeTt2d9bfVyTiXJA-UTHn6WwU" }
                    }
                ]
            },
            {
                id: 2,
                level: "beginner",
                hours: 80,
                title: "Frontend Basics (HTML/CSS/JS)",
                desc: "Structure and style the user interface.",
                tasks: [
                    {
                        id: "fs_htmlcss",
                        label: "HTML & CSS",
                        internalDoc: "doc_fs_htmlcss.md",
                        videoLink: { text: "HTML & CSS Playlist", url: "https://www.youtube.com/results?search_query=html+css+full+course+playlist" }
                    },
                    {
                        id: "fs_js",
                        label: "JavaScript",
                        internalDoc: "doc_fs_js.md",
                        videoLink: { text: "JavaScript Playlist", url: "https://www.youtube.com/results?search_query=javascript+full+course+playlist" }
                    }
                ]
            },
            {
                id: 3,
                level: "intermediate",
                hours: 80,
                title: "Backend Framework (Django)",
                desc: "Serve data and handle business logic.",
                tasks: [
                    {
                        id: "fs_django",
                        label: "Django Framework",
                        internalDoc: "doc_fs_django.md",
                        videoLink: { text: "Django Playlist", url: "https://www.youtube.com/results?search_query=django+full+course+playlist" }
                    }
                ]
            },
            {
                id: 4,
                level: "intermediate",
                hours: 40,
                title: "Database Integration",
                desc: "Store and retrieve application data.",
                tasks: [
                    {
                        id: "fs_db",
                        label: "SQL & ORM",
                        internalDoc: "doc_fs_db.md",
                        videoLink: { text: "SQL Database Playlist", url: "https://www.youtube.com/results?search_query=sql+full+course+playlist" }
                    }
                ]
            },
            {
                id: 5,
                level: "advanced",
                hours: 40,
                title: "Deployment & Production",
                desc: "Put your application on the internet.",
                tasks: [
                    {
                        id: "fs_deploy",
                        label: "Deployment (Render/Heroku)",
                        internalDoc: "doc_fs_deploy.md",
                        videoLink: { text: "Deployment Playlist", url: "https://www.youtube.com/results?search_query=django+deployment+playlist" }
                    }
                ]
            }
        ]
    },
    "sql": {
        title: "SQL Mastery",
        icon: "fa-database",
        description: "Learn to query, manage, and design complex relational databases.",
        phases: [
            {
                id: 1,
                level: "beginner",
                hours: 40,
                title: "Relational DB Concepts",
                desc: "Understand tables, rows, and primary keys.",
                tasks: [
                    {
                        id: "sql_concepts",
                        label: "Database Basics",
                        internalDoc: "doc_sql_concepts.md",
                        videoLink: { text: "Database Basics Playlist", url: "https://www.youtube.com/results?search_query=database+design+basics+playlist" }
                    }
                ]
            },
            {
                id: 2,
                level: "beginner",
                hours: 50,
                title: "Basic Queries & Joins",
                desc: "Retrieve and combine data from multiple tables.",
                tasks: [
                    {
                        id: "sql_queries",
                        label: "Queries & Joins",
                        internalDoc: "doc_sql_queries.md",
                        videoLink: { text: "SQL Joins Playlist", url: "https://www.youtube.com/results?search_query=sql+joins+queries+playlist" }
                    }
                ]
            },
            {
                id: 3,
                level: "intermediate",
                hours: 60,
                title: "Advanced SQL",
                desc: "Window functions, CTEs, and aggregations.",
                tasks: [
                    {
                        id: "sql_advanced",
                        label: "Window Functions & CTEs",
                        internalDoc: "doc_sql_advanced.md",
                        videoLink: { text: "Advanced SQL Playlist", url: "https://www.youtube.com/results?search_query=advanced+sql+window+functions+playlist" }
                    }
                ]
            },
            {
                id: 4,
                level: "advanced",
                hours: 40,
                title: "Database Design",
                desc: "Normalization and structuring robust schemas.",
                tasks: [
                    {
                        id: "sql_design",
                        label: "DB Normalization",
                        internalDoc: "doc_sql_design.md",
                        videoLink: { text: "Database Normalization Playlist", url: "https://www.youtube.com/results?search_query=database+normalization+playlist" }
                    }
                ]
            }
        ]
    },
    "data_analytics": {
        title: "Data Analytics",
        icon: "fa-chart-pie",
        description: "Turn raw data into actionable business insights.",
        phases: [
            {
                id: 1,
                level: "beginner",
                hours: 40,
                title: "Spreadsheet Mastery",
                desc: "Excel/Google Sheets for basic analysis.",
                tasks: [
                    {
                        id: "da_excel",
                        label: "Advanced Excel",
                        internalDoc: "doc_da_excel.md",
                        videoLink: { text: "Advanced Excel Playlist", url: "https://www.youtube.com/results?search_query=advanced+excel+playlist" }
                    }
                ]
            },
            {
                id: 2,
                level: "beginner",
                hours: 60,
                title: "SQL for Analytics",
                desc: "Extracting data from corporate databases.",
                tasks: [
                    {
                        id: "da_sql",
                        label: "SQL Analysis",
                        internalDoc: "doc_da_sql.md",
                        videoLink: { text: "SQL for Analytics Playlist", url: "https://www.youtube.com/results?search_query=sql+for+data+analytics+playlist" }
                    }
                ]
            },
            {
                id: 3,
                level: "intermediate",
                hours: 60,
                title: "Python for Data",
                desc: "Using Pandas for complex manipulation.",
                tasks: [
                    {
                        id: "da_python",
                        label: "Pandas & Python",
                        internalDoc: "doc_da_python.md",
                        videoLink: { text: "Pandas Data Analysis Playlist", url: "https://www.youtube.com/results?search_query=python+pandas+data+analysis+playlist" }
                    }
                ]
            },
            {
                id: 4,
                level: "advanced",
                hours: 60,
                title: "Data Visualization",
                desc: "Building dashboards to tell stories.",
                tasks: [
                    {
                        id: "da_viz",
                        label: "Tableau / PowerBI",
                        internalDoc: "doc_da_viz.md",
                        videoLink: { text: "Tableau/PowerBI Playlist", url: "https://www.youtube.com/results?search_query=tableau+data+visualization+playlist" }
                    }
                ]
            }
        ]
    },
    "prompt_engineering": {
        title: "Prompt Engineering",
        icon: "fa-comment-dots",
        description: "Master the art of communicating with Large Language Models.",
        phases: [
            {
                id: 1,
                level: "beginner",
                hours: 30,
                title: "Basics of Prompting",
                desc: "Clear instructions, context, and system prompts.",
                tasks: [
                    {
                        id: "pe_basics",
                        label: "Prompt Fundamentals",
                        internalDoc: "doc_pe_basics.md",
                        videoLink: { text: "Prompt Engineering Basics Playlist", url: "https://www.youtube.com/results?search_query=prompt+engineering+basics+playlist" }
                    }
                ]
            },
            {
                id: 2,
                level: "intermediate",
                hours: 40,
                title: "Advanced Techniques",
                desc: "Few-Shot, Chain-of-Thought, and structured outputs.",
                tasks: [
                    {
                        id: "pe_advanced",
                        label: "Advanced Prompting",
                        internalDoc: "doc_pe_advanced.md",
                        videoLink: { text: "Advanced Prompting Playlist", url: "https://www.youtube.com/results?search_query=advanced+prompt+engineering+playlist" }
                    }
                ]
            },
            {
                id: 3,
                level: "advanced",
                hours: 50,
                title: "RAG & Agents",
                desc: "Giving LLMs memory and tools.",
                tasks: [
                    {
                        id: "pe_agents",
                        label: "RAG & AI Agents",
                        internalDoc: "doc_pe_agents.md",
                        videoLink: { text: "RAG & AI Agents Playlist", url: "https://www.youtube.com/results?search_query=rag+ai+agents+playlist" }
                    }
                ]
            }
        ]
    },
    "ssc_prep": {
        title: "SSC CGL / CHSL Prep",
        icon: "fa-building-columns",
        description: "The definitive roadmap for cracking SSC exams with deep notes on every section.",
        phases: [
            {
                id: 1,
                level: "beginner",
                hours: 100,
                title: "Tier 1 Preparation",
                desc: "Foundational aptitude and awareness for preliminary exams.",
                tasks: [
                    {
                        id: "ssc_quant",
                        label: "Quantitative Aptitude",
                        internalDoc: "doc_ssc_quant.md",
                        videoLink: { text: "SSC Quant Playlist", url: "https://www.youtube.com/results?search_query=ssc+quantitative+aptitude+playlist" }
                    },
                    {
                        id: "ssc_reasoning",
                        label: "General Intelligence & Reasoning",
                        internalDoc: "doc_ssc_reasoning.md",
                        videoLink: { text: "SSC Reasoning Playlist", url: "https://www.youtube.com/results?search_query=ssc+reasoning+playlist" }
                    }
                ]
            },
            {
                id: 2,
                level: "intermediate",
                hours: 80,
                title: "Language & GK",
                desc: "Mastering English comprehension and general awareness.",
                tasks: [
                    {
                        id: "ssc_english",
                        label: "English Language",
                        internalDoc: "doc_ssc_english.md",
                        videoLink: { text: "SSC English Playlist", url: "https://www.youtube.com/results?search_query=ssc+english+playlist" }
                    },
                    {
                        id: "ssc_ga",
                        label: "General Awareness",
                        internalDoc: "doc_ssc_ga.md",
                        videoLink: { text: "SSC General Awareness", url: "https://www.youtube.com/results?search_query=ssc+general+awareness+playlist" }
                    }
                ]
            }
        ]
    },
    "rrb_prep": {
        title: "RRB NTPC / Group D",
        icon: "fa-train",
        description: "Specialized syllabus tailored for the Railway Recruitment Board exams.",
        phases: [
            {
                id: 1,
                level: "beginner",
                hours: 90,
                title: "Mathematics & Reasoning",
                desc: "The core calculation subjects for railway exams.",
                tasks: [
                    {
                        id: "rrb_math",
                        label: "Mathematics (RRB)",
                        internalDoc: "doc_rrb_math.md",
                        videoLink: { text: "RRB Math Playlist", url: "https://www.youtube.com/results?search_query=rrb+ntpc+math+playlist" }
                    },
                    {
                        id: "rrb_reasoning",
                        label: "General Intelligence",
                        internalDoc: "doc_rrb_reasoning.md",
                        videoLink: { text: "RRB Reasoning Playlist", url: "https://www.youtube.com/results?search_query=rrb+ntpc+reasoning+playlist" }
                    }
                ]
            },
            {
                id: 2,
                level: "intermediate",
                hours: 70,
                title: "Science & Awareness",
                desc: "General science and current affairs specifically for RRB.",
                tasks: [
                    {
                        id: "rrb_science",
                        label: "General Science",
                        internalDoc: "doc_rrb_science.md",
                        videoLink: { text: "RRB General Science", url: "https://www.youtube.com/results?search_query=rrb+general+science+playlist" }
                    },
                    {
                        id: "rrb_ga",
                        label: "General Awareness (Railways)",
                        internalDoc: "doc_rrb_ga.md",
                        videoLink: { text: "RRB General Awareness", url: "https://www.youtube.com/results?search_query=rrb+general+awareness+playlist" }
                    }
                ]
            }
        ]
    }
};
