"use client";

import { useState } from "react";
import { useCommentStore } from "@/store/commentStore";
import { TextField, Button, Box } from "@mui/material";

export default function CommentForm({ newsId }: { newsId: number }) {
    const [author, setAuthor] = useState("");
    const [text, setText] = useState("");
    const { createComment, fetchComments } = useCommentStore();

    const handleSubmit = async () => {
        await createComment({ newsId, author, text });
        await fetchComments(newsId);
        setAuthor("");
        setText("");
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
            <TextField label="Автор" value={author} onChange={(e) => setAuthor(e.target.value)} />
            <TextField
                label="Комментарий"
                multiline
                rows={2}
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <Button variant="contained" onClick={handleSubmit}>
                Добавить комментарий
            </Button>
        </Box>
    );
}
