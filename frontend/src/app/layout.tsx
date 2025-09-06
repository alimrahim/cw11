import { ReactNode } from "react";
import { CssBaseline, Container, Typography } from "@mui/material";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <CssBaseline />
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            📰 News Portal
          </Typography>
          {children}
        </Container>
      </body>
    </html>
  );
}
