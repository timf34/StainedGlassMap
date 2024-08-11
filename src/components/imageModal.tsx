import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';

interface ImageModalProps {
    open: boolean;
    onClose: () => void;
    imageUrl: string;
    title: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ open, onClose, imageUrl, title }) => {
    const [loadedImageUrl, setLoadedImageUrl] = useState('');

    useEffect(() => {
        if (open) {
            const img = new Image();
            img.src = imageUrl;
            img.onload = () => setLoadedImageUrl(imageUrl);
        } else {
            setLoadedImageUrl('');
        }
    }, [open, imageUrl]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={false}
            fullScreen
            PaperProps={{
                style: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    overflow: 'hidden',
                },
            }}
        >
            <DialogContent
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    padding: 0,
                }}
            >
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        right: 16,
                        top: 16,
                        color: '#fff',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        zIndex: 1,
                    }}
                >
                    <CloseIcon />
                </IconButton>
                {loadedImageUrl ? (
                    <img
                        src={loadedImageUrl}
                        alt={title}
                        style={{
                            maxWidth: '95%',
                            maxHeight: '95%',
                            objectFit: 'contain',
                        }}
                    />
                ) : (
                    <CircularProgress style={{ color: '#fff' }} />
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ImageModal;