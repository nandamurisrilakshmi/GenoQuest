chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    //tok= "Bearer GENOMELINKTEST005";
      if( request.message==="Gen0mic Link"){

    var list=[["openness","conscientiousness","extraversion","neuroticism","agreeableness"],["waist-hip-ratio","waist","body-fat-percentage","lean-body-mass","body-fat-mass","height","male-pattern-baldness-aga","longevity","black-hair","red-hair","bmi","weight","beard-thickness","eye-color"],["hippocampal-volume","reading-and-spelling-ability","word-reading-ability","mathematical-ability","intelligence","hearing-function","childhood-intelligence"],["alcohol-drinking-behavior","caffeine-consumption","smoking-behavior","gambling"]];
    var x = new Array(4);
        for (var k = 0; k < 4; k++) {
      x[k] = new Array(15);
    }
    for(i=0;i<4;i++)
    	{
    	 	for(j=0;j<list[i].length;j++)
    		{
    	 	url="https://genomelink.io/v1/reports/"+list[i][j]+"?population=european";
            $.ajax({
                type: "GET",
                headers: { 
                    "Authorization" : tok,
                },
                url:url,
                crossDomain: true,
                 success: function(data) {
                         x[i][j]=(JSON.stringify(data.summary.score));
                     },
                     error: function(e) {
                         alert('error'+JSON.stringify(e));
                     },
                     async:false
});
    		}
    	    x[i] = x[i].filter(function(n){ return n != undefined }); 

    	 	//alert(x[i]);
    	}

            sendResponse({farewell: "ok"});

  });