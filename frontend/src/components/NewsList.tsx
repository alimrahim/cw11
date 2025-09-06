"use client";

import { useEffect } from "react";
import { useNewsStore } from "@/store/newsStore";
import NewsCard from "./NewsCard";
import { CircularProgress } from "@mui/material";

export default function NewsList() {
    const { news, fetchNews, loading } = useNewsStore();

    useEffect(() => {
        fetchNews();
    }, [fetchNews]);

    if (loading) return <CircularProgress />;

    return (
        <div>
            {news.map((n) => (
                <NewsCard key={n.id} news={n} />
            ))}
        </div>
    );
}
