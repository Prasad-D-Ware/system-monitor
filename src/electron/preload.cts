const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron",{
    subscribeStatistic : (callback : (statistic : any) => void ) =>{ 
        electron.ipcRenderer.on("statistics",(_ : any ,stats : any ) =>{
            callback(stats)
        })
       },
    getStaticData : () => electron.ipcRenderer.invoke('getStaticData'),
})