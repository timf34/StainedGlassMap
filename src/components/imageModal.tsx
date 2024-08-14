import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
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
        <Modal
            open={open}
            onClose={onClose}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
            }}
        >
            <Box
                onClick={onClose} // Close modal when clicking outside the image
                style={{
                    position: 'relative',
                    outline: 'none',
                    maxWidth: '90%',
                    maxHeight: '90%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
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
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 2,
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <img
                    src={imageUrl}
                    alt={title}
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
                    style={{
                        maxWidth: '90%',
                        maxHeight: '90%',
                        cursor: 'default',
                    }}
                />
            </Box>
        </Modal>
    );
};

export default ImageModal;
