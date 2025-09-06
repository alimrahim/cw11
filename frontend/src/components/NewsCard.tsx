"use client";

import { Card, CardContent, Typography, CardMedia, IconButton } from "@mui/material";
import { News } from "@/store/newsStore";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";

export default function NewsCard({ news, onDelete }: { news: News; onDelete: (id: number) => void }) {
    const imageUrl = news.image 
        ? `http://localhost:3001/uploads/${news.image}`
        : news.image;

    return (
        <Card sx={{ maxWidth: 400, mb: 2, cursor: "pointer", position: "relative" }}>
            <IconButton 
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDelete(news.id);
                }}
                size="small"
                sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}
            >
                <DeleteIcon />
            </IconButton>
            
            <Link href={`/news/${news.id}`}>
                {news.image && (
                    <CardMedia 
                        component="img" 
                        height="200" 
                        image={imageUrl} 
                        alt={news.title}
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                )}
                <CardContent>
                    <Typography variant="h6">{news.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {new Date(news.publishedAt).toLocaleString()}
                    </Typography>
                </CardContent>
            </Link>
        </Card>
    );
}