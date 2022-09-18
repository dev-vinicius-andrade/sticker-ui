const override = require("environment-override").override;
module.exports = {
    getConfig: function (configPath, debugEnvironmentName='debug',configPropertyEnvironmentVariablePrefix='ENV_', showOverrides=false) {
        console.log(`Running with environment ${process.env.NODE_ENV}`);
        const config = require(configPath);
        if(process.env.NODE_ENV === debugEnvironmentName){
            console.log(`Running configuration without overrides`);
            return config;
        }
        override(config, configPropertyEnvironmentVariablePrefix,showOverrides);
        return config;
    }
}