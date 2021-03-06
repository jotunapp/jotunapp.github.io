! function(a, b) {
    "function" == typeof define && define.amd ? define([], b) : "undefined" != typeof module && module.exports ? module.exports = b() : a.tv4 = b()
}(this, function() {
    function a(a) {
        return encodeURI(a).replace(/%25[0-9][0-9]/g, function(a) {
            return "%" + a.substring(3)
        })
    }
    function b(b) {
        var c = "";
        l[b.charAt(0)] && (c = b.charAt(0), b = b.substring(1));
        var d = "",
            e = "",
            f = !0,
            g = !1,
            h = !1;
        "+" === c ? f = !1 : "." === c ? (e = ".", d = ".") : "/" === c ? (e = "/", d = "/") : "#" === c ? (e = "#", f = !1) : ";" === c ? (e = ";", d = ";", g = !0, h = !0) : "?" === c ? (e = "?", d = "&", g = !0) : "&" === c && (e = "&", d = "&", g = !0);
        for (var i = [], j = b.split(","), k = [], n = {}, o = 0; o < j.length; o++) {
            var p = j[o],
                q = null;
            if (-1 !== p.indexOf(":")) {
                var r = p.split(":");
                p = r[0], q = parseInt(r[1], 10)
            }
            for (var s = {}; m[p.charAt(p.length - 1)];) s[p.charAt(p.length - 1)] = !0, p = p.substring(0, p.length - 1);
            var t = {
                truncate: q,
                name: p,
                suffices: s
            };
            k.push(t), n[p] = t, i.push(p)
        }
        var u = function(b) {
            for (var c = "", i = 0, j = 0; j < k.length; j++) {
                var l = k[j],
                    m = b(l.name);
                if (null === m || void 0 === m || Array.isArray(m) && 0 === m.length || "object" == typeof m && 0 === Object.keys(m).length) i++;
                else if (c += j === i ? e : d || ",", Array.isArray(m)) {
                    g && (c += l.name + "=");
                    for (var n = 0; n < m.length; n++) n > 0 && (c += l.suffices["*"] ? d || "," : ",", l.suffices["*"] && g && (c += l.name + "=")), c += f ? encodeURIComponent(m[n]).replace(/!/g, "%21") : a(m[n])
                } else if ("object" == typeof m) {
                    g && !l.suffices["*"] && (c += l.name + "=");
                    var o = !0;
                    for (var p in m) o || (c += l.suffices["*"] ? d || "," : ","), o = !1, c += f ? encodeURIComponent(p).replace(/!/g, "%21") : a(p), c += l.suffices["*"] ? "=" : ",", c += f ? encodeURIComponent(m[p]).replace(/!/g, "%21") : a(m[p])
                } else g && (c += l.name, h && "" === m || (c += "=")), null != l.truncate && (m = m.substring(0, l.truncate)), c += f ? encodeURIComponent(m).replace(/!/g, "%21") : a(m)
            }
            return c
        };
        return u.varNames = i, {
            prefix: e,
            substitution: u
        }
    }
    function c(a) {
        if (!(this instanceof c)) return new c(a);
        for (var d = a.split("{"), e = [d.shift()], f = [], g = [], h = []; d.length > 0;) {
            var i = d.shift(),
                j = i.split("}")[0],
                k = i.substring(j.length + 1),
                l = b(j);
            g.push(l.substitution), f.push(l.prefix), e.push(k), h = h.concat(l.substitution.varNames)
        }
        this.fill = function(a) {
            for (var b = e[0], c = 0; c < g.length; c++) {
                var d = g[c];
                b += d(a), b += e[c + 1]
            }
            return b
        }, this.varNames = h, this.template = a
    }
    function d(a, b) {
        if (a === b) return !0;
        if ("object" == typeof a && "object" == typeof b) {
            if (Array.isArray(a) !== Array.isArray(b)) return !1;
            if (Array.isArray(a)) {
                if (a.length !== b.length) return !1;
                for (var c = 0; c < a.length; c++) if (!d(a[c], b[c])) return !1
            } else {
                var e;
                for (e in a) if (void 0 === b[e] && void 0 !== a[e]) return !1;
                for (e in b) if (void 0 === a[e] && void 0 !== b[e]) return !1;
                for (e in a) if (!d(a[e], b[e])) return !1
            }
            return !0
        }
        return !1
    }
    function e(a) {
        var b = String(a).replace(/^\s+|\s+$/g, "").match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
        return b ? {
            href: b[0] || "",
            protocol: b[1] || "",
            authority: b[2] || "",
            host: b[3] || "",
            hostname: b[4] || "",
            port: b[5] || "",
            pathname: b[6] || "",
            search: b[7] || "",
            hash: b[8] || ""
        } : null
    }
    function f(a, b) {
        function c(a) {
            var b = [];
            return a.replace(/^(\.\.?(\/|$))+/, "").replace(/\/(\.(\/|$))+/g, "/").replace(/\/\.\.$/, "/../").replace(/\/?[^\/]*/g, function(a) {
                "/.." === a ? b.pop() : b.push(a)
            }), b.join("").replace(/^\//, "/" === a.charAt(0) ? "/" : "")
        }
        return b = e(b || ""), a = e(a || ""), b && a ? (b.protocol || a.protocol) + (b.protocol || b.authority ? b.authority : a.authority) + c(b.protocol || b.authority || "/" === b.pathname.charAt(0) ? b.pathname : b.pathname ? (a.authority && !a.pathname ? "/" : "") + a.pathname.slice(0, a.pathname.lastIndexOf("/") + 1) + b.pathname : a.pathname) + (b.protocol || b.authority || b.pathname ? b.search : b.search || a.search) + b.hash : null
    }
    function g(a) {
        return a.split("#")[0]
    }
    function h(a, b) {
        if (a && "object" == typeof a) if (void 0 === b ? b = a.id : "string" == typeof a.id && (b = f(b, a.id), a.id = b), Array.isArray(a)) for (var c = 0; c < a.length; c++) h(a[c], b);
        else {
            "string" == typeof a.$ref && (a.$ref = f(b, a.$ref));
            for (var d in a) "enum" !== d && h(a[d], b)
        }
    }
    function i(a, b, c, d, e, f) {
        if (Error.call(this), void 0 === a) throw new Error("No code supplied for error: " + b);
        this.message = b, this.params = c, this.code = a, this.dataPath = d || "", this.schemaPath = e || "", this.subErrors = f || null;
        var g = new Error(this.message);
        if (this.stack = g.stack || g.stacktrace, !this.stack) try {
            throw g
        } catch (g) {
            this.stack = g.stack || g.stacktrace
        }
    }
    function j(a, b) {
        if (b.substring(0, a.length) === a) {
            var c = b.substring(a.length);
            if (b.length > 0 && "/" === b.charAt(a.length - 1) || "#" === c.charAt(0) || "?" === c.charAt(0)) return !0
        }
        return !1
    }
    function k(a) {
        var b = new n,
            c = a || "en",
            d = {
                addFormat: function() {
                    b.addFormat.apply(b, arguments)
                },
                language: function(a) {
                    return a ? (u[a] || (a = a.split("-")[0]), u[a] ? (c = a, a) : !1) : c
                },
                addLanguage: function(a, b) {
                    var c;
                    for (c in q) b[c] && !b[q[c]] && (b[q[c]] = b[c]);
                    var d = a.split("-")[0];
                    if (u[d]) {
                        u[a] = Object.create(u[d]);
                        for (c in b) "undefined" == typeof u[d][c] && (u[d][c] = b[c]), u[a][c] = b[c]
                    } else u[a] = b, u[d] = b;
                    return this
                },
                freshApi: function(a) {
                    var b = k();
                    return a && b.language(a), b
                },
                validate: function(a, d, e, f) {
                    var g = new n(b, !1, u[c], e, f);
                    "string" == typeof d && (d = {
                        $ref: d
                    }), g.addSchema("", d);
                    var h = g.validateAll(a, d, null, null, "");
                    return !h && f && (h = g.banUnknownProperties()), this.error = h, this.missing = g.missing, this.valid = null === h, this.valid
                },
                validateResult: function() {
                    var a = {};
                    return this.validate.apply(a, arguments), a
                },
                validateMultiple: function(a, d, e, f) {
                    var g = new n(b, !0, u[c], e, f);
                    "string" == typeof d && (d = {
                        $ref: d
                    }), g.addSchema("", d), g.validateAll(a, d, null, null, ""), f && g.banUnknownProperties();
                    var h = {};
                    return h.errors = g.errors, h.missing = g.missing, h.valid = 0 === h.errors.length, h
                },
                addSchema: function() {
                    return b.addSchema.apply(b, arguments)
                },
                getSchema: function() {
                    return b.getSchema.apply(b, arguments)
                },
                getSchemaMap: function() {
                    return b.getSchemaMap.apply(b, arguments)
                },
                getSchemaUris: function() {
                    return b.getSchemaUris.apply(b, arguments)
                },
                getMissingUris: function() {
                    return b.getMissingUris.apply(b, arguments)
                },
                dropSchemas: function() {
                    b.dropSchemas.apply(b, arguments)
                },
                defineKeyword: function() {
                    b.defineKeyword.apply(b, arguments)
                },
                defineError: function(a, b, c) {
                    if ("string" != typeof a || !/^[A-Z]+(_[A-Z]+)*$/.test(a)) throw new Error("Code name must be a string in UPPER_CASE_WITH_UNDERSCORES");
                    if ("number" != typeof b || b % 1 !== 0 || 1e4 > b) throw new Error("Code number must be an integer > 10000");
                    if ("undefined" != typeof q[a]) throw new Error("Error already defined: " + a + " as " + q[a]);
                    if ("undefined" != typeof r[b]) throw new Error("Error code already used: " + r[b] + " as " + b);
                    q[a] = b, r[b] = a, t[a] = t[b] = c;
                    for (var d in u) {
                        var e = u[d];
                        e[a] && (e[b] = e[b] || e[a])
                    }
                },
                reset: function() {
                    b.reset(), this.error = null, this.missing = [], this.valid = !0
                },
                missing: [],
                error: null,
                valid: !0,
                normSchema: h,
                resolveUrl: f,
                getDocumentUri: g,
                errorCodes: q
            };
        return d
    }
    Object.keys || (Object.keys = function() {
        var a = Object.prototype.hasOwnProperty,
            b = !{
                toString: null
            }.propertyIsEnumerable("toString"),
            c = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
            d = c.length;
        return function(e) {
            if ("object" != typeof e && "function" != typeof e || null === e) throw new TypeError("Object.keys called on non-object");
            var f = [];
            for (var g in e) a.call(e, g) && f.push(g);
            if (b) for (var h = 0; d > h; h++) a.call(e, c[h]) && f.push(c[h]);
            return f
        }
    }()), Object.create || (Object.create = function() {
        function a() {}
        return function(b) {
            if (1 !== arguments.length) throw new Error("Object.create implementation only accepts one parameter.");
            return a.prototype = b, new a
        }
    }()), Array.isArray || (Array.isArray = function(a) {
        return "[object Array]" === Object.prototype.toString.call(a)
    }), Array.prototype.indexOf || (Array.prototype.indexOf = function(a) {
        if (null === this) throw new TypeError;
        var b = Object(this),
            c = b.length >>> 0;
        if (0 === c) return -1;
        var d = 0;
        if (arguments.length > 1 && (d = Number(arguments[1]), d !== d ? d = 0 : 0 !== d && 1 / 0 !== d && d !== -1 / 0 && (d = (d > 0 || -1) * Math.floor(Math.abs(d)))), d >= c) return -1;
        for (var e = d >= 0 ? d : Math.max(c - Math.abs(d), 0); c > e; e++) if (e in b && b[e] === a) return e;
        return -1
    }), Object.isFrozen || (Object.isFrozen = function(a) {
        for (var b = "tv4_test_frozen_key"; a.hasOwnProperty(b);) b += Math.random();
        try {
            return a[b] = !0, delete a[b], !1
        } catch (c) {
            return !0
        }
    });
    var l = {
        "+": !0,
        "#": !0,
        ".": !0,
        "/": !0,
        ";": !0,
        "?": !0,
        "&": !0
    }, m = {
        "*": !0
    };
    c.prototype = {
        toString: function() {
            return this.template
        },
        fillFromObject: function(a) {
            return this.fill(function(b) {
                return a[b]
            })
        }
    };
    var n = function(a, b, c, d, e) {
        if (this.missing = [], this.missingMap = {}, this.formatValidators = a ? Object.create(a.formatValidators) : {}, this.schemas = a ? Object.create(a.schemas) : {}, this.collectMultiple = b, this.errors = [], this.handleError = b ? this.collectError : this.returnError, d && (this.checkRecursive = !0, this.scanned = [], this.scannedFrozen = [], this.scannedFrozenSchemas = [], this.scannedFrozenValidationErrors = [], this.validatedSchemasKey = "tv4_validation_id", this.validationErrorsKey = "tv4_validation_errors_id"), e && (this.trackUnknownProperties = !0, this.knownPropertyPaths = {}, this.unknownPropertyPaths = {}), this.errorMessages = c, this.definedKeywords = {}, a) for (var f in a.definedKeywords) this.definedKeywords[f] = a.definedKeywords[f].slice(0)
    };
    n.prototype.defineKeyword = function(a, b) {
        this.definedKeywords[a] = this.definedKeywords[a] || [], this.definedKeywords[a].push(b)
    }, n.prototype.createError = function(a, b, c, d, e) {
        var f = this.errorMessages[a] || t[a];
        if ("string" != typeof f) return new i(a, "Unknown error code " + a + ": " + JSON.stringify(b), b, c, d, e);
        var g = f.replace(/\{([^{}]*)\}/g, function(a, c) {
            var d = b[c];
            return "string" == typeof d || "number" == typeof d ? d : a
        });
        return new i(a, g, b, c, d, e)
    }, n.prototype.returnError = function(a) {
        return a
    }, n.prototype.collectError = function(a) {
        return a && this.errors.push(a), null
    }, n.prototype.prefixErrors = function(a, b, c) {
        for (var d = a; d < this.errors.length; d++) this.errors[d] = this.errors[d].prefixWith(b, c);
        return this
    }, n.prototype.banUnknownProperties = function() {
        for (var a in this.unknownPropertyPaths) {
            var b = this.createError(q.UNKNOWN_PROPERTY, {
                path: a
            }, a, ""),
                c = this.handleError(b);
            if (c) return c
        }
        return null
    }, n.prototype.addFormat = function(a, b) {
        if ("object" == typeof a) {
            for (var c in a) this.addFormat(c, a[c]);
            return this
        }
        this.formatValidators[a] = b
    }, n.prototype.resolveRefs = function(a, b) {
        if (void 0 !== a.$ref) {
            if (b = b || {}, b[a.$ref]) return this.createError(q.CIRCULAR_REFERENCE, {
                urls: Object.keys(b).join(", ")
            }, "", "");
            b[a.$ref] = !0, a = this.getSchema(a.$ref, b)
        }
        return a
    }, n.prototype.getSchema = function(a, b) {
        var c;
        if (void 0 !== this.schemas[a]) return c = this.schemas[a], this.resolveRefs(c, b);
        var d = a,
            e = "";
        if (-1 !== a.indexOf("#") && (e = a.substring(a.indexOf("#") + 1), d = a.substring(0, a.indexOf("#"))), "object" == typeof this.schemas[d]) {
            c = this.schemas[d];
            var f = decodeURIComponent(e);
            if ("" === f) return this.resolveRefs(c, b);
            if ("/" !== f.charAt(0)) return void 0;
            for (var g = f.split("/").slice(1), h = 0; h < g.length; h++) {
                var i = g[h].replace(/~1/g, "/").replace(/~0/g, "~");
                if (void 0 === c[i]) {
                    c = void 0;
                    break
                }
                c = c[i]
            }
            if (void 0 !== c) return this.resolveRefs(c, b)
        }
        void 0 === this.missing[d] && (this.missing.push(d), this.missing[d] = d, this.missingMap[d] = d)
    }, n.prototype.searchSchemas = function(a, b) {
        if (Array.isArray(a)) for (var c = 0; c < a.length; c++) this.searchSchemas(a[c], b);
        else if (a && "object" == typeof a) {
            "string" == typeof a.id && j(b, a.id) && void 0 === this.schemas[a.id] && (this.schemas[a.id] = a);
            for (var d in a) if ("enum" !== d) if ("object" == typeof a[d]) this.searchSchemas(a[d], b);
            else if ("$ref" === d) {
                var e = g(a[d]);
                e && void 0 === this.schemas[e] && void 0 === this.missingMap[e] && (this.missingMap[e] = e)
            }
        }
    }, n.prototype.addSchema = function(a, b) {
        if ("string" != typeof a || "undefined" == typeof b) {
            if ("object" != typeof a || "string" != typeof a.id) return;
            b = a, a = b.id
        }
        a === g(a) + "#" && (a = g(a)), this.schemas[a] = b, delete this.missingMap[a], h(b, a), this.searchSchemas(b, a)
    }, n.prototype.getSchemaMap = function() {
        var a = {};
        for (var b in this.schemas) a[b] = this.schemas[b];
        return a
    }, n.prototype.getSchemaUris = function(a) {
        var b = [];
        for (var c in this.schemas)(!a || a.test(c)) && b.push(c);
        return b
    }, n.prototype.getMissingUris = function(a) {
        var b = [];
        for (var c in this.missingMap)(!a || a.test(c)) && b.push(c);
        return b
    }, n.prototype.dropSchemas = function() {
        this.schemas = {}, this.reset()
    }, n.prototype.reset = function() {
        this.missing = [], this.missingMap = {}, this.errors = []
    }, n.prototype.validateAll = function(a, b, c, d, e) {
        var f;
        if (b = this.resolveRefs(b), !b) return null;
        if (b instanceof i) return this.errors.push(b), b;
        var g, h = this.errors.length,
            j = null,
            k = null;
        if (this.checkRecursive && a && "object" == typeof a) {
            if (f = !this.scanned.length, a[this.validatedSchemasKey]) {
                var l = a[this.validatedSchemasKey].indexOf(b);
                if (-1 !== l) return this.errors = this.errors.concat(a[this.validationErrorsKey][l]), null
            }
            if (Object.isFrozen(a) && (g = this.scannedFrozen.indexOf(a), - 1 !== g)) {
                var m = this.scannedFrozenSchemas[g].indexOf(b);
                if (-1 !== m) return this.errors = this.errors.concat(this.scannedFrozenValidationErrors[g][m]), null
            }
            if (this.scanned.push(a), Object.isFrozen(a)) - 1 === g && (g = this.scannedFrozen.length, this.scannedFrozen.push(a), this.scannedFrozenSchemas.push([])), j = this.scannedFrozenSchemas[g].length, this.scannedFrozenSchemas[g][j] = b, this.scannedFrozenValidationErrors[g][j] = [];
            else {
                if (!a[this.validatedSchemasKey]) try {
                    Object.defineProperty(a, this.validatedSchemasKey, {
                        value: [],
                        configurable: !0
                    }), Object.defineProperty(a, this.validationErrorsKey, {
                        value: [],
                        configurable: !0
                    })
                } catch (n) {
                    a[this.validatedSchemasKey] = [], a[this.validationErrorsKey] = []
                }
                k = a[this.validatedSchemasKey].length, a[this.validatedSchemasKey][k] = b, a[this.validationErrorsKey][k] = []
            }
        }
        var o = this.errors.length,
            p = this.validateBasic(a, b, e) || this.validateNumeric(a, b, e) || this.validateString(a, b, e) || this.validateArray(a, b, e) || this.validateObject(a, b, e) || this.validateCombinations(a, b, e) || this.validateHypermedia(a, b, e) || this.validateFormat(a, b, e) || this.validateDefinedKeywords(a, b, e) || null;
        if (f) {
            for (; this.scanned.length;) {
                var q = this.scanned.pop();
                delete q[this.validatedSchemasKey]
            }
            this.scannedFrozen = [], this.scannedFrozenSchemas = []
        }
        if (p || o !== this.errors.length) for (; c && c.length || d && d.length;) {
            var r = c && c.length ? "" + c.pop() : null,
                s = d && d.length ? "" + d.pop() : null;
            p && (p = p.prefixWith(r, s)), this.prefixErrors(o, r, s)
        }
        return null !== j ? this.scannedFrozenValidationErrors[g][j] = this.errors.slice(h) : null !== k && (a[this.validationErrorsKey][k] = this.errors.slice(h)), this.handleError(p)
    }, n.prototype.validateFormat = function(a, b) {
        if ("string" != typeof b.format || !this.formatValidators[b.format]) return null;
        var c = this.formatValidators[b.format].call(null, a, b);
        return "string" == typeof c || "number" == typeof c ? this.createError(q.FORMAT_CUSTOM, {
            message: c
        }).prefixWith(null, "format") : c && "object" == typeof c ? this.createError(q.FORMAT_CUSTOM, {
            message: c.message || "?"
        }, c.dataPath || null, c.schemaPath || "/format") : null
    }, n.prototype.validateDefinedKeywords = function(a, b) {
        for (var c in this.definedKeywords) if ("undefined" != typeof b[c]) for (var d = this.definedKeywords[c], e = 0; e < d.length; e++) {
            var f = d[e],
                g = f(a, b[c], b);
            if ("string" == typeof g || "number" == typeof g) return this.createError(q.KEYWORD_CUSTOM, {
                key: c,
                message: g
            }).prefixWith(null, "format");
            if (g && "object" == typeof g) {
                var h = g.code || q.KEYWORD_CUSTOM;
                if ("string" == typeof h) {
                    if (!q[h]) throw new Error("Undefined error code (use defineError): " + h);
                    h = q[h]
                }
                var i = "object" == typeof g.message ? g.message : {
                    key: c,
                    message: g.message || "?"
                }, j = g.schemaPath || "/" + c.replace(/~/g, "~0").replace(/\//g, "~1");
                return this.createError(h, i, g.dataPath || null, j)
            }
        }
        return null
    }, n.prototype.validateBasic = function(a, b, c) {
        var d;
        return (d = this.validateType(a, b, c)) ? d.prefixWith(null, "type") : (d = this.validateEnum(a, b, c)) ? d.prefixWith(null, "type") : null
    }, n.prototype.validateType = function(a, b) {
        if (void 0 === b.type) return null;
        var c = typeof a;
        null === a ? c = "null" : Array.isArray(a) && (c = "array");
        var d = b.type;
        "object" != typeof d && (d = [d]);
        for (var e = 0; e < d.length; e++) {
            var f = d[e];
            if (f === c || "integer" === f && "number" === c && a % 1 === 0) return null
        }
        return this.createError(q.INVALID_TYPE, {
            type: c,
            expected: d.join("/")
        })
    }, n.prototype.validateEnum = function(a, b) {
        if (void 0 === b["enum"]) return null;
        for (var c = 0; c < b["enum"].length; c++) {
            var e = b["enum"][c];
            if (d(a, e)) return null
        }
        return this.createError(q.ENUM_MISMATCH, {
            value: "undefined" != typeof JSON ? JSON.stringify(a) : a
        })
    }, n.prototype.validateNumeric = function(a, b, c) {
        return this.validateMultipleOf(a, b, c) || this.validateMinMax(a, b, c) || this.validateNaN(a, b, c) || null
    };
    var o = Math.pow(2, - 51),
        p = 1 - o;
    n.prototype.validateMultipleOf = function(a, b) {
        var c = b.multipleOf || b.divisibleBy;
        if (void 0 === c) return null;
        if ("number" == typeof a) {
            var d = a / c % 1;
            if (d >= o && p > d) return this.createError(q.NUMBER_MULTIPLE_OF, {
                value: a,
                multipleOf: c
            })
        }
        return null
    }, n.prototype.validateMinMax = function(a, b) {
        if ("number" != typeof a) return null;
        if (void 0 !== b.minimum) {
            if (a < b.minimum) return this.createError(q.NUMBER_MINIMUM, {
                value: a,
                minimum: b.minimum
            }).prefixWith(null, "minimum");
            if (b.exclusiveMinimum && a === b.minimum) return this.createError(q.NUMBER_MINIMUM_EXCLUSIVE, {
                value: a,
                minimum: b.minimum
            }).prefixWith(null, "exclusiveMinimum")
        }
        if (void 0 !== b.maximum) {
            if (a > b.maximum) return this.createError(q.NUMBER_MAXIMUM, {
                value: a,
                maximum: b.maximum
            }).prefixWith(null, "maximum");
            if (b.exclusiveMaximum && a === b.maximum) return this.createError(q.NUMBER_MAXIMUM_EXCLUSIVE, {
                value: a,
                maximum: b.maximum
            }).prefixWith(null, "exclusiveMaximum")
        }
        return null
    }, n.prototype.validateNaN = function(a) {
        return "number" != typeof a ? null : isNaN(a) === !0 || 1 / 0 === a || a === -1 / 0 ? this.createError(q.NUMBER_NOT_A_NUMBER, {
            value: a
        }).prefixWith(null, "type") : null
    }, n.prototype.validateString = function(a, b, c) {
        return this.validateStringLength(a, b, c) || this.validateStringPattern(a, b, c) || null
    }, n.prototype.validateStringLength = function(a, b) {
        return "string" != typeof a ? null : void 0 !== b.minLength && a.length < b.minLength ? this.createError(q.STRING_LENGTH_SHORT, {
            length: a.length,
            minimum: b.minLength
        }).prefixWith(null, "minLength") : void 0 !== b.maxLength && a.length > b.maxLength ? this.createError(q.STRING_LENGTH_LONG, {
            length: a.length,
            maximum: b.maxLength
        }).prefixWith(null, "maxLength") : null
    }, n.prototype.validateStringPattern = function(a, b) {
        if ("string" != typeof a || void 0 === b.pattern) return null;
        var c = new RegExp(b.pattern);
        return c.test(a) ? null : this.createError(q.STRING_PATTERN, {
            pattern: b.pattern
        }).prefixWith(null, "pattern")
    }, n.prototype.validateArray = function(a, b, c) {
        return Array.isArray(a) ? this.validateArrayLength(a, b, c) || this.validateArrayUniqueItems(a, b, c) || this.validateArrayItems(a, b, c) || null : null
    }, n.prototype.validateArrayLength = function(a, b) {
        var c;
        return void 0 !== b.minItems && a.length < b.minItems && (c = this.createError(q.ARRAY_LENGTH_SHORT, {
            length: a.length,
            minimum: b.minItems
        }).prefixWith(null, "minItems"), this.handleError(c)) ? c : void 0 !== b.maxItems && a.length > b.maxItems && (c = this.createError(q.ARRAY_LENGTH_LONG, {
            length: a.length,
            maximum: b.maxItems
        }).prefixWith(null, "maxItems"), this.handleError(c)) ? c : null
    }, n.prototype.validateArrayUniqueItems = function(a, b) {
        if (b.uniqueItems) for (var c = 0; c < a.length; c++) for (var e = c + 1; e < a.length; e++) if (d(a[c], a[e])) {
            var f = this.createError(q.ARRAY_UNIQUE, {
                match1: c,
                match2: e
            }).prefixWith(null, "uniqueItems");
            if (this.handleError(f)) return f
        }
        return null
    }, n.prototype.validateArrayItems = function(a, b, c) {
        if (void 0 === b.items) return null;
        var d, e;
        if (Array.isArray(b.items)) {
            for (e = 0; e < a.length; e++) if (e < b.items.length) {
                if (d = this.validateAll(a[e], b.items[e], [e], ["items", e], c + "/" + e)) return d
            } else if (void 0 !== b.additionalItems) if ("boolean" == typeof b.additionalItems) {
                if (!b.additionalItems && (d = this.createError(q.ARRAY_ADDITIONAL_ITEMS, {}).prefixWith("" + e, "additionalItems"), this.handleError(d))) return d
            } else if (d = this.validateAll(a[e], b.additionalItems, [e], ["additionalItems"], c + "/" + e)) return d
        } else for (e = 0; e < a.length; e++) if (d = this.validateAll(a[e], b.items, [e], ["items"], c + "/" + e)) return d;
        return null
    }, n.prototype.validateObject = function(a, b, c) {
        return "object" != typeof a || null === a || Array.isArray(a) ? null : this.validateObjectMinMaxProperties(a, b, c) || this.validateObjectRequiredProperties(a, b, c) || this.validateObjectProperties(a, b, c) || this.validateObjectDependencies(a, b, c) || null
    }, n.prototype.validateObjectMinMaxProperties = function(a, b) {
        var c, d = Object.keys(a);
        return void 0 !== b.minProperties && d.length < b.minProperties && (c = this.createError(q.OBJECT_PROPERTIES_MINIMUM, {
            propertyCount: d.length,
            minimum: b.minProperties
        }).prefixWith(null, "minProperties"), this.handleError(c)) ? c : void 0 !== b.maxProperties && d.length > b.maxProperties && (c = this.createError(q.OBJECT_PROPERTIES_MAXIMUM, {
            propertyCount: d.length,
            maximum: b.maxProperties
        }).prefixWith(null, "maxProperties"), this.handleError(c)) ? c : null
    }, n.prototype.validateObjectRequiredProperties = function(a, b) {
        if (void 0 !== b.required) for (var c = 0; c < b.required.length; c++) {
            var d = b.required[c];
            if (void 0 === a[d]) {
                var e = this.createError(q.OBJECT_REQUIRED, {
                    key: d
                }).prefixWith(null, "" + c).prefixWith(null, "required");
                if (this.handleError(e)) return e
            }
        }
        return null
    }, n.prototype.validateObjectProperties = function(a, b, c) {
        var d;
        for (var e in a) {
            var f = c + "/" + e.replace(/~/g, "~0").replace(/\//g, "~1"),
                g = !1;
            if (void 0 !== b.properties && void 0 !== b.properties[e] && (g = !0, d = this.validateAll(a[e], b.properties[e], [e], ["properties", e], f))) return d;
            if (void 0 !== b.patternProperties) for (var h in b.patternProperties) {
                var i = new RegExp(h);
                if (i.test(e) && (g = !0, d = this.validateAll(a[e], b.patternProperties[h], [e], ["patternProperties", h], f))) return d
            }
            if (g) this.trackUnknownProperties && (this.knownPropertyPaths[f] = !0, delete this.unknownPropertyPaths[f]);
            else if (void 0 !== b.additionalProperties) {
                if (this.trackUnknownProperties && (this.knownPropertyPaths[f] = !0, delete this.unknownPropertyPaths[f]), "boolean" == typeof b.additionalProperties) {
                    if (!b.additionalProperties && (d = this.createError(q.OBJECT_ADDITIONAL_PROPERTIES, {}).prefixWith(e, "additionalProperties"), this.handleError(d))) return d
                } else if (d = this.validateAll(a[e], b.additionalProperties, [e], ["additionalProperties"], f)) return d
            } else this.trackUnknownProperties && !this.knownPropertyPaths[f] && (this.unknownPropertyPaths[f] = !0)
        }
        return null
    }, n.prototype.validateObjectDependencies = function(a, b, c) {
        var d;
        if (void 0 !== b.dependencies) for (var e in b.dependencies) if (void 0 !== a[e]) {
            var f = b.dependencies[e];
            if ("string" == typeof f) {
                if (void 0 === a[f] && (d = this.createError(q.OBJECT_DEPENDENCY_KEY, {
                    key: e,
                    missing: f
                }).prefixWith(null, e).prefixWith(null, "dependencies"), this.handleError(d))) return d
            } else if (Array.isArray(f)) for (var g = 0; g < f.length; g++) {
                var h = f[g];
                if (void 0 === a[h] && (d = this.createError(q.OBJECT_DEPENDENCY_KEY, {
                    key: e,
                    missing: h
                }).prefixWith(null, "" + g).prefixWith(null, e).prefixWith(null, "dependencies"), this.handleError(d))) return d
            } else if (d = this.validateAll(a, f, [], ["dependencies", e], c)) return d
        }
        return null
    }, n.prototype.validateCombinations = function(a, b, c) {
        return this.validateAllOf(a, b, c) || this.validateAnyOf(a, b, c) || this.validateOneOf(a, b, c) || this.validateNot(a, b, c) || null
    }, n.prototype.validateAllOf = function(a, b, c) {
        if (void 0 === b.allOf) return null;
        for (var d, e = 0; e < b.allOf.length; e++) {
            var f = b.allOf[e];
            if (d = this.validateAll(a, f, [], ["allOf", e], c)) return d
        }
        return null
    }, n.prototype.validateAnyOf = function(a, b, c) {
        if (void 0 === b.anyOf) return null;
        var d, e, f = [],
            g = this.errors.length;
        this.trackUnknownProperties && (d = this.unknownPropertyPaths, e = this.knownPropertyPaths);
        for (var h = !0, i = 0; i < b.anyOf.length; i++) {
            this.trackUnknownProperties && (this.unknownPropertyPaths = {}, this.knownPropertyPaths = {});
            var j = b.anyOf[i],
                k = this.errors.length,
                l = this.validateAll(a, j, [], ["anyOf", i], c);
            if (null === l && k === this.errors.length) {
                if (this.errors = this.errors.slice(0, g), this.trackUnknownProperties) {
                    for (var m in this.knownPropertyPaths) e[m] = !0, delete d[m];
                    for (var n in this.unknownPropertyPaths) e[n] || (d[n] = !0);
                    h = !1;
                    continue
                }
                return null
            }
            l && f.push(l.prefixWith(null, "" + i).prefixWith(null, "anyOf"))
        }
        return this.trackUnknownProperties && (this.unknownPropertyPaths = d, this.knownPropertyPaths = e), h ? (f = f.concat(this.errors.slice(g)), this.errors = this.errors.slice(0, g), this.createError(q.ANY_OF_MISSING, {}, "", "/anyOf", f)) : void 0
    }, n.prototype.validateOneOf = function(a, b, c) {
        if (void 0 === b.oneOf) return null;
        var d, e, f = null,
            g = [],
            h = this.errors.length;
        this.trackUnknownProperties && (d = this.unknownPropertyPaths, e = this.knownPropertyPaths);
        for (var i = 0; i < b.oneOf.length; i++) {
            this.trackUnknownProperties && (this.unknownPropertyPaths = {}, this.knownPropertyPaths = {});
            var j = b.oneOf[i],
                k = this.errors.length,
                l = this.validateAll(a, j, [], ["oneOf", i], c);
            if (null === l && k === this.errors.length) {
                if (null !== f) return this.errors = this.errors.slice(0, h), this.createError(q.ONE_OF_MULTIPLE, {
                    index1: f,
                    index2: i
                }, "", "/oneOf");
                if (f = i, this.trackUnknownProperties) {
                    for (var m in this.knownPropertyPaths) e[m] = !0, delete d[m];
                    for (var n in this.unknownPropertyPaths) e[n] || (d[n] = !0)
                }
            } else l && g.push(l)
        }
        return this.trackUnknownProperties && (this.unknownPropertyPaths = d, this.knownPropertyPaths = e), null === f ? (g = g.concat(this.errors.slice(h)), this.errors = this.errors.slice(0, h), this.createError(q.ONE_OF_MISSING, {}, "", "/oneOf", g)) : (this.errors = this.errors.slice(0, h), null)
    }, n.prototype.validateNot = function(a, b, c) {
        if (void 0 === b.not) return null;
        var d, e, f = this.errors.length;
        this.trackUnknownProperties && (d = this.unknownPropertyPaths, e = this.knownPropertyPaths, this.unknownPropertyPaths = {}, this.knownPropertyPaths = {});
        var g = this.validateAll(a, b.not, null, null, c),
            h = this.errors.slice(f);
        return this.errors = this.errors.slice(0, f), this.trackUnknownProperties && (this.unknownPropertyPaths = d, this.knownPropertyPaths = e), null === g && 0 === h.length ? this.createError(q.NOT_PASSED, {}, "", "/not") : null
    }, n.prototype.validateHypermedia = function(a, b, d) {
        if (!b.links) return null;
        for (var e, f = 0; f < b.links.length; f++) {
            var g = b.links[f];
            if ("describedby" === g.rel) {
                for (var h = new c(g.href), i = !0, j = 0; j < h.varNames.length; j++) if (!(h.varNames[j] in a)) {
                    i = !1;
                    break
                }
                if (i) {
                    var k = h.fillFromObject(a),
                        l = {
                            $ref: k
                        };
                    if (e = this.validateAll(a, l, [], ["links", f], d)) return e
                }
            }
        }
    };
    var q = {
        INVALID_TYPE: 0,
        ENUM_MISMATCH: 1,
        ANY_OF_MISSING: 10,
        ONE_OF_MISSING: 11,
        ONE_OF_MULTIPLE: 12,
        NOT_PASSED: 13,
        NUMBER_MULTIPLE_OF: 100,
        NUMBER_MINIMUM: 101,
        NUMBER_MINIMUM_EXCLUSIVE: 102,
        NUMBER_MAXIMUM: 103,
        NUMBER_MAXIMUM_EXCLUSIVE: 104,
        NUMBER_NOT_A_NUMBER: 105,
        STRING_LENGTH_SHORT: 200,
        STRING_LENGTH_LONG: 201,
        STRING_PATTERN: 202,
        OBJECT_PROPERTIES_MINIMUM: 300,
        OBJECT_PROPERTIES_MAXIMUM: 301,
        OBJECT_REQUIRED: 302,
        OBJECT_ADDITIONAL_PROPERTIES: 303,
        OBJECT_DEPENDENCY_KEY: 304,
        ARRAY_LENGTH_SHORT: 400,
        ARRAY_LENGTH_LONG: 401,
        ARRAY_UNIQUE: 402,
        ARRAY_ADDITIONAL_ITEMS: 403,
        FORMAT_CUSTOM: 500,
        KEYWORD_CUSTOM: 501,
        CIRCULAR_REFERENCE: 600,
        UNKNOWN_PROPERTY: 1e3
    }, r = {};
    for (var s in q) r[q[s]] = s;
    var t = {
        INVALID_TYPE: "Invalid type: {type} (expected {expected})",
        ENUM_MISMATCH: "No enum match for: {value}",
        ANY_OF_MISSING: 'Data does not match any schemas from "anyOf"',
        ONE_OF_MISSING: 'Data does not match any schemas from "oneOf"',
        ONE_OF_MULTIPLE: 'Data is valid against more than one schema from "oneOf": indices {index1} and {index2}',
        NOT_PASSED: 'Data matches schema from "not"',
        NUMBER_MULTIPLE_OF: "Value {value} is not a multiple of {multipleOf}",
        NUMBER_MINIMUM: "Value {value} is less than minimum {minimum}",
        NUMBER_MINIMUM_EXCLUSIVE: "Value {value} is equal to exclusive minimum {minimum}",
        NUMBER_MAXIMUM: "Value {value} is greater than maximum {maximum}",
        NUMBER_MAXIMUM_EXCLUSIVE: "Value {value} is equal to exclusive maximum {maximum}",
        NUMBER_NOT_A_NUMBER: "Value {value} is not a valid number",
        STRING_LENGTH_SHORT: "String is too short ({length} chars), minimum {minimum}",
        STRING_LENGTH_LONG: "String is too long ({length} chars), maximum {maximum}",
        STRING_PATTERN: "String does not match pattern: {pattern}",
        OBJECT_PROPERTIES_MINIMUM: "Too few properties defined ({propertyCount}), minimum {minimum}",
        OBJECT_PROPERTIES_MAXIMUM: "Too many properties defined ({propertyCount}), maximum {maximum}",
        OBJECT_REQUIRED: "Missing required property: {key}",
        OBJECT_ADDITIONAL_PROPERTIES: "Additional properties not allowed",
        OBJECT_DEPENDENCY_KEY: "Dependency failed - key must exist: {missing} (due to key: {key})",
        ARRAY_LENGTH_SHORT: "Array is too short ({length}), minimum {minimum}",
        ARRAY_LENGTH_LONG: "Array is too long ({length}), maximum {maximum}",
        ARRAY_UNIQUE: "Array items are not unique (indices {match1} and {match2})",
        ARRAY_ADDITIONAL_ITEMS: "Additional items not allowed",
        FORMAT_CUSTOM: "Format validation failed ({message})",
        KEYWORD_CUSTOM: "Keyword failed: {key} ({message})",
        CIRCULAR_REFERENCE: "Circular $refs: {urls}",
        UNKNOWN_PROPERTY: "Unknown property (not in schema)"
    };
    i.prototype = Object.create(Error.prototype), i.prototype.constructor = i, i.prototype.name = "ValidationError", i.prototype.prefixWith = function(a, b) {
        if (null !== a && (a = a.replace(/~/g, "~0").replace(/\//g, "~1"), this.dataPath = "/" + a + this.dataPath), null !== b && (b = b.replace(/~/g, "~0").replace(/\//g, "~1"), this.schemaPath = "/" + b + this.schemaPath), null !== this.subErrors) for (var c = 0; c < this.subErrors.length; c++) this.subErrors[c].prefixWith(a, b);
        return this
    };
    var u = {}, v = k();
    return v.addLanguage("en-gb", t), v.tv4 = v, v
});