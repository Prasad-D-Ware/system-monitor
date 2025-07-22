import { ipcMain, WebContents, WebFrame, WebFrameMain } from "electron"
import { pathToFileURL } from "url";
import { getUIPath } from "./pathResolver.js";

export function isDev(){
  return process.env.NODE_ENV === "development" 
}

export function ipcMainHandle<Key extends keyof EvenetPayloadMapping>(key : Key ,handler: () => EvenetPayloadMapping[Key]){
  ipcMain.handle(key,(event)=>{
    validateEventFrame(event.senderFrame!)
    return handler()
  });
}

export function ipcWebContentsSend<Key extends keyof EvenetPayloadMapping>(key : Key, webContents : WebContents, payload : EvenetPayloadMapping[Key] ){
  webContents.send(key,payload)
}

export function validateEventFrame(frame : WebFrameMain){
  console.log(frame.url);
  if(isDev() && new URL(frame.url).host === 'localhost:5173'){
    return;
  }

  if(frame.url !== pathToFileURL(getUIPath()).toString()){
    throw new Error ('Malicious event');
  }

}