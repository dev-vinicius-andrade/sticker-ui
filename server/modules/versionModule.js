function GetVersionObject(version){
    return JSON.stringify({
        version: version,
        date: new Date().toISOString()
    });
}
module.exports = {
    getVersion: function(debugEnvironmentName) {
        if(process.env.NODE_ENV === debugEnvironmentName)
            return GetVersionObject('debug');
        else
            return GetVersionObject( process.env.CURRENT_VERSION ?? '1.0.0');
    }
}