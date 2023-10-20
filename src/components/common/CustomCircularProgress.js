import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CircularPercentProgress({ percent, size = 100, thickness = 6 }) {
    const getColor = () => {
        if (percent >= 70) {
            return 'green';
        } else if (percent >= 50) {
            return 'yellow';
        } else if (percent >= 30) {
            return 'orange';
        } else {
            return 'red';
        }
    };

    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress
                variant="determinate"
                value={percent}
                size={size}
                thickness={thickness}
                sx={{
                    color: getColor(),
                    trailColor: 'black',
                }}
            />
            <Typography
                variant="span" // You can adjust the variant to a smaller size, such as "body2"
                component="div"
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontWeight: 'bold',
                }}
            >
                {`${percent}%`}
            </Typography>
        </Box>
    );
}

export default CircularPercentProgress;