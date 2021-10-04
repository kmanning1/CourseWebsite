var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    path = require('path');

    function serveStaticFile(res, path, contentType, responseCode){
      if(!responseCode) responseCode = 200;
        console.log(" dirname + path writing res: "+path);
        fs.readFile(path, function(err, data){
            if(err){
              res.writeHead(500, { 'Content-Type': 'text/plain' } );
              res.end('500 - Internal Error');
            }else {
              res.writeHead(responseCode, { 'Content-Type': contentType } );
              res.end(data);
            }
        });
      }

     http.createServer(function(req,res){

     var map = {
       '.ico': 'image/x-icon',
       '.': 'text/html',
       '.html': 'text/html',
       '.htm': 'text.html',
       '.js': 'text/javascript',
       '.json': 'application/json',
       '.css': 'text/css',
       '.jpg': 'image/jpeg',
       '.png': 'image/png'
     };
    var thisUrl = url.parse(req.url,true,true);
    var thisFile = path.basename(thisUrl.pathname);
    var ext = path.extname(thisFile);

    var queryData = url.parse(req.url, true).query;
    console.log("*******************"+ queryData.clist);
    if(queryData.fname != undefined )
      {
        console.log("Request Method is: "+req.method)
        console.log("The form data: "+queryData.fname+" "+queryData.lname);
        console.log("Object query : "+ thisUrl.query.fname+" "+thisUrl.query.lname);
      } else if (queryData.option != undefined)
        {
          console.log(" ********The option is: "+queryData.clist);

        }



    if ( map[ext] == undefined )
     {
       thisFile = 'home.html';
       ext = '.html';
     }

    console.log( " thisUrl path is: %s", thisUrl.pathname);
    console.log( " thisFile is: %s", thisFile);
    console.log( " thisExt is: %s", ext);

    var mimeType = map[ext];
    console.log(" Mime type is: "+mimeType);

      switch(mimeType){
        case 'text/html':

          serveStaticFile(res, __dirname +"/public/"+thisFile, mimeType);
        break;
        case 'image/jpeg':
        case 'image/png':
        //all image files are in path public/image/thisFile
          console.log(__dirname + "/public/image" + thisFile);
          serveStaticFile(res, __dirname +"/public/image/"+thisFile, mimeType);
        break;
        case 'text/css':
        
          serveStaticFile(res, __dirname +"/public/css/"+thisFile, mimeType);
          break;
        default:

          console.log("default: "+__dirname+path+thisfile+"  "+mimeType);
          serveStaticFile(res, 'public/404.html', 'text/html', 404);
          break;
      }



     }).listen(3000);
console.log('Server started on localhost:3000; press Ctrl-C to terminate...');
