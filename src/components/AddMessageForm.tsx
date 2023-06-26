import React, { useState } from "react";
import {
    Button,
    TextField,
    Box,
    Select,
    InputLabel,
    MenuItem,
} from "@mui/material";
import { TestVariantProps } from "@/entities/TestVariant";

export type AddMessageFormProps = {
    onSubmit: ({ type, text }: { type: string; text: string }) => Promise<void>;
};

function AddMessageForm({ onSubmit }: AddMessageFormProps) {
    const [text, setText] = useState("");
    const [type, setType] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await onSubmit({
                text,
                type,
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate>
            <InputLabel id="select-type-label">Type</InputLabel>
            <Select
                labelId="select-type-label"
                id="select-type"
                value={type}
                label="Type"
                onChange={(event: any) => setType(event.target.value)}
            >
                <MenuItem disabled value=""></MenuItem>
                <MenuItem value={"ai"}>ai</MenuItem>
                <MenuItem value={"human"}>human</MenuItem>
                <MenuItem value={"system"}>system</MenuItem>
            </Select>
            <TextField
                value={text}
                onChange={(event: any) => setText(event.target.value)}
                name="text"
                label="Text"
                required
            />
            <Button type="submit">Add Message</Button>
        </Box>
    );
}

export default AddMessageForm;
