import React from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { LocationWithDetails } from '../types';

interface ModalHeaderProps {
    location: LocationWithDetails;
    isMobile: boolean;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ location, isMobile }) => {
    const handleCopyAddress = () => {
        navigator.clipboard.writeText(location.address);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant={isMobile ? 'h6' : 'h4'} sx={{ fontWeight: 700 }}>
                    {location.name}
                </Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                <Typography variant="subtitle1" sx={{ color: 'gray', marginRight: '0.5rem' }}>
                    Address:
                </Typography>
                <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                    {location.address}
                </Typography>
                <IconButton onClick={handleCopyAddress} size="small" aria-label="copy to clipboard">
                    <ContentCopyIcon fontSize="small" />
                </IconButton>
            </div>
            <Typography variant="subtitle1">
                <a
                    href={location.google_maps_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#74b6c4', textDecoration: 'underline' }}
                >
                    Google Maps Link
                </a>
            </Typography>
        </div>
    );
};

export default ModalHeader;
