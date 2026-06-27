const topicQuestions = {
    "ai_python": [
        "What is the difference between a list comprehension and a generator expression, and in what exact scenario would using a list comprehension cause your Python script to crash?",
        "Explain the Global Interpreter Lock (GIL). Why does it prevent true parallel execution in CPU-bound multi-threading, and how does the `multiprocessing` library bypass it?",
        "How do Python decorators work under the hood? Write the conceptual structure of a decorator that times how long a function takes to execute.",
        "What is the difference between `__repr__` and `__str__` in a Python class, and which one is intended for developers versus end-users?",
        "When passing a mutable default argument (like an empty list) to a function, what unexpected bug occurs on subsequent calls, and how do you fix it?"
    ],
    "ai_math": [
        "What is the geometric interpretation of the determinant of a matrix, and what does it physically mean if a matrix has a determinant of exactly zero?",
        "In backpropagation, why is the Jacobian matrix necessary for calculating the gradient of a vector-valued function?",
        "What are eigenvalues and eigenvectors? Give an example of how they are used in Principal Component Analysis (PCA) to reduce dimensionality.",
        "Explain the chain rule in calculus. How does it allow us to update the weights of the very first layer in a deep neural network based on the final loss function?",
        "What is the difference between L1 and L2 norms (distances), and why does L1 regularization tend to produce sparse weight matrices compared to L2?"
    ],
    "ai_stats": [
        "Explain the practical trade-off between a Type I (False Positive) and Type II (False Negative) error. If you are predicting a highly contagious disease, which error must you minimize?",
        "What is the Central Limit Theorem, and why does it allow us to use normal distribution statistics even when the underlying population distribution is completely skewed?",
        "What is the p-value? Explain why a p-value of 0.04 does not mean there is a 4% chance the null hypothesis is true.",
        "Describe Bayes' Theorem. How does the prior probability affect the posterior probability if your test for a rare disease is 99% accurate?",
        "What is the difference between covariance and correlation? Why is correlation generally preferred when comparing the relationship between two entirely different variables?"
    ],
    "ai_data": [
        "When merging two DataFrames, what is the exact difference between a 'left' join and an 'inner' join?",
        "What is the purpose of the `.groupby()` method, and how do you apply two completely different aggregation functions to two different columns simultaneously?",
        "Explain the difference between `.loc[]` and `.iloc[]`. If you drop a row from the middle of a DataFrame, how does this affect indexing with both methods?",
        "What does the `inplace=True` argument do in Pandas methods, and why is the Pandas development team discouraging its use?",
        "How does Pandas handle missing data (`NaN`) during mathematical operations like `.sum()`? How can you explicitly change this behavior?"
    ],
    "ai_ml": [
        "In a Random Forest model, what two specific techniques are used to ensure the individual decision trees are uncorrelated?",
        "Explain the bias-variance tradeoff. If your model performs perfectly on training data but terribly on test data, does it have high bias or high variance?",
        "How does the Support Vector Machine (SVM) 'kernel trick' work, and how does it allow a linear classifier to solve non-linear problems?",
        "What is the mathematical difference between K-Means clustering and K-Nearest Neighbors (KNN)? Why is one supervised and the other unsupervised?",
        "In Logistic Regression, why do we use the Log-Loss (Cross-Entropy) cost function instead of the Mean Squared Error (MSE) used in Linear Regression?"
    ],
    "ai_dl": [
        "What specific mathematical problem does the ReLU activation function solve compared to the Sigmoid function, and what new problem does it introduce?",
        "Explain the purpose of Dropout during training. Why must Dropout be disabled during the inference phase?",
        "How does Batch Normalization prevent internal covariate shift, and why does it typically allow researchers to use significantly higher learning rates?",
        "In Convolutional Neural Networks (CNNs), what is the difference between 'valid' padding and 'same' padding?",
        "Explain the exploding gradient problem in deep networks. What is gradient clipping, and how does it act as a countermeasure?"
    ],
    "ai_nlp": [
        "In the Transformer architecture, what is the mathematical purpose of scaling the dot product of the Query and Key matrices by the square root of the dimension?",
        "How does positional encoding work in Transformers, and why is it absolutely necessary given that Attention mechanisms are inherently permutation-invariant?",
        "Explain the difference between Tokenization using BPE (Byte Pair Encoding) versus simple word-level splitting.",
        "What is the difference between Encoder-only models (like BERT) and Decoder-only models (like GPT) in terms of the attention mask they apply during training?",
        "In Word2Vec, what is the difference between the Continuous Bag of Words (CBOW) and Skip-Gram architectures?"
    ],
    "ai_llm": [
        "During the autoregressive decoding phase of a GPT model, why is a KV-cache used, and what specific matrix re-computation does it prevent?",
        "What is Reinforcement Learning from Human Feedback (RLHF)? Describe the role of the 'Reward Model'.",
        "What is Low-Rank Adaptation (LoRA), and how does it mathematically allow you to fine-tune a massive 70B parameter model on a single consumer GPU?",
        "Explain how Rotary Positional Embeddings (RoPE) differ from absolute sinusoidal embeddings.",
        "In a scaled causal language model, what is the exact layout of the input tensor and target tensor when computing the Cross-Entropy loss over a sequence of tokens?"
    ],
    "ai_agents": [
        "In the ReAct (Reason+Act) framework, how does interleaving 'reasoning traces' with 'action observations' prevent the LLM from hallucinating endless loops?",
        "What is the difference between an LLM simply generating JSON and an LLM using 'Function Calling' (Tool Use) natively supported by an API?",
        "Explain the concept of semantic memory in agents. How does a Vector Database allow an agent to retrieve relevant historical context over long conversations?",
        "When an agent fails to execute a tool, how should the system prompt/framework handle the error to allow the agent to self-correct?",
        "What is Multi-Agent Collaboration, and how does having an 'Actor' agent and a separate 'Critic' agent improve overall accuracy?"
    ],
    "ai_mlops": [
        "What is 'concept drift' in a production model, and what specific statistical metrics would you monitor to detect it?",
        "Explain the purpose of a Model Registry (like MLflow) compared to just saving `.pt` or `.pkl` files in an S3 bucket.",
        "What is the difference between Data Parallelism and Tensor Parallelism when training massive models across multiple GPUs?",
        "When serving an ML model via a REST API, what is 'batching' at the inference level, and how does it maximize GPU utilization?",
        "Explain A/B testing in the context of deploying a new machine learning model. How do you mathematically determine if the new model is actually performing better?"
    ],
    "fs_python": [
        "Explain the difference between a synchronous function and an asynchronous function in Python (`async def`).",
        "What are Python virtual environments (`venv`), and what specific 'dependency hell' problem do they solve?",
        "How do you securely manage sensitive API keys in a Python project without hardcoding them into the source code?",
        "What is the difference between a tuple and a list, and why might you use a tuple to return multiple values from a function?",
        "Explain how dictionary comprehension works. Write the syntax to invert a dictionary in one line of code."
    ],
    "fs_htmlcss": [
        "Explain the relationship between `position: absolute;` and `position: relative;`.",
        "What is the CSS Box Model? How does the `box-sizing: border-box;` property fundamentally change how width and height are calculated?",
        "Explain the difference between Flexbox and CSS Grid. When would you strictly choose Grid over Flexbox?",
        "What are media queries, and how do you write a mobile-first media query that changes a layout to two columns only on screens wider than 768px?",
        "What is Semantic HTML, and why is using `<article>` and `<nav>` better than using `<div>` for everything regarding SEO and accessibility?"
    ],
    "fs_js": [
        "What is the JavaScript 'Event Loop', and how does it manage the execution of asynchronous API requests?",
        "Explain the difference between `var`, `let`, and `const` in terms of variable hoisting and block scoping.",
        "What is a Promise in JavaScript? How does the `async/await` syntax improve the readability of Promise-based code?",
        "What is event bubbling (propagation) in the DOM, and how do you stop a click event on a child button from triggering a click event on its parent container?",
        "Explain closures in JavaScript. How can a closure be used to create private variables?"
    ],
    "fs_django": [
        "In Django's ORM, what is the exact difference between `select_related()` and `prefetch_related()`?",
        "Explain the Django Request-Response cycle. What exactly happens from the moment a user hits a URL to the moment the View returns a Template?",
        "What is CSRF (Cross-Site Request Forgery), and how does Django's `{% csrf_token %}` tag mathematically protect forms against it?",
        "How do Django Migrations work under the hood? What happens if you manually alter a database table outside of Django?",
        "What is the difference between a Function-Based View (FBV) and a Class-Based View (CBV) in Django?"
    ],
    "fs_db": [
        "What is a database index (B-Tree), and why might blindly adding an index to every single column in your database actually decrease `INSERT` performance?",
        "Explain the difference between a `VARCHAR` and a `TEXT` data type in PostgreSQL. When would you use one over the other?",
        "How do you write an ORM query in Django to filter all `Post` objects where the author's username starts with 'admin'?",
        "What is a Database Transaction? Explain the concept of Atomicity and how you use `transaction.atomic()` in Django.",
        "In a relational database, what is a composite unique constraint, and how do you enforce it via the `unique_together` meta class in a Django model?"
    ],
    "fs_deploy": [
        "What is the architectural purpose of a WSGI server (like Gunicorn) when deploying a Django application behind a reverse proxy web server like Nginx?",
        "Why is serving static files (CSS/JS/Images) directly through Django/Gunicorn considered bad practice in production, and how does WhiteNoise solve this?",
        "Explain the purpose of Docker. How does a Dockerfile solve the 'it works on my machine' problem?",
        "What is Continuous Integration / Continuous Deployment (CI/CD), and what steps would a GitHub Action pipeline perform before deploying your code?",
        "How do you properly handle database migrations during a production deployment with zero downtime?"
    ],
    "sql_concepts": [
        "What is the functional difference between a Primary Key and a Foreign Key, and how do they work together to enforce 'referential integrity'?",
        "Explain the difference between DDL (Data Definition Language) and DML (Data Manipulation Language).",
        "What is an Entity-Relationship (ER) diagram? How do you visually represent a one-to-many relationship?",
        "What happens when a Foreign Key constraint is set to `ON DELETE CASCADE`, and why can this be incredibly dangerous in a production environment?",
        "Explain what a surrogate key is compared to a natural key."
    ],
    "sql_queries": [
        "If Table A has 5 rows and Table B has 10 rows, exactly how many rows will be returned if you perform a `CROSS JOIN` between them?",
        "What is the execution order of a SQL query? Why can't you use an alias created in the `SELECT` clause within the `WHERE` clause?",
        "Explain the difference between `UNION` and `UNION ALL`. Which one is faster to execute and why?",
        "What is the difference between the `WHERE` clause and the `HAVING` clause?",
        "How do you perform a self-join to find employees who earn more than their direct managers?"
    ],
    "sql_advanced": [
        "Explain the difference between the `RANK()` and `DENSE_RANK()` window functions.",
        "What is a Common Table Expression (CTE), and how does using the `WITH` clause improve the readability of complex nested subqueries?",
        "How does the `PARTITION BY` clause in a window function differ from a standard `GROUP BY` clause?",
        "Explain how a recursive CTE works.",
        "What is a materialized view, and how does it differ from a standard view in terms of storage and query execution speed?"
    ],
    "sql_design": [
        "What is Third Normal Form (3NF), and what specific type of data anomaly does it aim to eliminate compared to 2NF?",
        "Explain the concept of denormalization. In what specific scenario would you intentionally break normalization rules?",
        "What is a polymorphic association, and why is it generally considered an anti-pattern in strict relational database design?",
        "Explain the difference between a Star Schema and a Snowflake Schema in data warehousing.",
        "How do you handle Many-to-Many relationships in a relational database? What is the structure of the required junction table?"
    ],
    "da_excel": [
        "What is the functional difference between `VLOOKUP` and `INDEX(MATCH())`, and why is the latter more structurally robust?",
        "How do Pivot Tables aggregate data, and how would you use a Calculated Field inside a Pivot Table?",
        "Explain the difference between absolute references (`$A$1`) and relative references (`A1`).",
        "What is Power Query, and why is it superior to copying and pasting data manually when cleaning a dataset?",
        "How do you use the `IFERROR` function to gracefully handle `#N/A` errors generated by a failed `VLOOKUP`?"
    ],
    "da_sql": [
        "How would you write a CTE combined with a Window Function to find the top 3 highest-earning employees partitioned by *each* department?",
        "Explain the `COALESCE` function. How do you use it to replace `NULL` values in a sales column?",
        "What is the purpose of the `CASE WHEN` statement? Write the structure of a query that categorizes users into 'Youth', 'Adult', and 'Senior'.",
        "When performing cohort analysis, how do you use the `EXTRACT(MONTH FROM date)` function to group users by their signup month?",
        "How do you calculate a rolling 7-day average using the `AVG()` window function?"
    ],
    "da_python": [
        "When using `groupby()` followed by `agg()`, how do you pass a dictionary to apply completely different aggregation functions to different columns simultaneously?",
        "Explain how to handle outliers in a Pandas DataFrame.",
        "What is the `pd.melt()` function used for, and how does it transform a 'wide' dataset into a 'long' format?",
        "How do you efficiently merge two datasets on a specific column using `pd.merge()` without duplicating overlapping column names?",
        "Explain the purpose of the `apply()` method. Why is vectorization exponentially faster than using `apply()`?"
    ],
    "da_viz": [
        "In Tableau or PowerBI, what is the fundamental difference between a 'Dimension' and a 'Measure'?",
        "Explain the 'Data-to-Ink Ratio' principle formulated by Edward Tufte.",
        "Why are pie charts generally discouraged by data analysts for datasets with more than three categories, and what is the preferred alternative?",
        "What is the difference between a Discrete and Continuous date field in Tableau?",
        "In Power BI, what is DAX (Data Analysis Expressions)? How does the `CALCULATE` function modify the filter context of a visualization?"
    ],
    "pe_basics": [
        "Why is it important to assign a specific 'persona' or 'role' in a system prompt?",
        "What is the 'Lost in the Middle' phenomenon in Large Language Models, and how does it affect long prompts?",
        "Explain the difference between Temperature and Top-P (Nucleus Sampling).",
        "What are specific structural delimiters (like `\"\"\"` or `<xml>`), and why do they drastically reduce the likelihood of prompt injection attacks?",
        "How does explicit constraint setting improve output reliability compared to vague instructions?"
    ],
    "pe_advanced": [
        "In Few-Shot Prompting, why is it critical that the examples provided in the prompt perfectly match the exact JSON or markdown output format you expect from the model?",
        "How does the 'Chain-of-Thought' (CoT) technique force a model to improve its accuracy on complex math or logic problems?",
        "Explain the 'Tree of Thoughts' prompting method.",
        "What is 'Self-Consistency' decoding, and how does taking the majority vote from multiple Chain-of-Thought generations improve the final mathematical answer?",
        "Describe 'Directional Stimulus Prompting'. How do you use hints or keywords to guide an LLM toward a specific nuance in a summarization task?"
    ],
    "pe_agents": [
        "In a Retrieval-Augmented Generation (RAG) system, what is the purpose of text chunking?",
        "How do Vector Databases use Cosine Similarity to find relevant documents, and why is this vastly superior to standard keyword search?",
        "What is the 'ReAct' framework, and how does the format `Thought: -> Action: -> Observation:` allow an LLM to reliably use external APIs?",
        "Explain the concept of 'Tool Definition' in OpenAI's API. How do you describe a function's schema so the LLM knows exactly what JSON arguments to output?",
        "In advanced RAG, what is 'Query Transformation' (or Query Expansion), and how does rewriting the user's initial prompt improve retrieval accuracy from the Vector DB?"
    ]
};
