import React from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { createTheme } from '@mui/material/styles';
import { LocationWithDetails } from '../types';
import { Box } from '@mui/material';

interface ModalHeaderProps {
    location: LocationWithDetails;
    isMobile: boolean;
}

// TODO: It's important that I know how to do this myself, I waste too much time getting ChatGPT to make it work.
// What do I want?
// On desktop, the "Address", address itself, and the "Google Maps Link" should be on the same line, all close together.
// On mobile, they should be three separate elements persay, each starting on the same line, but the address itself
// should be able to wrap to the next line if it's too long (and it should be in the centre).

const ModalHeader: React.FC<ModalHeaderProps> = ({ location, isMobile }) => {
    const handleCopyAddress = () => {
        navigator.clipboard.writeText(location.address);
    };

    const theme = createTheme({
        typography: {
            body2: {
                fontSize: 12,
            },
        },
    });

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
            <Typography variant={isMobile ? 'h6' : 'h4'} sx={{ fontWeight: 700, marginBottom: '0.5rem' }}>
                {location.name}
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    marginBottom: '0.5rem',
                    gap: isMobile ? '0.5rem' : '10px',
                }}
            >
                <Typography variant="body2" sx={{ color: 'gray', whiteSpace: 'nowrap' }}>
                    Address:
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        overflowWrap: 'break-word',
                        wordWrap: 'break-word',
                        hyphens: 'auto',
                        marginRight: isMobile ? '0' : '2px',
                    }}
                >
                    {location.address}
                </Typography>
                <IconButton
                    onClick={handleCopyAddress}
                    size="small"
                    aria-label="copy to clipboard"
                    sx={{ padding: '0' }}
                >
                    <ContentCopyIcon fontSize="xsmall" />
                </IconButton>
            </Box>

            <Typography variant="body2">
                <a
                    href={location.google_maps_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#74b6c4', textDecoration: 'underline' }}
                >
                    Google Maps Link
                </a>
            </Typography>
        </Box>
    );
};

export default ModalHeader;
