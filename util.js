function toNearest(num,tickSize) {
    var tickDec = parseFloat(tickSize);
    return Math.round(num/tickDec) * tickDec;
}