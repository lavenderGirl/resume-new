import ajax from './http';

let _url = window.location.href;
if(_url.indexOf('xrpt.x2era.com')>=0 || _url.indexOf('xdata.x2era.com')>=0){
    _url = 'https://xapi.x2era.com';
}else if(_url.indexOf('xrpt-test.x2era.com')>=0 || _url.indexOf('xdata-test.x2era.com')>=0){
    _url = 'https://xapi-test.x2era.com';
}else if( _url.indexOf('xrpt-dev.x2era.com')>=0 || _url.indexOf('xdata-dev.x2era.com')>=0){
    _url = 'https://xapi-dev.x2era.com';
}else{
    _url = 'https://xapi-dev.x2era.com';
}
export const urlFix = _url;
//点评信息接口
export const GAME = {
    //初始化
    gameInit(paramsObj){
        return ajax(`${_url}/api/game/init`,paramsObj,'POST')
    }
}