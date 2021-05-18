/**
 * 度换成弧度
 * @param  {Float} d  度
 * @return {[Float}   弧度
 */
function rad(d) {
  return d * Math.PI / 180.0
}
/**
 * 弧度换成度
 * @param  {Float} x 弧度
 * @return {Float}   度
 */
function deg(x) {
  return x * 180 / Math.PI
}
/**
 *
 * @param {*} lng 经度 113.3960698
 * @param {*} lat 纬度 22.941386
 * @param {*} brng 方位角 45   ---- 正北方：000°或360°  正东方：090° 正南方：180°  正西方：270°
 * @param {*} dist 距离 9000
 *
*/
export function getLonAndLat(lng, lat, brng, dist) {
  // 大地坐标系资料WGS-84 长半径a=6378137 短半径b=6356752.3142 扁率f=1/298.2572236
  var a = 6378137
  var b = 6356752.3142
  var f = 1 / 298.257223563

  var lon1 = lng * 1
  var lat1 = lat * 1
  var s = dist
  var alpha1 = rad(brng)
  var sinAlpha1 = Math.sin(alpha1)
  var cosAlpha1 = Math.cos(alpha1)

  var tanU1 = (1 - f) * Math.tan(rad(lat1))
  var cosU1 = 1 / Math.sqrt((1 + tanU1 * tanU1)); var sinU1 = tanU1 * cosU1
  var sigma1 = Math.atan2(tanU1, cosAlpha1)
  var sinAlpha = cosU1 * sinAlpha1
  var cosSqAlpha = 1 - sinAlpha * sinAlpha
  var uSq = cosSqAlpha * (a * a - b * b) / (b * b)
  var A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)))
  var B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)))

  var sigma = s / (b * A); var sigmaP = 2 * Math.PI
  while (Math.abs(sigma - sigmaP) > 1e-12) {
    var cos2SigmaM = Math.cos(2 * sigma1 + sigma)
    var sinSigma = Math.sin(sigma)
    var cosSigma = Math.cos(sigma)
    var deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) -
      B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)))
    sigmaP = sigma
    sigma = s / (b * A) + deltaSigma
  }

  var tmp = sinU1 * sinSigma - cosU1 * cosSigma * cosAlpha1
  var lat2 = Math.atan2(sinU1 * cosSigma + cosU1 * sinSigma * cosAlpha1,
    (1 - f) * Math.sqrt(sinAlpha * sinAlpha + tmp * tmp))
  var lambda = Math.atan2(sinSigma * sinAlpha1, cosU1 * cosSigma - sinU1 * sinSigma * cosAlpha1)
  var C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha))
  var L = lambda - (1 - C) * f * sinAlpha *
    (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)))

  var revAz = Math.atan2(sinAlpha, -tmp) // final bearing

  var lngLatObj = { lng: lon1 + deg(L), lat: deg(lat2) }
  return lngLatObj
}

