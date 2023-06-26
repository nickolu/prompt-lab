import { Box } from "@mui/material";
import Link from "next/link";

export default function Navigation() {
    return (
        <Box component="ul">
            <Box component="li">
                <Link href="/test-runs">Test Runs</Link>
            </Box>
        </Box>
    );
}
