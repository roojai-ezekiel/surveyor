'use strict'
/*
*   Dev : Aung Kyaw Nyunt ( Kevin )
*   Purpose : to optimize and reduce dependence
*   Rely on :
*   Effected on :
*        /config.xml
*        /google-services.json  ( will not produce for ios command)
*        /GoogleService-Info.plist ( will not produce for android command )
*        /src/components/GlobalVariableClaim.vue
*        /src/components/GlobalVariable.vue
*/

let fs = require('fs')

const Colors ={
    "Reset" : "\x1b[0m",
    "Bright" : "\x1b[1m",
    "Dim" : "\x1b[2m",
    "Underscore" : "\x1b[4m",
    "Blink" : "\x1b[5m",
    "Reverse" : "\x1b[7m",
    "Hidden" : "\x1b[8m",

    "FgBlack" : "\x1b[30m",
    "FgRed" : "\x1b[31m",
    "FgGreen" : "\x1b[32m",
    "FgYellow" : "\x1b[33m",
    "FgBlue" : "\x1b[34m",
    "FgMagenta" : "\x1b[35m",
    "FgCyan" : "\x1b[36m",
    "FgWhite" : "\x1b[37m",
    "FgGray" : "\x1b[90m",

    "BgBlack" : "\x1b[40m",
    "BgRed" : "\x1b[41m",
    "BgGreen" : "\x1b[42m",
    "BgYellow" : "\x1b[43m",
    "BgBlue" : "\x1b[44m",
    "BgMagenta" : "\x1b[45m",
    "BgCyan" : "\x1b[46m",
    "BgWhite" : "\x1b[47m",
    "BgGray" : "\x1b[100m"
}

class Configure{
    // uat or production ( it will come from command line )
    #environment = "uat"
    #validEnvironment = ["uat","production","local"]
    // android or ios ( it will come from command line )
    #platform = "android" 
    #validPlatform = ["android","ios"] 
    #configData = null

    constructor(){
        if(process.argv.length!=4){
            console.log(`${Colors.FgRed}Invalid command to execute.${Colors.Reset}`)
            this.help();
        }
        else{
            if(!this.#validEnvironment.includes(process.argv[2]) || !this.#validPlatform.includes(process.argv[3])){
                console.log("Invalid command to execute,")
                this.help();
                return;
            }
            else{
                [,,this.#environment,this.#platform] = process.argv
            }
            // time to execute
            this.#configData = require('./main-config.js')(this.#environment,this.#platform);
            this.init(this.#environment,this.#platform);
        }
    }

    async generateFile(_source,_destination,_data,_env,_msg){
        /*
            _source : template file location
            _destination : output file location
            _data : json from main-confi.json file
        */
        return new Promise((resolve)=>{
            fs.readFile(_source, 'utf8', function (err,context) {
                if (err) { return resolve(err) }
                
                for(const row in _data){
                    context = context.replace(new RegExp("\{"+row.split('.').join('\.')+"\}",'g'), _data[row][_env]);
                }
                fs.writeFile(_destination, context, 'utf8',  (err)=> resolve(err || _msg));
              });
        });
    }

    help(){
        console.log(`valid command : ${Colors.FgYellow} npm run configure:<environment> <platform>  ${Colors.Reset}`);
        console.log(`example for android : ${Colors.FgYellow}npm run configure:uat android ${Colors.Reset}`);
        console.log(`example for ios :${Colors.FgYellow} npm run configure:uat ios ${Colors.Reset}`);
    }

    init(_env,_platform){
       (async ()=>{
            let promiseConfigList = [
                {
                    "source":"./configure/templates/config.xml",
                    "destination": "config.xml",
                    "data":this.#configData["config.xml"],
                    "message":`${Colors.FgGreen}Successfully Generated ${Colors.FgYellow}config.xml${Colors.FgGreen} file${Colors.Reset}`   
                },
                {
                    "source":  "./configure/templates/" + (_platform=="android" ?"google-services.json":"GoogleService-Info.plist"),
                    "destination": _platform=="android" ? "google-services.json" : "GoogleService-Info.plist",
                    "data":this.#configData[ _platform=="android" ? "google-services.json":"GoogleService-Info.plist"],
                    "message": _platform=="android" ? `${Colors.FgGreen}Successfully Generated ${Colors.FgYellow}google-services.json${Colors.FgGreen} file${Colors.Reset}`  
                    : 
                    `${Colors.FgGreen}Successfully Generated ${Colors.FgYellow}GoogleService-Info.plist${Colors.FgGreen} file${Colors.Reset}`  
                },
                {
                    "source":"./configure/templates/GlobalVariable.vue",
                    "destination": "src/components/GlobalVariable.vue",
                    "data":this.#configData["GlobalVariable.vue"],
                    "message":`${Colors.FgGreen}Successfully Generated ${Colors.FgYellow}GlobalVariable.vue${Colors.FgGreen} file${Colors.Reset}`  
                }
            ].map(list=>{
                return  this.generateFile(list.source, list.destination, list.data, _env, list.message)
            })
            Promise.all(promiseConfigList).then(x => {
                x.forEach(elm=>console.log(elm)) 
                console.log(Colors.FgBlue+'Done! \x1b[0m');
            })
            
        })();
    }
}

(new Configure());