import { app , BrowserWindow, ipcMain } from "electron";
import path from "path";
import { ipcMainHandle, isDev } from "./util.js";
import { pollResources } from "./resourceManager.js";
import { getPreloadPath, getUIPath } from "./pathResolver.js";
import { getStaticData } from "./resourceManager.js"

app.on("ready" , () => {
  const mainWin = new BrowserWindow({
    webPreferences : {
      preload : getPreloadPath()
    }
  });
  if(isDev()){
    mainWin.loadURL("http://localhost:5173");
  } else{
    mainWin.loadFile(getUIPath()); 
  }

  pollResources(mainWin);

  ipcMainHandle('getStaticData',() => {
    return getStaticData()
  })
}) 

