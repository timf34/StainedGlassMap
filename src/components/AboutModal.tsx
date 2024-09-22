import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface AboutModalProps {
    open: boolean;
    onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ open, onClose }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.3)', // Dim background
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    width: '80vw',
                    maxWidth: 500,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: '16px', 
                    p: 4,
                    outline: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: '#888'
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <Typography id="about-modal-title" variant="h6" component="h2" textAlign="center">
                    About the Stained Glass Map
                </Typography>
                <Typography sx={{ mt: 2 }} textAlign="center">
                    This map was built to make it easier for people to discover and explore notable stained glass locations across Ireland, particularly focusing on artists like Harry Clarke, Evie Hone, and Michael Healy. It's a centralized resource for art lovers and historians to learn more about the country's rich history in stained glass art.
                </Typography>
            </Box>
        </Modal>
    );
};

export default AboutModal;
