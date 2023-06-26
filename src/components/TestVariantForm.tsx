import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material";
import { TestVariantProps } from "@/entities/TestVariant";

export type TestVariantFormProps = {
    temperature?: number;
    model?: string;
    description?: string;
    onSubmit: ({
        temperature,
        model,
        description,
    }: {
        temperature: number;
        model: string;
        description: string;
    }) => Promise<void>;
};

function TestVariantForm({
    temperature = 0.7,
    model = "",
    description = "",
    onSubmit,
}: TestVariantFormProps) {
    const [_temperature, setTemperature] = useState(temperature);
    const [_model, setModel] = useState(model);
    const [_description, setDescription] = useState(description);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await onSubmit({
                description: _description,
                temperature: _temperature,
                model: _model,
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
                value={_description}
                onChange={(event: any) => setDescription(event.target.value)}
                name="description"
                label="Description"
                required
            />
            <TextField
                value={_temperature}
                onChange={(event: any) =>
                    setTemperature(parseFloat(event.target.value))
                }
                name="temperature"
                label="Temperature"
                required
            />
            <TextField
                value={_model}
                onChange={(event: any) => setModel(event.target.value)}
                name="model"
                label="Model"
                required
            />

            <Button type="submit">Create Variant</Button>
        </Box>
    );
}

export default TestVariantForm;
