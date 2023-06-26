import TestRun from "@/entities/TestRun";
import axios from "axios";
import { get } from "http";
import { useCallback, useEffect, useState } from "react";

export default function useTestRuns() {
    const [testRuns, setTestRuns] = useState<TestRun[]>([]);

    const addTestRun = useCallback(async ({ name }: { name: string }) => {
        const response = await axios.post("/api/testRuns", { name });
        console.log(response.data);
        return new TestRun({ name, id: response.data.id });
    }, []);

    const getAllTestRuns = useCallback(async () => {
        const response = await axios.get("/api/testRuns");
        return response.data.map((testRun: any) => new TestRun(testRun));
    }, []);

    const getTestRunById = useCallback(async (id: string) => {
        const response = await axios.get(`/api/testRuns/${id}`);
        return new TestRun(response.data);
    }, []);

    useEffect(() => {
        async function fetchTestRuns() {
            const runs = await getAllTestRuns();
            setTestRuns(runs);
        }
        fetchTestRuns();
    }, [getAllTestRuns]);

    return { testRuns, addTestRun, getAllTestRuns, getTestRunById };
}
