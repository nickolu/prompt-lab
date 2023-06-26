import TestRunForm from "@/components/TestRunForm";
import Link from "next/link";
import useTestRuns from "@/hooks/useTestRuns";
import { Box, Typography } from "@mui/material";
import PageTemplate from "@/components/PageTemplate";

function TestRunsPage() {
    const { testRuns, addTestRun } = useTestRuns();

    return (
        <PageTemplate>
            <Typography variant="h2">Create a New Test</Typography>
            <TestRunForm onSubmit={addTestRun} />
            <Typography variant="h3">Your Tests</Typography>
            {testRuns.map((testRun) => (
                <Box key={testRun.id}>
                    <Link href={`test-runs/${testRun.id}`}>
                        <Typography>{testRun.name}</Typography>
                    </Link>
                </Box>
            ))}
        </PageTemplate>
    );
}

export default TestRunsPage;
