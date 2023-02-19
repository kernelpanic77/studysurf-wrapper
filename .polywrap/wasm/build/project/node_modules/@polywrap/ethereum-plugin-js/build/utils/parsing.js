"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepForStringify = exports.parseResult = exports.constructAbi = exports.parseArgs = void 0;
function parseArgs(args) {
    if (!args) {
        return [];
    }
    return args.map(function (arg) {
        return (arg.startsWith("[") && arg.endsWith("]")) ||
            (arg.startsWith("{") && arg.endsWith("}"))
            ? JSON.parse(arg)
            : arg;
    });
}
exports.parseArgs = parseArgs;
function constructAbi(method) {
    var abi;
    try {
        abi = JSON.parse(method);
        if (!(abi instanceof Array)) {
            abi = [abi];
        }
    }
    catch (e) {
        abi = [method];
    }
    return abi;
}
exports.constructAbi = constructAbi;
function parseResult(result) {
    var prep = prepForStringify(result);
    if (typeof prep === "string") {
        return prep;
    }
    else {
        return JSON.stringify(prep);
    }
}
exports.parseResult = parseResult;
function prepForStringify(value) {
    var e_1, _a;
    if (Array.isArray(value)) {
        var prepared = [];
        try {
            for (var value_1 = __values(value), value_1_1 = value_1.next(); !value_1_1.done; value_1_1 = value_1.next()) {
                var item = value_1_1.value;
                prepared.push(prepForStringify(item));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (value_1_1 && !value_1_1.done && (_a = value_1.return)) _a.call(value_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return prepared;
    }
    else if (typeof value === "object" &&
        typeof value.toString === "function") {
        return value.toString();
    }
    else {
        return value;
    }
}
exports.prepForStringify = prepForStringify;
//# sourceMappingURL=parsing.js.map