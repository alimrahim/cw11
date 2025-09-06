"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useNewsStore } from "@/store/newsStore";
import CommentList from "@/components/CommentList";
import CommentForm from "@/components/CommentForm";
import { Typography, Button, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function NewsPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const { currentNews, fetchNewsById, deleteNews } = useNewsStore();

  useEffect(() => {
    fetchNewsById(id);
  }, [id, fetchNewsById]);

  const handleDelete = async () => {
    if (confirm("Удалить эту новость?")) {
      await deleteNews(id);
      router.push("/");
    }
  };

  if (!currentNews) return <div>Загрузка...</div>;

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5">
          {currentNews.title}
        </Typography>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
        >
          Удалить новость
        </Button>
      </Box>
      
      <Typography sx={{ mb: 2 }}>{currentNews.content}</Typography>

      <CommentList newsId={id} />
      <CommentForm newsId={id} />
    </Box>
  );
  
}