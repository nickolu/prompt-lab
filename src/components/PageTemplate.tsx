import { Box } from "@mui/material";
import Link from "next/link";
import Navigation from "./Navigation";

export default function PageTemplate({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Box>
            <Navigation />
            {children}
        </Box>
    );
}
