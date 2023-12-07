import {surpriseMePrompts} from "../constants"
import FileSaver from 'file-saver';

export function getRandomPrompt(prompt) {
    //get random index 1-49
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length)

    const randomPrompt = surpriseMePrompts[randomIndex]

    //check that random prompt doesn't appear more than once
    if(randomPrompt === prompt) return getRandomPrompt(prompt)

    return randomPrompt
}

export async function downloadImage(_id, photo){
    FileSaver.saveAs(photo, `download-${_id}.jpg`);
}