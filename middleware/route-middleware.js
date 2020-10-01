function getCookie(cname, cookies) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(cookies);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

const handler = (req, res, next) => {
    // const userCookie = getCookie('USER_INFO', req.headers.cookie)
    // console.log(res)
    // if(req.url === '/login' && userCookie){
    //     // res.redirect('/')
    //     res.writeHead(200, { Location: '/'})
    // }
    // if(!userCookie){
    //     res.redirect('/')
    // }
    next()
  }
  
export default handler