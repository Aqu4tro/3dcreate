import { List, ListItem, Slide, Stack, TextField, Typography } from "@mui/material";
export interface Component {
    name: string;
    wall: string;
    position: [x:number, y:number, z:number];
    scale: [x:number, y:number, z:number];
    disabled: boolean;
}


export default function ComponentList({ components }: { components: Component[] }) {
    return (
        <List>
            {
                components.map((component) => (
                    <ListItem>
                        <Typography>{component.name}</Typography>
                        <Typography>Position: {component.position}</Typography>
                        <List>
                            <TextField label="X" value={component.position[0]} disabled={component.wall === "L" || component.wall === "R"}/>
                            <TextField label="Y" value={component.position[1]} />
                            <TextField label="Z" value={component.position[2]} disabled={component.wall === "F" || component.wall === "B"}/>
                        </List>
                    </ListItem>
                ))
            }
        </List>
    )
}