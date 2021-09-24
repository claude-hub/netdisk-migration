function o(e, t) {
    var n = (65535 & e) + (65535 & t);
    return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n
}
function a(e, t, n, r, i, a) {
    return o((s = o(o(t, e), o(r, a))) << (c = i) | s >>> 32 - c, n);
    var s, c
    }
function s(e, t, n, r, i, o, s) {
    return a(t & n | ~t & r, e, t, i, o, s)
}
function c(e, t, n, r, i, o, s) {
    return a(t & r | n & ~r, e, t, i, o, s)
}
function l(e, t, n, r, i, o, s) {
    return a(t ^ n ^ r, e, t, i, o, s)
}
function u(e, t, n, r, i, o, s) {
    return a(n ^ (t | ~r), e, t, i, o, s)
}
function d(e, t) {
    var n, r, i, a, d;
    e[t >> 5] |= 128 << t % 32,
        e[14 + (t + 64 >>> 9 << 4)] = t;
    var f = 1732584193
    , p = -271733879
    , h = -1732584194
    , A = 271733878;
    for (n = 0; n < e.length; n += 16)
        r = f,
            i = p,
            a = h,
            d = A,
            f = s(f, p, h, A, e[n], 7, -680876936),
            A = s(A, f, p, h, e[n + 1], 12, -389564586),
            h = s(h, A, f, p, e[n + 2], 17, 606105819),
            p = s(p, h, A, f, e[n + 3], 22, -1044525330),
            f = s(f, p, h, A, e[n + 4], 7, -176418897),
            A = s(A, f, p, h, e[n + 5], 12, 1200080426),
            h = s(h, A, f, p, e[n + 6], 17, -1473231341),
            p = s(p, h, A, f, e[n + 7], 22, -45705983),
            f = s(f, p, h, A, e[n + 8], 7, 1770035416),
            A = s(A, f, p, h, e[n + 9], 12, -1958414417),
            h = s(h, A, f, p, e[n + 10], 17, -42063),
            p = s(p, h, A, f, e[n + 11], 22, -1990404162),
            f = s(f, p, h, A, e[n + 12], 7, 1804603682),
            A = s(A, f, p, h, e[n + 13], 12, -40341101),
            h = s(h, A, f, p, e[n + 14], 17, -1502002290),
            f = c(f, p = s(p, h, A, f, e[n + 15], 22, 1236535329), h, A, e[n + 1], 5, -165796510),
            A = c(A, f, p, h, e[n + 6], 9, -1069501632),
            h = c(h, A, f, p, e[n + 11], 14, 643717713),
            p = c(p, h, A, f, e[n], 20, -373897302),
            f = c(f, p, h, A, e[n + 5], 5, -701558691),
            A = c(A, f, p, h, e[n + 10], 9, 38016083),
            h = c(h, A, f, p, e[n + 15], 14, -660478335),
            p = c(p, h, A, f, e[n + 4], 20, -405537848),
            f = c(f, p, h, A, e[n + 9], 5, 568446438),
            A = c(A, f, p, h, e[n + 14], 9, -1019803690),
            h = c(h, A, f, p, e[n + 3], 14, -187363961),
            p = c(p, h, A, f, e[n + 8], 20, 1163531501),
            f = c(f, p, h, A, e[n + 13], 5, -1444681467),
            A = c(A, f, p, h, e[n + 2], 9, -51403784),
            h = c(h, A, f, p, e[n + 7], 14, 1735328473),
            f = l(f, p = c(p, h, A, f, e[n + 12], 20, -1926607734), h, A, e[n + 5], 4, -378558),
            A = l(A, f, p, h, e[n + 8], 11, -2022574463),
            h = l(h, A, f, p, e[n + 11], 16, 1839030562),
            p = l(p, h, A, f, e[n + 14], 23, -35309556),
            f = l(f, p, h, A, e[n + 1], 4, -1530992060),
            A = l(A, f, p, h, e[n + 4], 11, 1272893353),
            h = l(h, A, f, p, e[n + 7], 16, -155497632),
            p = l(p, h, A, f, e[n + 10], 23, -1094730640),
            f = l(f, p, h, A, e[n + 13], 4, 681279174),
            A = l(A, f, p, h, e[n], 11, -358537222),
            h = l(h, A, f, p, e[n + 3], 16, -722521979),
            p = l(p, h, A, f, e[n + 6], 23, 76029189),
            f = l(f, p, h, A, e[n + 9], 4, -640364487),
            A = l(A, f, p, h, e[n + 12], 11, -421815835),
            h = l(h, A, f, p, e[n + 15], 16, 530742520),
            f = u(f, p = l(p, h, A, f, e[n + 2], 23, -995338651), h, A, e[n], 6, -198630844),
            A = u(A, f, p, h, e[n + 7], 10, 1126891415),
            h = u(h, A, f, p, e[n + 14], 15, -1416354905),
            p = u(p, h, A, f, e[n + 5], 21, -57434055),
            f = u(f, p, h, A, e[n + 12], 6, 1700485571),
            A = u(A, f, p, h, e[n + 3], 10, -1894986606),
            h = u(h, A, f, p, e[n + 10], 15, -1051523),
            p = u(p, h, A, f, e[n + 1], 21, -2054922799),
            f = u(f, p, h, A, e[n + 8], 6, 1873313359),
            A = u(A, f, p, h, e[n + 15], 10, -30611744),
            h = u(h, A, f, p, e[n + 6], 15, -1560198380),
            p = u(p, h, A, f, e[n + 13], 21, 1309151649),
            f = u(f, p, h, A, e[n + 4], 6, -145523070),
            A = u(A, f, p, h, e[n + 11], 10, -1120210379),
            h = u(h, A, f, p, e[n + 2], 15, 718787259),
            p = u(p, h, A, f, e[n + 9], 21, -343485551),
            f = o(f, r),
            p = o(p, i),
            h = o(h, a),
            A = o(A, d);
    return [f, p, h, A]
}
function f(e) {
    var t, n = "", r = 32 * e.length;
    for (t = 0; t < r; t += 8)
        n += String.fromCharCode(e[t >> 5] >>> t % 32 & 255);
    return n
}
function p(e) {
    var t, n = [];
    for (n[(e.length >> 2) - 1] = void 0,
         t = 0; t < n.length; t += 1)
        n[t] = 0;
    var r = 8 * e.length;
    for (t = 0; t < r; t += 8)
        n[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
    return n
}
function h(e) {
    var t, n, r = "0123456789abcdef", i = "";
    for (n = 0; n < e.length; n += 1)
        t = e.charCodeAt(n),
            i += r.charAt(t >>> 4 & 15) + r.charAt(15 & t);
    return i
}
function A(e) {
    return unescape(encodeURIComponent(e))
}
function m(e) {
    return function(e) {
        return f(d(p(e), 8 * e.length))
    }(A(e))
}
function g(e, t) {
    return function(e, t) {
        var n, r, i = p(e), o = [], a = [];
        for (o[15] = a[15] = void 0,
            i.length > 16 && (i = d(i, 8 * e.length)),
            n = 0; n < 16; n += 1)
            o[n] = 909522486 ^ i[n],
                a[n] = 1549556828 ^ i[n];
        return r = d(o.concat(p(t)), 512 + 8 * t.length),
            f(d(a.concat(r), 640))
    }(A(e), A(t))
}
