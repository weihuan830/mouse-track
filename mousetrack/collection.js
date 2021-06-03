function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
if(!window.localStorage["userid"]){
    window.localStorage["userid"] = randomString(16, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
}
const userid = window.localStorage["userid"];
const collectionName = document.getElementById('script_mousetrack').getAttribute("collection");
const appname = document.getElementById('script_mousetrack').getAttribute("appname");
const appkey = document.getElementById('script_mousetrack').getAttribute("appkey");
const parseserver = document.getElementById('script_mousetrack').getAttribute("parseserver");
Parse.initialize(appname, appkey);
Parse.serverURL = parseserver

export var collection = {
    pool: [],
    poolsize: 60,
    static: {},
    init: function() {
        collection.getBrowser();
        collection.getOS();
    },
    accumulation(localevent) {
        let track = collection.defAttributes(localevent)
        for (let key in localevent) {
            if (typeof(localevent[key]) != "object") {
                track[key] = localevent[key];
            } else if (localevent[key] == ""){
                track[key] = "-";
            } else if (localevent[key] == true){
                track[key] = "True";
            }else if  (localevent[key] == false){
                track[key] = "False";
            }
        }
        collection.pool.push(new Parse.Object(collectionName, track))
        if (collection.pool.length >= collection.poolsize) {
            collection.submitData();
            collection.pool = []
        }
    },
    submitData() {
        Parse.Object.saveAll(collection.pool)
            .then(function() {
                console.log("Success");
            })
            .catch(function(e) {
                alert("Error saving test object!" + e.message);
            });
    },
    defAttributes(localevent) {
        let track = {}
        track['d_path'] = collection.getElementPathByEvent(localevent);
        track['d_userid'] = userid;
        track['d_osVersion'] = collection.static.OS;  
        track['d_browser'] = collection.static.Browser || "unknown";
        track['d_timestamp'] = (new Date()).getTime();
        track["d_url"] = window.location.href;
        track["d_clientWidth"] = localevent.srcElement.clientWidth;
        track["d_clientHeight"] = localevent.srcElement.clientHeight;
        return track;
    },
    getElementPathByEvent: function(event) {
        let target = event.target;
        if(!target || target.classList==undefined){
            return ""
        }
        let pathstr = "," + (target.tagName || "") + "#" + (target.id||"") + "." + target.classList.value.replace(/ /g, ".");
        for (; target.parentElement != null;) {
            target = target.parentElement;
            pathstr = "," + target.tagName + "#" + target.id + "." + target.classList.value.replace(/ /g, ".") + pathstr;
        }
        return pathstr.slice(1);
    },
    getTouchable: function() {
        collection.static.hasTouch = 'ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch || navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0;
    },
    getOS: function() {
        collection.static.OS = navigator.appVersion.match(/\(.+?\)/)[0].replace(/[\(\)]/g, "");
    },
    getBrowser: function() {
        /* Browser name */
        var ua = navigator.userAgent,
            tem,
            M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE ' + (tem[1] || '');
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
            if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
        collection.static.Browser = M.join(' ');
    }
}

collection.init()