"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useNewsStore } from "@/store/newsStore";
import CommentList from "@/components/CommentList";
import CommentForm from "@/components/CommentForm";
import { Typography } from "@mui/material";

export default function NewsPage() {
  const params = useParams();
  const id = Number(params.id);
  const { currentNews, fetchNewsById } = useNewsStore();

  useEffect(() => {
    fetchNewsById(id);
  }, [id, fetchNewsById]);

  if (!currentNews) return <div>Загрузка...</div>;

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {currentNews.title}
      </Typography>
      <Typography sx={{ mb: 2 }}>{currentNews.content}</Typography>

      <CommentList newsId={id} />
      <CommentForm newsId={id} />
    </div>
  );
}
