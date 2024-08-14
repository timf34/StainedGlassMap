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
                style={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
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
                <Box
                    onClick={onClose}
                    style={{
                        width: '90vw',
                        height: '90vh',
                        maxWidth: '90vw',
                        maxHeight: '90vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        overflow: 'hidden',
                    }}
                >
                    <img
                        src={imageUrl}
                        alt={title}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain',
                            cursor: 'default',
                        }}
                    />
                </Box>
            </Box>
        </Modal>
    );
};

export default ImageModal;