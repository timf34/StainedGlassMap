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

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                alignItems: 'start',
                gap: '0.5rem',
                marginBottom: '0.5rem'
            }}>
                <Typography variant="body2" sx={{ color: 'gray', whiteSpace: 'nowrap' }}>
                    Address:
                </Typography>
                <Typography variant="body2" sx={{ overflowWrap: 'break-word', wordWrap: 'break-word', hyphens: 'auto' }}
                >
                    {location.address}
                </Typography>

                <IconButton
                    onClick={handleCopyAddress}
                    size="small"
                    aria-label="copy to clipboard"
                    sx={{ padding: '0' }}
                >
                    <ContentCopyIcon fontSize="small" />
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