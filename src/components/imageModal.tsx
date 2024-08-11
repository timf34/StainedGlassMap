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
            maxWidth="lg"
            fullWidth
        >
            <DialogContent style={{ position: 'relative', padding: 0 }}>
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
                <img src={imageUrl} alt={title} style={{ width: '100%', height: 'auto' }} />
            </DialogContent>
        </Dialog>
    );
};

export default ImageModal;