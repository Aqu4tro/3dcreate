import { Room } from '@/app/page';
import {saveAs} from 'file-saver'


export const downloadRoomsAsJson = (rooms: Room[]) => {
    const json = JSON.stringify(rooms, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    saveAs(blob, 'rooms.json');
};