"use client";

import { useEffect } from "react";
import { useNewsStore } from "@/store/newsStore";
import NewsCard from "./NewsCard";
import { CircularProgress } from "@mui/material";

export default function NewsList() {
    const { news, fetchNews, loading, deleteNews } = useNewsStore();

    useEffect(() => {
        fetchNews();
    }, [fetchNews]);

    const handleDelete = async (id: number) => {
        if (confirm("Удалить новость?")) {
            await deleteNews(id);
        }
    };

    if (loading) return <CircularProgress />;

    return (
        <div>
            {news.map((n) => (
                <NewsCard key={n.id} news={n} onDelete={handleDelete} />
            ))}
        </div>
    );
}