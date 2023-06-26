import axios from "axios";
import TestVariant from "./TestVariant";
import llMChat from "@/utils/llmChat";

export type TestRunProps = {
    name: string;
    id: string;
};

export default class TestRun {
    name: string;
    id: string;

    constructor({ name, id }: TestRunProps) {
        this.name = name;
        this.id = id;
    }

    // async run(times: number, testResultsWriter: TestResultsWriter) {
    //     let timesRemaining = times;
    //     let totalTestIterations = 0;
    //     await testResultsWriter.beforeAll(times, totalTestIterations);

    //     while (timesRemaining > 0) {
    //         let currentTestIteration = 1;
    //         console.log(
    //             `< initiating test run ${
    //                 times - timesRemaining + 1
    //             } out of ${times} >`
    //         );
    //         for (const variant of this.variants) {
    //             const { temperature, model, messages } = variant;
    //             await testResultsWriter.beforeEach(
    //                 variant,
    //                 currentTestIteration
    //             );

    //             const response = await llMChat({
    //                 messages,
    //                 temperature: Number(temperature),
    //                 modelName: model,
    //             });
    //             this.results.push({ response });
    //             await testResultsWriter.afterEach(
    //                 { response },
    //                 variant,
    //                 currentTestIteration
    //             );
    //             totalTestIterations++;
    //             currentTestIteration++;
    //         }
    //         timesRemaining--;
    //     }
    //     await testResultsWriter.afterAll(this.results);
    // }
}
