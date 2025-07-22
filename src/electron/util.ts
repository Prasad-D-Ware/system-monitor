import { ipcMain, WebContents } from "electron"

export function isDev(){
  return process.env.NODE_ENV === "development" 
}

export function ipcMainHandle<Key extends keyof EvenetPayloadMapping>(key : Key ,handler: () => EvenetPayloadMapping[Key]){
  ipcMain.handle(key,()=>handler());
}

export function ipcWebContentsSend<Key extends keyof EvenetPayloadMapping>(key : Key, webContents : WebContents, payload : EvenetPayloadMapping[Key] ){
  webContents.send(key,payload)
}