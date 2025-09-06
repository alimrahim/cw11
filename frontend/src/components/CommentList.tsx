"use client";

import { useEffect } from "react";
import { useCommentStore } from "@/store/commentStore";
import { Typography, Box } from "@mui/material";

export default function CommentList({ newsId }: { newsId: number }) {
    const { comments, fetchComments } = useCommentStore();

    useEffect(() => {
        fetchComments(newsId);
    }, [newsId, fetchComments]);

    return (
        <Box>
            {comments.map((c) => (
                <Box key={c.id} sx={{ mb: 2 }}>
                    <Typography variant="subtitle2">{c.author}</Typography>
                    <Typography>{c.text}</Typography>
                </Box>
            ))}
        </Box>
    );
}
