"use client";

import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import { News } from "@/store/newsStore";
import Link from "next/link";

export default function NewsCard({ news }: { news: News }) {
    return (
        <Link href={`/news/${news.id}`}>
            <Card sx={{ maxWidth: 400, mb: 2, cursor: "pointer" }}>
                {news.image && (
                    <CardMedia component="img" height="200" image={news.image} alt={news.title} />
                )}
                <CardContent>
                    <Typography variant="h6">{news.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {new Date(news.publishedAt).toLocaleString()}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
}
