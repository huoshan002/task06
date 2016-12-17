"use strict";




//addEventListener & attachEvent 兼容
function addEvent(elm, evType, fn, useCapture) {
    if (elm.addEventListener) {
        elm.addEventListener(evType, fn, useCapture); //DOM2.0
        return true;
    } else if (elm.attachEvent) {
        var r = elm.attachEvent("on" + evType, fn); //IE5+
        return r;
    } else {
        elm['on' + evType] = fn; //DOM 0
    }
}

var _skin = document.getElementById("skin_color");
var _skinAttr = _skin.getAttribute("href");
var _skinBtn = document.getElementById("skin_btn");

//换肤函数
function skinChange(name) {
    var _nameEnd = _skinAttr.indexOf(".");
    var _nameStart = _skinAttr.lastIndexOf("/", _nameEnd);
    var _location = _skinAttr.substring(_nameStart + 1, _nameEnd);
    var _activeLink = _skinAttr.replace(_location, name);
    _skin.href = _activeLink;
}

//点击换肤
addEvent(_skinBtn, "click", function (event) {
    var _target = event.srcElement || event.target;
    var _ele = _target.tagName;
    if (_ele == "A") {
        var _value = _target.id;
        skinChange(_value);
        setCookie("skin", _value);
    }
});

//设置cookies
function setCookie(name, value) {
    var _expire = new Date();
    _expire.setTime(_expire.setTime(_expire.getTime() + 365 * 24 * 60 * 60 * 1000));
    document.cookie = name + "=" + value + ";expires=" + _expire.toGMTString() + ";path=/";
    console.log(document.cookie);
}

//获取cookies
function getCookie(key) {
    if (document.cookie.length > 0) {
        var key_start = document.cookie.indexOf(key + "=");
        if (key_start != -1) {
            key_start = key_start + key.length + 1;
            var key_end = document.cookie.indexOf(";", key_start);
            if (key_end == -1) key_end = document.cookie.length;
            return unescape(document.cookie.substring(key_start, key_end));
        }
    }
    return "";
}

//检查cookies是否存在
function checkCookie(key) {
    key = getCookie(key);
    if (key != null && key != "") {
        skinChange(key);
    } else {
        return false;
    }
}

window.onload = function () {
    //浏览器运行的时候执行cookies检查
    checkCookie("skin");
};