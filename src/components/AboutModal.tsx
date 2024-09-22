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
                    About
                </Typography>
                <Typography sx={{ mt: 2 }} textAlign="center">
                    StainedGlassMap.com is a passion project by <a href="https://timfarrelly.com" target="_blank" style={{ fontStyle: 'italic' }}>Tim Farrelly</a>, 
                    and an attempt to map out the Irish stained glass ecosystem. 
                    <br /><br />
                    The best paintings are consolidated in the public galleries, but the best stained glass is a different story. 
                    They're often tucked away in churches or other buildings, and not everyone has the luck to stumble upon them! 
                    This map is an attempt to change that. 
                    <br /><br />
                    Currently we are indexing the data by hand, but we'll soon create a crowdsourcing mechanism to allow users to 
                    add stained glass you come across!
                </Typography>
            </Box>
        </Modal>
    );
};

export default AboutModal;
