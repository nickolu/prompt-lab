import TestRun from "@/entities/TestRun";
import axios from "axios";
import { get } from "http";
import { useCallback, useEffect, useState } from "react";

export default function useTestRuns() {
    const [testRuns, setTestRuns] = useState<TestRun[]>([]);

    const addTestRun = useCallback(async ({ name }: { name: string }) => {
        const response = await axios.post("/api/testRuns", { name });
        console.log(response.data);
        const testRun = new TestRun({ name, id: response.data.id });
        setTestRuns((prevTestRuns) => [...prevTestRuns, testRun]);
    }, []);

    const getAllTestRuns = useCallback(async () => {
        const response = await axios.get("/api/testRuns");
        return response.data.map((testRun: any) => new TestRun(testRun));
    }, []);

    const getTestRunById = useCallback(async (id: string) => {
        if (!id) throw new Error("id is required");
        const response = await axios.get(`/api/testRuns/${id}`);
        console.log(response.data);
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
