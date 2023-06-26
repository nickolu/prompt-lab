import TestRunForm from "@/components/TestRunForm";
import Link from "next/link";
import useTestRuns from "@/hooks/useTestRuns";

function TestRunsPage() {
    const { testRuns, addTestRun } = useTestRuns();

    return (
        <div>
            <h1>Create a New Test Run</h1>
            <TestRunForm onSubmit={addTestRun} />
            <h2>Your Test Runs</h2>
            {testRuns.map((testRun) => (
                <div key={testRun.id}>
                    <Link href={`test-runs/${testRun.id}`}>{testRun.name}</Link>
                </div>
            ))}
        </div>
    );
}

export default TestRunsPage;
