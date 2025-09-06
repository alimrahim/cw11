"use client";

import { useState } from "react";
import { useNewsStore } from "@/store/newsStore";
import { TextField, Button, Box } from "@mui/material";

export default function NewsForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { createNews, fetchNews } = useNewsStore();

  const handleSubmit = async () => {
    const form = new FormData();
    form.append("title", title);
    form.append("content", content);
    if (file) form.append("image", file);

    await createNews(form);
    await fetchNews();
    setTitle("");
    setContent("");
    setFile(null);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
      <TextField label="Заголовок" value={title} onChange={(e) => setTitle(e.target.value)} />
      <TextField
        label="Содержимое"
        multiline
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      <Button variant="contained" onClick={handleSubmit}>
        Добавить новость
      </Button>
    </Box>
  );
}
