"use client";

import { useEffect } from "react";
import { useCommentStore } from "@/store/commentStore";
import { Typography, Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CommentList({ newsId }: { newsId: number }) {
    const { comments, fetchComments, deleteComment } = useCommentStore();

    useEffect(() => {
        fetchComments(newsId);
    }, [newsId, fetchComments]);

    const handleDelete = async (id: number) => {
        if (confirm("Удалить комментарий?")) {
            await deleteComment(id);
        }
    };

    return (
        <Box>
            {comments.map((c) => (
                <Box key={c.id} sx={{ mb: 2, display: "flex", alignItems: "flex-start" }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2">{c.author}</Typography>
                        <Typography>{c.text}</Typography>
                    </Box>
                    <IconButton onClick={() => handleDelete(c.id)} size="small">
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ))}
        </Box>
    );
}