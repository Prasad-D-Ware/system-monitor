const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron",{
    subscribeStatistic : (callback) =>{ 
        ipcOn('statistics',(stats) =>{
            callback(stats)
        })
       },
    getStaticData : () => ipcInvoke('getStaticData'),
} satisfies Window["electron"])


function ipcInvoke <Key extends keyof EvenetPayloadMapping>(key : Key) {
    return electron.ipcRenderer.invoke(key)
}

function ipcOn<Key extends keyof EvenetPayloadMapping>( key:Key, callback : (payload : EvenetPayloadMapping[Key])=>void 
){
    electron.ipcRenderer.on(key, (_ : any ,payload : any) => callback(payload))
}