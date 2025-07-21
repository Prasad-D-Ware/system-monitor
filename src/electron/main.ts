import { app , BrowserWindow, ipcMain } from "electron";
import path from "path";
import { isDev } from "./util.js";
import { pollResources } from "./resourceManager.js";
import { getPreloadPath } from "./pathResolver.js";
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
    mainWin.loadFile(path.join(app.getAppPath(),'/dist-react/index.html')); 
  }

  pollResources(mainWin);

  ipcMain.handle('getStaticData',() => {
    return getStaticData()
  })
}) 
