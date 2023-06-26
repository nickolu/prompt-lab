// components/TestRunForm.tsx
import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material";

function TestRunForm({
    onSubmit,
}: {
    onSubmit: ({ name }: { name: string }) => void;
}) {
    const [name, setName] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            onSubmit({ name });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
                value={name}
                onChange={(event: any) => setName(event.target.value)}
                name="name"
                label="Name"
                required
            />
            <Button type="submit" variant="outlined">
                Create Test
            </Button>
        </Box>
    );
}

export default TestRunForm;
