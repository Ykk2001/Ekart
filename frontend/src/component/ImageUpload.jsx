import React from "react";

import {
    Box,
    Button,
    Card,
    CardContent,
    IconButton,
    Input,
    Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

const ImageUpload = ({ productData, setProductData }) => {

    const handleFiles = (e) => {
        const files = Array.from(e.target.files || []);

        if (files.length) {
            setProductData((prev) => ({
                ...prev,
                productImg: [...prev.productImg, ...files],
            }));
        }
    };

    const removeImage = (index) => {
        setProductData((prev) => {
            const updatedImages = prev.productImg.filter(
                (_, i) => i !== index
            );

            return {
                ...prev,
                productImg: updatedImages,
            };
        });
    };

    return (
        <Box
            sx={{
                display: "grid",
                gap: 1,
            }}
        >
            {/* Label */}
            <Typography
                variant="body2"
                sx={{
                    fontWeight: 500,
                    mb: 0.5,
                }}
            >
                Product Images
            </Typography>

            {/* Hidden File Input */}
            <Input
                type="file"
                id="file-upload"
                sx={{ display: "none" }}
                inputProps={{
                    accept: "image/*",
                    multiple: true,
                }}
                onChange={handleFiles}
            />

            {/* Upload Button */}
            <Button
                variant="outlined"
                component="label"
                htmlFor="file-upload"
                sx={{
                    width: "fit-content",
                    textTransform: "none",
                }}
            >
                Upload Images
            </Button>

            {/* Images Preview */}
            {productData.productImg.length > 0 && (
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "repeat(2, 1fr)",
                            md: "repeat(3, 1fr)",
                        },
                        gap: 2,
                        mt: 1,
                    }}
                >
                    {productData.productImg.map((file, idx) => {

                        // File selected from input
                        let preview;

                        if (file instanceof File) {
                            preview = URL.createObjectURL(file);
                        }

                        // Image URL from database
                        else if (typeof file === "string") {
                            preview = file;
                        }

                        // DB object containing url
                        else if (file?.url) {
                            preview = file.url;
                        }

                        // Invalid image
                        else {
                            return null;
                        }

                        return (
                            <Card
                                key={idx}
                                sx={{
                                    position: "relative",
                                    overflow: "hidden",
                                }}
                            >
                                <CardContent
                                    sx={{
                                        p: 1,
                                        "&:last-child": {
                                            pb: 1,
                                        },
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={preview}
                                        alt=""
                                        sx={{
                                            width: "100%",
                                            height: 128,
                                            objectFit: "cover",
                                            borderRadius: 1,
                                            display: "block",
                                        }}
                                    />

                                    {/* Remove Button */}
                                    <IconButton
                                        onClick={() => removeImage(idx)}
                                        size="small"
                                        sx={{
                                            position: "absolute",
                                            top: 8,
                                            right: 8,
                                            backgroundColor:
                                                "rgba(0,0,0,0.5)",
                                            color: "white",

                                            "&:hover": {
                                                backgroundColor:
                                                    "rgba(0,0,0,0.7)",
                                            },
                                        }}
                                    >
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </CardContent>
                            </Card>
                        );
                    })}
                </Box>
            )}
        </Box>
    );
};

export default ImageUpload;

