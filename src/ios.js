let ios = {};
// let is_http = window.location.href.split('/')[0]=='http:';
let is_http = true;

if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)&&is_http) {
/*这段代码是固定的，必须要放到js中*/
function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        return callback(WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}
/*与OC交互的所有JS方法都要放在此处注册，才能调用通过JS调用OC或者让OC调用这里的JS*/
setupWebViewJavascriptBridge(function(bridge) {            
                            
    // var uniqueId = 1;
    // function log(message, data) {
    //     var log = document.getElementById('log')
    //     var el = document.createElement('div')
    //     el.className = 'logLine'
    //     el.innerHTML = uniqueId++ + '. ' + message + ':<br/>' + JSON.stringify(data)
    //     if (log.children.length) {
    //         log.insertBefore(el, log.children[0])
    //     } else {
    //     log.appendChild(el)
    //     }
    // };
    bridge.registerHandler('goToBack', function() {
        // log("点击了 <打开博文>按钮 goToBack was called with by ObjC")
    });
    bridge.registerHandler('goToShare', function() {
        // log("点击了 <打开博文>按钮 goToBack was called with by ObjC")
    });
    bridge.registerHandler('goToPubulish', function() {
        // log("点击了 <打开博文>按钮 goToBack was called with by ObjC")
    });
    bridge.registerHandler('goToFinishInfo', function() {
        // log("点击了 <打开博文>按钮 goToBack was called with by ObjC")
    });
    bridge.registerHandler('intentNative', function() {
        // log("点击了 <打开博文>按钮 goToBack was called with by ObjC")
    });
    bridge.registerHandler('startListByTag', function() {
        // log("点击了 <打开博文>按钮 goToBack was called with by ObjC")
    });
    bridge.registerHandler('postSchoolInfo', function() {
        // log("点击了 <打开博文>按钮 goToBack was called with by ObjC")
    });
    bridge.registerHandler('startSchoolMapNative', function() {
        // log("点击了 <打开博文>按钮 goToBack was called with by ObjC")
    });
    bridge.registerHandler('goToLogin', function() {
        // log("点击了 <打开博文>按钮 goToBack was called with by ObjC")
    });
    bridge.registerHandler('startPersonPage', function() {
        // log("点击了 <打开博文>按钮 goToBack was called with by ObjC")
    });
    bridge.registerHandler('doShareUrl', function() {
        // log("点击了 <打开博文>按钮 goToBack was called with by ObjC")
    });
    bridge.registerHandler('startPayTool', function() {
        // log("点击了 <打开博文>按钮 goToBack was called with by ObjC")
    });
    bridge.registerHandler('startPayToolByOrder', function() {
        // log("点击了 <打开博文>按钮 goToBack was called with by ObjC")
    });
    bridge.registerHandler('goToParentsDetail', function() {
        // log("点击了 <打开博文>按钮 goToBack was called with by ObjC")
    });
    bridge.registerHandler('openUrlWithSafari', function() {
        // log("点击了 <打开博文>按钮 goToBack was called with by ObjC")
    });
    bridge.registerHandler('callWithPhoneNumber', function() {
        // log("点击了 <打开博文>按钮 goToBack was called with by ObjC")
    });
    bridge.registerHandler('getNavInfo', function() {
        // log("点击了 <打开博文>按钮 goToBack was called with by ObjC")
       
    });


    bridge.registerHandler('getUserInfos', function(data, responseCallback){
        ios.user_info = data
        responseCallback(data)
    });
    // bridge.callHandler('getUserInfos', function(responseData) {
    //     ios.user_info = responseData;
    //     // log("这是在H5中的getUserIdFromObjC方法对应的参数responseData的值", responseData)
    //   })
    ios.goToBack = function (message) {
        // log('js call objc: getBlogNameFromObjC')                          
        //{'blogURL': 'http://www.henishuo.com'} 这是json字符串,传到iOS端会被WebViewJavascriptBridge自动转换成id对象，然后在回调处看到的就是字典对象了。
        bridge.callHandler('goToBack', {'message': message}, function() {
        // log('JS got response', response)
        })
    };
    ios.getUserInfos = function() {
        bridge.callHandler('getUserInfos',{'blogURL': ''},function() {
            
        })    
    };
    ios.goToShare = function() {
        bridge.callHandler('goToShare', {'blogURL': ''}, function() {

        })
    }
    ios.goToPubulish = function(id,typeId,name) {
        bridge.callHandler('goToPubulish', {'id': id,'typeId':typeId,'name':name}, function() {

        })
    }
    ios.goToFinishInfo = function() {
        bridge.callHandler('goToFinishInfo', {'blogURL': ''}, function() {

        })
    }
    ios.intentNative = function(taskname) {
        bridge.callHandler('intentNative', {'taskname': taskname}, function() {

        })
    }
    ios.startListByTag = function(tagCode,periodCode) {
        bridge.callHandler('startListByTag', {'tagCode': tagCode,'periodCode': periodCode}, function() {

        })
    }
    ios.postSchoolInfo = function(name,logo,type,id) {
        bridge.callHandler('postSchoolInfo', {'name': name,'logo': logo,'type':type,'id':id}, function() {

        })
    }

    ios.startSchoolMapNative = function(schoolName,fid,objectCode,log,lat) {
        bridge.callHandler('startSchoolMapNative', {'schoolName': schoolName,'fid': fid,'objectCode':objectCode,'log':log,'lat':lat}, function() {

        })
    }
    // ios.goToPubulish = function(schoolName,fid,objectCode,log,lat) {
    //     bridge.callHandler('goToPubulish', {'schoolName': schoolName,'fid': fid,'objectCode':objectCode,'log':log,'lat':lat}, function() {

    //     })
    // }
    ios.goToLogin = function() {
        bridge.callHandler('goToLogin', {'blogURL': ''}, function() {

        })
    }
    ios.startPersonPage = function(mobile,creatorUserId) {
        bridge.callHandler('startPersonPage', {'mobile': mobile,'creatorUserId':creatorUserId}, function() {

        })
    }
    ios.doShareUrl = function(url,logo,title,name,id,type_id) {
        bridge.callHandler('doShareUrl', {'url': url,'logo':logo,'title':title,'name':name,'id':id,'type_id':type_id}, function() {

        })
    }
    ios.startPayTool = function(mobile,courierId,goodsId,payType) {
        bridge.callHandler('startPayTool', {'mobile': mobile,'courierId':courierId,'goodsId':goodsId,'payType':payType}, function() {

        })
    }
    ios.startPayToolByOrder = function(orderNum,payType) {
        bridge.callHandler('startPayToolByOrder', {'orderNum':orderNum,'payType':payType}, function() {

        })
    }
    ios.goToParentsDetail = function(id) {
        bridge.callHandler('goToParentsDetail', {'ID':id}, function() {

        })
    }
    ios.openUrlWithSafari = function(url) {
        bridge.callHandler('openUrlWithSafari', {'url':url}, function() {

        })
    }
    ios.callWithPhoneNumber = function(number) {
        bridge.callHandler('callWithPhoneNumber', {'number':number}, function() {

        })
    }
    ios.getNavInfo = function(isShow,title,isShowRight,rightTitle,rightColor,rightImage,action) {
        bridge.callHandler('getNavInfo', {'isShow':isShow,'title': title,'isShowRight': isShowRight,'rightTitle':rightTitle,'rightColor':rightColor,'rightImage':rightImage,'action':action}, function() {

        })
    }


})
}
export default ios;