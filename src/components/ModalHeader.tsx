import React from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { LocationWithDetails } from '../types';

// For title, address, and Google Maps link

interface ModalHeaderProps {
    location: LocationWithDetails;
    isMobile: boolean;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ location, isMobile }) => {
    const handleCopyAddress = () => {
        navigator.clipboard.writeText(location.address);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div>
                <Typography variant={isMobile ? 'h6' : 'h5'} style={{ fontWeight: 200 }}>
                    {location.name}
                </Typography>
                <Typography variant="subtitle1">
                    <a
                        href={location.google_maps_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#007BFF', textDecoration: 'underline' }}
                    >
                        View on Google Maps
                    </a>
                </Typography>
            </div>
            <div style={{ textAlign: 'right' }}>
                <Typography variant="subtitle1">{location.address}</Typography>
                <IconButton onClick={handleCopyAddress} size="small" aria-label="copy to clipboard">
                    <ContentCopyIcon fontSize="small" />
                </IconButton>
            </div>
        </div>
    );
};

export default ModalHeader;