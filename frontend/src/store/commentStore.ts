import { create } from "zustand";
import { api } from "@/lib/api";

export type Comment = {
  id: number;
  newsId: number;
  author: string;
  text: string;
};

type State = {
  comments: Comment[];
  fetchComments: (newsId: number) => Promise<void>;
  createComment: (payload: { newsId: number; author?: string; text: string }) => Promise<void>;
};

export const useCommentStore = create<State>((set) => ({
  comments: [],

  fetchComments: async (newsId) => {
    const res = await api.get<Comment[]>(`/comments?news_id=${newsId}`);
    set({ comments: res.data });
  },

  createComment: async (payload) => {
    await api.post("/comments", payload);
  },
}));
