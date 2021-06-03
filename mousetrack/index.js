import { collection } from './collection.js';

export var mousetrack = {
    config: {
        ele: null,
        mouseEvents: ["mousemove", "mousedown", "mouseleave", "mouseenter", "mouseup", "mouseover", "mouseout", "mousewheel", "select", "wheel", "contextmenu"],
        windowEvent: ["blur", "focus"],
        documentEvent: ["keypress", "paste", "copy", "cut"],
    },
    init() {
        mousetrack.config.ele = document.getElementsByTagName("html")[0]
        mousetrack.setWindowEvent()
        mousetrack.setDocumentEvent()
        mousetrack.setMouseEvent()
    },
    throttle(callback, limit) {
        var tick = false;
        return function () {
            if (!tick) {
                callback.call();
                tick = true;
                setTimeout(function () {
                    tick = false;
                }, limit);
            }
        }
    },
    setWindowEvent() {
        mousetrack.config.windowEvent.forEach(element => {
            window.addEventListener(element, function (e) {
                collection.accumulation(e)
            });
        });
        window.onbeforeunload = function(e){
            collection.accumulation(e)
            collection.submitData();
        }
    },
    setDocumentEvent() {
        mousetrack.config.documentEvent.forEach(element => {
            document.addEventListener(element, function (e) {
                collection.accumulation(e)
            });
        });
    },
    setMouseEvent(localelement) {
        if (!localelement) {
            localelement = window;
        }
        mousetrack.config.mouseEvents.forEach(element => {
            if (typeof (element) == "string") {
                localelement.addEventListener(element, function (e) {
                    collection.accumulation(e)
                })
            } else {
                localelement.addEventListener(element, mousetrack.throttle(function (e) {
                    collection.accumulation(e)
                }, element[1]));
            }
        });
    }
}
mousetrack.init()