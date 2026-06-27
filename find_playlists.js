import fs from 'fs';

const queries = [
    { id: "ai_python", query: "Corey Schafer Python playlist" },
    { id: "ai_math", query: "3Blue1Brown linear algebra calculus playlist" },
    { id: "ai_stats", query: "StatQuest statistics playlist" },
    { id: "ai_ml", query: "Andrew Ng machine learning playlist" },
    { id: "ai_dl", query: "deep learning playlist" },
    { id: "ai_nlp", query: "hugging face nlp course playlist" },
    { id: "ai_llm", query: "Andrej Karpathy neural networks zero to hero playlist" },
    { id: "ai_agents", query: "langchain agents playlist" },
    { id: "ai_mlops", query: "mlops playlist" },
    { id: "fs_python", query: "Corey Schafer Python playlist" },
    { id: "fs_htmlcss", query: "Traversy Media html css playlist" },
    { id: "fs_django", query: "Tech With Tim Django playlist" },
    { id: "fs_db", query: "SQL full course playlist" },
    { id: "fs_deploy", query: "Corey Schafer django deploy playlist" },
    { id: "sql_concepts", query: "database design basics playlist" },
    { id: "sql_queries", query: "sql joins queries playlist" },
    { id: "sql_advanced", query: "advanced sql window functions playlist" },
    { id: "sql_design", query: "database normalization playlist" },
    { id: "da_excel", query: "Kevin Stratvert excel playlist" },
    { id: "da_sql", query: "Alex The Analyst sql playlist" },
    { id: "da_python", query: "Keith Galli pandas playlist" },
    { id: "da_viz", query: "Alex The Analyst tableau playlist" },
    { id: "pe_basics", query: "prompt engineering basics playlist" },
    { id: "pe_advanced", query: "advanced prompt engineering playlist" },
    { id: "pe_agents", query: "langchain crash course playlist" }
];

async function fetchPlaylist(query) {
    try {
        const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}&sp=EgIQAw%253D%253D`;
        const response = await fetch(url);
        const html = await response.text();
        const match = html.match(/"playlistId":"(PL[^"]+)"/);
        if (match) {
            return `https://www.youtube.com/playlist?list=${match[1]}`;
        }
    } catch (e) {
        console.error("Error fetching", query, e);
    }
    return null;
}

async function run() {
    let results = {};
    for (const q of queries) {
        console.log("Searching for:", q.query);
        const link = await fetchPlaylist(q.query);
        if (link) {
            results[q.id] = link;
            console.log("Found:", link);
        } else {
            console.log("Not found for:", q.query);
        }
        // sleep a bit to prevent rate limiting
        await new Promise(r => setTimeout(r, 500));
    }
    fs.writeFileSync('playlists.json', JSON.stringify(results, null, 2));
    console.log("Done");
}

run();
