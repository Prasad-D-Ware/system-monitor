type Statistics = {
    cpuUsage : number,
    ramUsage :number,
    storageUsage : number
}

type StaticData = {
    totalStorage : number,
    cpuModel : string,
    totalMemoryGB : number
}


interface Window{
    electron : {
        subscribeStatistic : (callback : (statistics : Statistics) => void ) => UnsubscribeFunction;
        getStaticData : () => Promise<StaticData>
    }
}

type EvenetPayloadMapping = {
    statistics : Statistics,
    getStaticData : StaticData
}


type UnsubscribeFunction = () => void;