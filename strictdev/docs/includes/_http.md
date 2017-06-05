
# HTTP Request Types

## GET

```ruby
let companyID = 1;
this.madame.authGet('company/'+escape(companyID))
.subscribe(
  response => {
    let resp = response.json();
  },
  error => {
    this._mono.log('Error: ' + error.text());
  }
);
```

Used when the client is requesting a resource on the Web server.

## POST

```ruby
this.madame.authPost('company',
  {
    tag: 'STRICTDEV',
    name: 'Strict Development, Inc.',
    www: 'http://strictdev.com/'
  }
)
.subscribe(
  response => {
    let resp = response.json();
  },
  error => {
   this._mono.log('Error: ' + error.text());
  }
);
```
Used when the client is sending information or data to the server to create a new resource. New resource location is returned in the Location header.


## PUT

```ruby
let companyID = 1;
this.madame.authPut('company/'+escape(companyID),
  {
    tag: 'STRICTD',
    name: 'Strict Development, Inc.',
    www: 'http://strictd.com/'
  }
)
.subscribe(
  response => {
    let resp = response.json();
  },
  error => {
    this._mono.log('Error: ' + error.text());
  }
);
```

Used when the client is sending a replacement document to the web server under the request URL.

## DELETE

```ruby
let companyID = 1;
this.madame.authDelete('company/'+escape(companyID), {})
  .subscribe(
    response => {
      let resp = response.json();
    },
    error => {
      this._mono.log('Error: ' + error.text());
    }
  );
```

Used when the client is trying to delete a document from the Web server, identified by the request URL.

## HEAD

Used when the client is requesting some information about a resource but not requesting the resource itself.

## OPTIONS

Used when the client wants to determine other available methods to retrieve or process a document on the Web server.

## TRACE

Used when the client is asking the available proxies or intermediate servers changing the request to announce themselves.

## CONNECT

Used when the client wants to establish a transparent connection to a remote host, usually to facilitate SSL-encrypted communication (HTTPS) through an HTTP proxy.

# HTTP Responses

## 2XX Successful

Response | Meaning
---------- | -------
200 | **OK** <br />Standard response for successful HTTP requests. The actual response will depend on the request method used.<br /><br />In a **GET** request, the response will contain an entity corresponding to the requested resource.
201 | **Created** <br />The request has been fulfilled, resulting in the creation of a new resource. <br /><br />In a **POST** request, the created resource location is returned in the Location response header.
202 | **Accepted** <br />The request has been accepted for processing, but the processing has not been completed. The request might or might not be eventually acted upon, and may be disallowed when processing occurs.
204 | **No Content** <br />The server successfully processed the request and is not returning any content.

## 3XX Redirection

This class of status code indicates that further action needs to be taken by the user agent in order to fulfill the request. The action required MAY be carried out by the user agent without interaction with the user if and only if the method used in the second request is GET or HEAD. A client SHOULD detect infinite redirection loops, since such loops generate network traffic for each redirection.

Redirect Code | Meaning
---------- | -------
301 | **Moved Permanently** <br />The requested resource has been assigned a new permanent URI and any future references to this resource SHOULD use one of the returned URIs. Clients with link editing capabilities ought to automatically re-link references to the Request-URI to one or more of the new references returned by the server, where possible. This response is cacheable unless indicated otherwise.<br /><br />The new permanent URI SHOULD be given by the Location field in the response. Unless the request method was HEAD, the entity of the response SHOULD contain a short hypertext note with a hyperlink to the new URI(s).<br /><br />If the 301 status code is received in response to a request other than GET or HEAD, the user agent MUST NOT automatically redirect the request unless it can be confirmed by the user, since this might change the conditions under which the request was issued.
302 | **Found** <br />The requested resource resides temporarily under a different URI. Since the redirection might be altered on occasion, the client SHOULD continue to use the Request-URI for future requests. This response is only cacheable if indicated by a Cache-Control or Expires header field.<br /><br />The temporary URI SHOULD be given by the Location field in the response. Unless the request method was HEAD, the entity of the response SHOULD contain a short hypertext note with a hyperlink to the new URI(s).<br /><br />If the 302 status code is received in response to a request other than GET or HEAD, the user agent MUST NOT automatically redirect the request unless it can be confirmed by the user, since this might change the conditions under which the request was issued.
303 | **See Other** <br />The response to the request can be found under a different URI and SHOULD be retrieved using a GET method on that resource. This method exists primarily to allow the output of a POST-activated script to redirect the user agent to a selected resource. The new URI is not a substitute reference for the originally requested resource. The 303 response MUST NOT be cached, but the response to the second (redirected) request might be cacheable.<br /><br />The different URI SHOULD be given by the Location field in the response. Unless the request method was HEAD, the entity of the response SHOULD contain a short hypertext note with a hyperlink to the new URI(s).
304 | **Not Modified** <br />If the client has performed a conditional GET request and access is allowed, but the document has not been modified, the server SHOULD respond with this status code. The 304 response MUST NOT contain a message-body, and thus is always terminated by the first empty line after the header fields.
305 | **Use Proxy** <br />The requested resource MUST be accessed through the proxy given by the Location field. The Location field gives the URI of the proxy. The recipient is expected to repeat this single request via the proxy. 305 responses MUST only be generated by origin servers.
307 | **Temporary Redirect** <br />The requested resource resides temporarily under a different URI. Since the redirection MAY be altered on occasion, the client SHOULD continue to use the Request-URI for future requests. This response is only cacheable if indicated by a Cache-Control or Expires header field.<br /><br />The temporary URI SHOULD be given by the Location field in the response. Unless the request method was HEAD, the entity of the response SHOULD contain a short hypertext note with a hyperlink to the new URI(s) , since many pre-HTTP/1.1 user agents do not understand the 307 status. Therefore, the note SHOULD contain the information necessary for a user to repeat the original request on the new URI.<br /><br />If the 307 status code is received in response to a request other than GET or HEAD, the user agent MUST NOT automatically redirect the request unless it can be confirmed by the user, since this might change the conditions under which the request was issued.

## 4XX Client Error

The 4xx class of status code is intended for cases in which the client seems to have erred. Except when responding to a HEAD request, the server SHOULD include an entity containing an explanation of the error situation, and whether it is a temporary or permanent condition. These status codes are applicable to any request method. User agents SHOULD display any included entity to the user.

Error Code | Meaning
---------- | -------
400 | **Bad Request** <br />The request could not be understood by the server due to malformed syntax. The client SHOULD NOT repeat the request without modifications.
401 | **Unauthorized** <br />Your API key is missing or wrong
403 | **Forbidden** <br />The server understood the request, but is refusing to fulfill it. Authorization will not help and the request SHOULD NOT be repeated. If the request method was not HEAD and the server wishes to make public why the request has not been fulfilled, it SHOULD describe the reason for the refusal in the entity. If the server does not wish to make this information available to the client, the status code 404 (Not Found) can be used instead.
404 | **Not Found** <br />The server has not found anything matching the Request-URI. No indication is given of whether the condition is temporary or permanent. The 410 (Gone) status code SHOULD be used if the server knows, through some internally configurable mechanism, that an old resource is permanently unavailable and has no forwarding address. This status code is commonly used when the server does not wish to reveal exactly why the request has been refused, or when no other response is applicable.
405 | **Method Not Allowed** <br />The method specified in the Request-Line is not allowed for the resource identified by the Request-URI. The response MUST include an Allow header containing a list of valid methods for the requested resource.
406 | **Not Acceptable** <br />The resource identified by the request is only capable of generating response entities which have content characteristics not acceptable according to the accept headers sent in the request.<br /><br />Unless it was a HEAD request, the response SHOULD include an entity containing a list of available entity characteristics and location(s) from which the user or user agent can choose the one most appropriate. The entity format is specified by the media type given in the Content-Type header field. Depending upon the format and the capabilities of the user agent, selection of the most appropriate choice MAY be performed automatically. However, this specification does not define any standard for such automatic selection.
408 | **Request Timeout** <br />The client did not produce a request within the time that the server was prepared to wait. The client MAY repeat the request without modifications at any later time.
409 | **Conflict** <br />The request could not be completed due to a conflict with the current state of the resource. This code is only allowed in situations where it is expected that the user might be able to resolve the conflict and resubmit the request. The response body SHOULD include enough<br /><br />information for the user to recognize the source of the conflict. Ideally, the response entity would include enough information for the user or user agent to fix the problem; however, that might not be possible and is not required.<br /><br />Conflicts are most likely to occur in response to a PUT request. For example, if versioning were being used and the entity being PUT included changes to a resource which conflict with those made by an earlier (third-party) request, the server might use the 409 response to indicate that it can't complete the request. In this case, the response entity would likely contain a list of the differences between the two versions in a format defined by the response Content-Type.
410 | **Gone** <br />The requested resource is no longer available at the server and no forwarding address is known. This condition is expected to be considered permanent. Clients with link editing capabilities SHOULD delete references to the Request-URI after user approval. If the server does not know, or has no facility to determine, whether or not the condition is permanent, the status code 404 (Not Found) SHOULD be used instead. This response is cacheable unless indicated otherwise.<br /><br />The 410 response is primarily intended to assist the task of web maintenance by notifying the recipient that the resource is intentionally unavailable and that the server owners desire that remote links to that resource be removed. Such an event is common for limited-time, promotional services and for resources belonging to individuals no longer working at the server's site. It is not necessary to mark all permanently unavailable resources as "gone" or to keep the mark for any length of time -- that is left to the discretion of the server owner.

## 5XX Server Error

Response status codes beginning with the digit "5" indicate cases in which the server is aware that it has erred or is incapable of performing the request. Except when responding to a HEAD request, the server SHOULD include an entity containing an explanation of the error situation, and whether it is a temporary or permanent condition. User agents SHOULD display any included entity to the user. These response codes are applicable to any request method.

Error Code | Meaning
---------- | -------
500 | Internal Server Error -- We had a problem with our server. Try again later.
503 | Service Unavailable -- We're temporarially offline for maintanance. Please try again later.
