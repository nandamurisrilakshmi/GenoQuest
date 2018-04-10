chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
	  
      if( request.message==="aws"){

                                AWS.config.region = 'us-east-1';

                                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                                	AccountId: '871742557070',
                                    RoleArn: 'arn:aws:iam::871742557070:role/Genomic_Quest',
                                    IdentityPoolId: 'us-east-1:d63233c9-f1c1-4c3a-82ec-739e342d8469',

                                    Logins: {
                                      'graph.facebook.com': access
                                    }

                                  });
                                AWS.config.credentials.get(function (err) {
                                    if (err) alert("err"+err);
                                    else alert(AWS.config.credentials);
                                });
                                var lambda = new AWS.Lambda({region: 'us-east-1', apiVersion: '2015-03-31'});
                             // create JSON object for parameters for invoking Lambda function
                             var pullParams = {
                               FunctionName : 'genomicQuest',
                               InvocationType : 'RequestResponse',
                               LogType : 'None'
                             };
                             // create variable to hold data returned by the Lambda function
                             var pullResults;
                             lambda.invoke(pullParams, function(error, data) {
                            	 //alert("in lambda")
                            	  if (error) {
                            	    alert(error);
                            	  } else {
                            	    pullResults = JSON.parse(data.Payload);
                            	    //alert(pullResults);
                            	  }
                            	});
                             sendResponse({farewell: "ok"});
});