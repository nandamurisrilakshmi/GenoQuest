var successURL = 'https://www.facebook.com/connect/login_success.html';
function onFacebookLogin() {
                
                    chrome.tabs.getAllInWindow(null, function(tabs) {
                        for (var i = 0; i < tabs.length; i++) {
                            if (tabs[i].url.indexOf(successURL) == 0) {
                                var params = tabs[i].url.split('#')[1];
				                access = params.split('&')[0]
				                access=access.replace('access_token=','');

                                localStorage.accessToken = access;
                                url="https://graph.facebook.com/me?fields=link,name&access_token="+access;
                                $.ajax({
                                    type: "GET",
                                    url:url,
                                    	 success: function(data) {
                                             //alert(JSON.stringify(data));
                                         },
                                         error: function(e) {
                                             alert('error'+JSON.stringify(e));
                                         }
                                });
                                
                                var redirectUri = "https://fipdibkclnjkolmhgjhkbgohpgimemfn.chromiumapp.org/*";     
                                var rurl;
                                var token;
                                var scope="report:alcohol-drinking-behavior+report:caffeine-consumption+report:caffeine-metabolite-ratio+report:smoking-behavior+report:hippocampal-volume+report:reading-and-spelling-ability+report:word-reading-ability+report:mathematical-ability+report:intelligence+report:hearing-function+report:childhood-intelligence+report:novelty-seeking+report:gambling+report:harm-avoidance+report:reward-dependence+report:anger+report:depression+report:openness+report:conscientiousness+report:extraversion+report:neuroticism+report:agreeableness+report:waist-hip-ratio+report:waist+report:body-fat-percentage+report:lean-body-mass+report:body-fat-mass+report:height+report:male-pattern-baldness-aga+report:longevity+report:black-hair+report:red-hair+report:bmi+report:weight+report:beard-thickness+report:eye-color";
                                 url= "https://genomelink.io/oauth/authorize?response_type=code&client_id=y8FV4odfO1wBYozjpDYAaHRFMKhiOzxLPLzLl5pU&client_secret=Gm5JaGuu0tsgMlG3J3Q47z1EBFzaic7ZS1sD0BNCvlAiK6vzob8APaSQhRqqSe7RIFweu5ty5o5w12P5pOfrcpADtt3fE9w91J4HALHVLcJvR2xk8EcZ6gEaOrABxl98&redirect_uri=https://fipdibkclnjkolmhgjhkbgohpgimemfn.chromiumapp.org/&scope="+scope+"&state=CpeuDR22rThGAoAdgUx5dBRwniV2nL";
                             	   chrome.identity.launchWebAuthFlow(
                                     {
                                         "url" : url,
                                         "interactive" : true
                                     },
                                     function(data){
                                         rurl=data;
                                         token1 ="https://fipdibkclnjkolmhgjhkbgohpgimemfn.chromiumapp.org/?code=";
                                         token2="&state=CpeuDR22rThGAoAdgUx5dBRwniV2nL";
                                        token=rurl.replace(token1,'');
                                        token=token.replace(token2,'');
                                   
                                        
                                        

                                        chrome.runtime.sendMessage({message: "Genomic Link",tok:token}, function(response) {
                                     	   //alert("done");
                                     	 });
                                     });
                                
                                 

chrome.tabs.getSelected(function(tab) {
    chrome.tabs.remove(tab.id, function() { });
});
chrome.tabs.onUpdated.removeListener(onFacebookLogin);
                               // return;
                            }
                        }
                    });
                
            }
            chrome.tabs.onUpdated.addListener(onFacebookLogin);

            
