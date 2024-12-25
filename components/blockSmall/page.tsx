
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import React from 'react';
import { Typography, Box } from '@mui/material';

interface BlockSmallProps {
    name: string;
    disable: boolean|undefined;
    select: boolean|undefined;
    setSelect: () => void;
}

function  BlockSmall({ name, disable, select, setSelect }: BlockSmallProps) {
    const [isVisible, setIsVisible] = useState(disable);
    
    
    function handleClick() {
        setIsVisible(!isVisible);
    };
    function handleSelected() {
        setSelect();
        
        
    };
    return (
        <Box onClick={handleSelected} border={1} borderRadius={4} borderColor="grey.300">
            <Typography variant="h6">{name}</Typography>
            <IconButton onClick={handleClick}>
            {isVisible ? <VisibilityIcon sx={{color:'white'}} /> : <VisibilityOffIcon  sx={{color:'white'}}/>}
        </IconButton>
        </Box>
    );
};

export default BlockSmall;