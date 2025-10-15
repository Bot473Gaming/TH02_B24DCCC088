import React, { useState, useEffect } from "react";
import axios from "axios";

interface Article {
    id: number;
    title: string;
    url: string;
    image_url: string;
    summary: string;
    published_at: string;
}

const NewsApp: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                setLoading(true);
                const response = await axios.get<{ results: Article[] }>(
                    "https://api.spaceflightnewsapi.net/v4/articles?limit=10",
                );
                setArticles(response.data.results);
                setLoading(false);
            } catch (err) {
                setError("Could not fetch news articles.");
            }
        };
        fetchArticles();
    }, []);

    return (
        <div>
            <h2>Tin tức</h2>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div>
                {articles.map((article) => (
                    <div
                        key={article.id}
                        style={{
                            border: "1px solid #ccc",
                            margin: "10px",
                            padding: "14px",
                            borderRadius: "16px",
                        }}
                    >
                        <h3 style={{ marginBottom: "1rem" }}>
                            {article.title}
                        </h3>
                        <img
                            src={article.image_url}
                            alt={article.title}
                            style={{
                                maxWidth: "30%",
                                height: "auto",
                                borderRadius: "16px",
                                marginBottom: "1rem",
                            }}
                        />
                        <p>{article.summary}</p>
                        <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Đọc thêm
                        </a>
                        <br />
                        <small>
                            Ngày đăng:{" "}
                            {new Date(
                                article.published_at,
                            ).toLocaleDateString()}
                        </small>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsApp;
