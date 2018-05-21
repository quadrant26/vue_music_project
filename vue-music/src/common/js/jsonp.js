import originJSONP from 'vue-music/src/common/js/jsonp'


export default function jsonp(url, data, option) {

  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

  return new Promise( (resolve, reject) => {
    originJSONP(url,  option, (error,  data) => {
      if(!err){
        resolve(data)
      }else{
        reject(err)
      }
    })
  })
}


function param(data){
  let url = '';
  for (var k in data){
    let value = data[i] !== undefined ? data[k] : '';
    // url += `&${k}=${encodeURIComponent(value)}`
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : '';
}
