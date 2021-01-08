// 划线
export function drowLine(map, PointArr, PointArrNext) {
  if (PointArrNext != undefined) {
    var polyline = new BMapGL.Polyline(
      [
        new BMapGL.Point(PointArr.lng, PointArr.lat),
        new BMapGL.Point(PointArrNext.lng, PointArrNext.lat)
      ],
      {
        strokeColor: "red",
        strokeWeight: 7,
        strokeOpacity: 1
      });   //创建折线
    map.addOverlay(polyline);
    addMarkerEnd(new BMapGL.Point(PointArrNext.lng, PointArrNext.lat), '小车行驶', map, PointArrNext, new BMapGL.Point(PointArr.lng, PointArr.lat));//添加图标
  } else {
    addMarkerEnd(new BMapGL.Point(PointArr.lng, PointArr.lat), '终点', map);//添加终点图标
  }
}
//添加起始图标
export function addStartMarker(point, name, mapInit) {
  if (name == "起点") {
    var myIcon = new BMapGL.Icon("https://www.youbaobao.xyz/datav-res/datav/location.png", new BMapGL.Size(45, 45), {
      anchor: new BMapGL.Size(20, 45),//这句表示图片相对于所加的点的位置mapStart
      imageSize: new BMapGL.Size(45, 45)//图标所用的图片的大小，此功能的作用等同于CSS中的background-size属性。可用于实现高清屏的高清效果
      // offset: new BMap.Size(-10, 45), // 指定定位位置
      // imageOffset: new BMap.Size(0, 0 - 10 * 25) // 设置图片偏移
    });
    window.marker = new BMapGL.Marker(point, { icon: myIcon });  // 创建标注
    mapInit.addOverlay(marker);               // 将标注添加到地图中
    //marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
  }
}
//添加行驶和终点图标
export function addMarkerEnd(point, name, mapInit, trackUnit, prePoint) {
  if (name == "小车行驶") {
    if (carMk) {//先判断第一次进来的时候这个值有没有定义，有的话就清除掉上一次的。然后在进行画图标。第一次进来时候没有定义也就不走这块，直接进行画图标
      mapInit.removeOverlay(carMk);
    }
    carMk = new BMapGL.Marker(point, { icon: drivingPoint });  // 创建标注
    carMk.setRotation(trackUnit.route);//trackUnit.route
    //getAngle(point,prePoint);// js求解两点之间的角度
    carMk.setRotation(getAngle(point, prePoint) - 90);// 旋转的角度
    mapInit.addOverlay(carMk);               // 将标注添加到地图中
    //carMk.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
  } else {
    mapInit.removeOverlay(carMk);
    carMk = new BMapGL.Marker(point, { icon: terminalPoint });  // 创建标注
    mapInit.addOverlay(carMk);
  }
}


//获得角度的函数
function getAngle(n, next) {
  var ret
  var w1 = n.lat / 180 * Math.PI
  var j1 = n.lng / 180 * Math.PI

  var w2 = next.lat / 180 * Math.PI
  var j2 = next.lng / 180 * Math.PI

  ret = 4 * Math.pow(Math.sin((w1 - w2) / 2), 2) - Math.pow(Math.sin((j1 - j2) / 2) * (Math.cos(w1) - Math.cos(w2)), 2);
  ret = Math.sqrt(ret);

  // var temp = Math.sin(Math.abs(j1 - j2) / 2) * (Math.cos(w1) + Math.cos(w2));
  var temp = Math.sin((j1 - j2) / 2) * (Math.cos(w1) + Math.cos(w2));
  console.log(temp)
  ret = ret / temp;

  ret = Math.atan(ret) / Math.PI * 180;
  ret += 90;

  // 这里用如此臃肿的if..else是为了判定追踪单个点的具体情况,从而调整ret的值
  if (j1 - j2 < 0) {
    // console.log('j1<j2')
    if (w1 - w2 < 0) {
      // console.log('w1<w2')
      ret;
    } else {
      // console.log('w1>w2')
      ret = -ret + 180;
    }
  } else {
    // console.log('j1>j2')
    if (w1 - w2 < 0) {
      // console.log('w1<w2')
      ret = 180 + ret;
    } else {
      // console.log('w1>w2')
      ret = -ret;
    }
  }
  return ret;
}






