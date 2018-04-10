//chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
var accesstoken;
var redirectUri = "https://nfdhjoddaebmgpbhjmjjmihpmlhhljgo.chromiumapp.org/*";     
        if( request.message==="family search"){
            chrome.identity.launchWebAuthFlow(
                {
                    "url" : "https://integration.familysearch.org/cis-web/oauth2/v3/authorization?response_type=code&client_id=a02j000000KT80SAAT&redirect_uri=https://nfdhjoddaebmgpbhjmjjmihpmlhhljgo.chromiumapp.org/*",

                "interactive" : true
                },
                function(redirect_url){
var l=redirectUri.length;
var code = redirect_url.substr(l+6);
var url="https://integration.familysearch.org/cis-web/oauth2/v3/token?code="+code+"&grant_type=authorization_code&redirect_uri=https://nfdhjoddaebmgpbhjmjjmihpmlhhljgo.chromiumapp.org/*&client_id=a02j000000KT80SAAT";

//alert(code+"    "+url);

$.ajax({
  type: "POST",
  url: url,
  data: "",
  success: function(response){alert(response.access_token);
accesstoken=response.access_token;
localStorage.fsaccesstoken=accesstoken;
$.getJSON('person.json', function (d) {
//alert(JSON.stringify(d));
$.ajax({
    type: "POST",
headers: { 
    "Authorization" : accesstoken,
    "Content-Type":"application/x-fs-v1+json"
},
    data: d,
    dataType: 'json',
    url: "https://familysearch.org/platform/tree/persons",
        success: function(data) {
            //alert('OK');
            //alert(data);
        },
        error: function(e) {
            alert('error'+JSON.stringify(e));
        },
});

    });

},
  error:function(f){alert(f);},
  dataType: 'json'
});
                }
            );
        }
    }
//);
