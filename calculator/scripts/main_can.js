calculator = {
    numberContentA: [],
    numberContentB: [],
    operationContent: []
};


var _display = document.getElementById("display");
var _opeDisplay = document.getElementById("operator");

var _numberBtn = document.getElementById("number_container");
var _operationBtn = document.getElementById("operate_container");
var _specialBtn = document.getElementById("special_container");
var _computerBtn = document.getElementById("calculation");


//addEventListener & attachEvent 兼容
function addEvent(elm, evType, fn, useCapture) {
    if (elm.addEventListener) {
        elm.addEventListener(evType, fn, useCapture);//DOM2.0
        return true;
    }
    else if (elm.attachEvent) {
        var r = elm.attachEvent("on" + evType, fn);//IE5+
        return r;
    }
    else {
        elm['on' + evType] = fn;//DOM 0
    }
}

//监听点击的数字
addEvent( _numberBtn, "click" ,function (event) {
    //获取点击元素

    var _targetElement = event.srcElement || event.target;
    if (_targetElement.tagName == "INPUT") {
        var _targetValue = _targetElement.value;

        //判断运算符是否点击，点击就把数字放到B中
        if (calculator.operationContent.length == 1) {

            //判断是否已输入小数点
            if (_targetValue == "." && calculator.numberContentB.indexOf(".") > -1) {

                return false;

            } else {

                calculator.numberContentB += _targetValue;
                _display.innerHTML = calculator.numberContentB;

            }


        } else {

            //判断是否已输入小数点
            if (_targetValue == "." && calculator.numberContentA.indexOf(".") > -1) {

                return false;

            } else {
                calculator.numberContentA += _targetValue;
                _display.innerHTML = calculator.numberContentA;
            }
        }

    }


});


//科学计算
addEvent(_specialBtn ,"click", function (event) {
    var _targetElement = event.srcElement || event.target;
    if (_targetElement.tagName == "INPUT") {
        var _targetValue = _targetElement.value;
    }

    if (_targetValue == "PI") {

        _display.innerHTML = Math.PI.toFixed(8);
        return false;

    }


    if (calculator.numberContentA == "") {

        _display.innerHTML = "请输入数字！"

    } else {

        switch (_targetValue) {

            case "sin":
                result = Math.sin(parseFloat(calculator.numberContentA)).toFixed(6);
                break;

            case "cos":
                result = Math.cos(parseFloat(calculator.numberContentA)).toFixed(6);
                break;

            case "tan":
                result = Math.tan(parseFloat(calculator.numberContentA)).toFixed(6);
                break;

            case "log":
                result = Math.log(parseFloat(calculator.numberContentA)).toFixed(6);
                break;

            case "√":
                result = Math.sqrt(parseFloat(calculator.numberContentA)).toFixed(6);
                break;

            default:
                result = 0;
                break;

        }


        _display.innerHTML = result;
    }


})


//监听点击运算符
addEvent(_operationBtn,"click", function (event) {
    //获取点击元素
    var _targetElement = event.srcElement || event.target;
    if (_targetElement.tagName == "INPUT") {
        var _targetValue = _targetElement.value;
    }

    if (calculator.numberContentA == "" && _targetValue == "-") {
        calculator.numberContentA = _targetValue;
        _display.innerHTML = calculator.numberContentA;
    } else {
        calculator.operationContent = _targetValue;
        _opeDisplay.innerHTML = calculator.operationContent;
    }

})


addEvent(_computerBtn,"click", function (event) {
    //判断运算符是否为空
    if (calculator.operationContent.length == 0) {
        return false;
    }

    if (calculator.numberContentA == "" ||calculator.numberContentB == ""){
        _display.innerHTML = "请输入数字！";
        return false;
    }

    //判断除数是否为0
    if (calculator.operationContent == "/" && calculator.numberContentB == "0") {
        _display.innerHTML = "除数不能为0";
        return false;
    }

    var result;
    switch (calculator.operationContent) {

        case "+":
            result = parseFloat(calculator.numberContentA) + parseFloat(calculator.numberContentB);
            break;

        case "-":
            result = parseFloat(calculator.numberContentA) - parseFloat(calculator.numberContentB);
            break;

        case "*":
            result = parseFloat(calculator.numberContentA) * parseFloat(calculator.numberContentB);
            break;

        case "/":
            result = parseFloat(calculator.numberContentA) / parseFloat(calculator.numberContentB);
            break;

        default:
            result = 0;
            break;
    }

    //显示结果
    _display.innerHTML = parseFloat(result).toFixed(1);

})


//清除显示
var cleanBtn = document.getElementById("clean_display");
cleanBtn.onclick = function () {
    calculator.numberContentA = [];
    calculator.numberContentB = [];
    calculator.operationContent = [];
    _display.innerHTML = 0;
    _opeDisplay.innerHTML = "";
}
