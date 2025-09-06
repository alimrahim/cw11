import { create } from "zustand";
import { api } from "@/lib/api";

export type News = {
    id: number;
    title: string;
    image?: string;
    publishedAt: string;
    content?: string;
    comments?: string[];
};

type State = {
    news: News[];
    currentNews?: News;
    loading: boolean;
    fetchNews: () => Promise<void>;
    fetchNewsById: (id: number) => Promise<void>;
    createNews: (form: FormData) => Promise<void>;
    deleteNews: (id: number) => Promise<void>;
};

export const useNewsStore = create<State>((set) => ({
    news: [],
    currentNews: undefined,
    loading: false,

    fetchNews: async () => {
        set({ loading: true });
        const res = await api.get<News[]>("/news");
        set({ news: res.data, loading: false });
    },

    fetchNewsById: async (id) => {
        set({ loading: true });
        const res = await api.get<News>(`/news/${id}`);
        set({ currentNews: res.data, loading: false });
    },

    createNews: async (form) => {
        await api.post("/news", form, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    },

    deleteNews: async (id: number) => {
        await api.delete(`/news/${id}`);
        set((state) => ({
            news: state.news.filter((n) => n.id !== id),
            currentNews: state.currentNews?.id === id ? undefined : state.currentNews
        }));
    },
}));