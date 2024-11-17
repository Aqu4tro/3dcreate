'use client';
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import Floor from "@/components/floor/page";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useState } from "react";
import { Add, ArrowBack } from "@mui/icons-material";
import { Box, Button, Checkbox, Input, List, ListItem, ListItemText, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import Lot from "@/components/lot/page";
export type Room = {
  length: number,
  width: number,
  size?: number,
  height?: number,
  name: string
}
export default function Home() {
  const [nameObject, setNameObject] = useState<string>('');
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [size, setSize] = useState<number>(0);
  const [length, setLength] = useState<number>(0);
  const [thick, setThick] = useState<boolean>(false);
  const [panelVisible, setPanelVisible] = useState<boolean>(false);
  const [lot, setLot] = useState<Room[]>([]);
  const [objects, setObjects] = useState<Room[]>([]);

  function createLot({length, width, size, height, name}:Room){
    setLot([{length,width,size,height,name}]);
    setObjects([{length,width,size,height,name}]);
  }
  function togglePanel() {
    setPanelVisible(!panelVisible);
    setThick(false);
  }
  
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {/* Painel de Entrada */}
      {panelVisible && (
        <div style={{ position: "absolute", bottom: "10vh", left: "3vh", zIndex: 2 }}>
          <Box sx={{ padding: 2, backgroundColor: 'white',justifyItems:"center",borderColor:"white", borderWidth:2, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h6" color="textPrimary">Terreno</Typography>
            <List>
              <ListItem>
              <TextField type="text" label="name" size="small" onChange={(e) => setNameObject(e.target.value)} />
              </ListItem>
              <ListItem>
              <TextField
                label="Width" 
                type="number" 
               size="small"
                onChange={(e) => setWidth(Number(e.target.value))} 
                sx={{ marginBottom: 1 }} // Adiciona margem inferior
              />
              </ListItem>
              <ListItem>
              <TextField
                label="Length" 
                type="number"  
                size="small"
                onChange={(e) => setLength(Number(e.target.value))} 
                sx={{ marginBottom: 1 }} // Adiciona margem inferior
              />
              </ListItem>
        
              <ListItem>
                
                <Typography color="textPrimary">Enable Walls </Typography>
              <Checkbox
                
                onChange={(e) => setThick(e.target.checked ? true : false)} // Exemplo de uso
              />
              </ListItem>
             
                
                  <List sx={{display: thick ? "block" : "none"}} >
              <ListItem><TextField variant="outlined" type="number" label="Size" size="small" onChange={(e) => setSize(Number(e.target.value))} /></ListItem>
              <ListItem><TextField variant="outlined" type="number" label="Height" size="small" onChange={(e) => setHeight(Number(e.target.value))} /></ListItem>
                
              </List>
                
             
              
            
            </List>
          <Button variant="contained" onClick={() => {
            togglePanel();
            createLot({length:length, width:width, size:size, height:height, name:nameObject});
          }} startIcon={<Add />} >
              Criar
           </Button>
          </Box>
        </div>
      )}

      
      <Button   
        sx={{
          borderRadius: '50%', 
          width: '46px', 
          height: '46px', 
          minWidth: '0', 
          borderWidth: 3,
          position: 'absolute',
          bottom: '3vh',
          left: '3vh',
          zIndex: 2
        }} 
        color="inherit" 
        variant="outlined" 
        onClick={togglePanel}
      >
      {
        panelVisible ? (
            
            <ArrowBack fontSize="large" />
        ):(
          <Add fontSize="large"/>
        )
        
      }
        
      </Button>

    
      <Canvas>  
        <PerspectiveCamera position={[0, 0, -20]} />
        {
        lot.map((item) => (
          <Lot length={item.length} width={item.width} size={item.size} name={item.name} height={item.height} />
        ))
        }
        <OrbitControls rotateSpeed={0.2} />
        <ambientLight intensity={0.1} />
        <directionalLight position={[5, -50, 5]} color="blue" />
      </Canvas>
    </div>
  );
}