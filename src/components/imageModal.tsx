import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface ImageModalProps {
    open: boolean;
    onClose: () => void;
    imageUrl: string;
    title: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ open, onClose, imageUrl, title }) => {
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
                    position: 'relative',
                    padding: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh', // Ensures the content is centered vertically
                }}
            >
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: '#fff',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <img
                    src={imageUrl}
                    alt={title}
                    style={{
                        display: 'block',
                        maxHeight: '100%',
                        maxWidth: '100%',
                        margin: 'auto',
                    }}
                />
            </DialogContent>
        </Dialog>
    );
};

export default ImageModal;
