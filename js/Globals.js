//var hostURL = "http://152.144.161.210:8080";
//var hostURL = "http://uksearchdev:8080";
//var hostURL = "http://g1cg1d:8080";
var hostURL = "http://localhost:8080";

var baseServiceURL = "/viewpoint-services/v1";
var serviceURL = hostURL + baseServiceURL;

var viewpointAssetBasePath = "/viewpoint-services/v1/assets";
var viewpointSSBasePath = "/viewpoint-services/v1/savedsearches";
var viewpointWFBasePath = "/viewpoint-services/v1/resolution";
var viewpointWFRuleBasePath = "/viewpoint-services/v1/resolution/rule";

var viewpointSearchURL = hostURL + viewpointAssetBasePath;
var viewpointSaveSearchURL = hostURL + viewpointSSBasePath;

var viewpointWorkflowURL = hostURL + viewpointWFBasePath;
var viewpointWorkflowRuleURL = hostURL + viewpointWFRuleBasePath;

var incIndent = "&indent=true";
var solrWriter = "&wt=json"
var solrFieldList = "&fl=name,index_id";
var solrParams = incIndent + solrWriter + solrFieldList
var solrSearchField = "collector:"
var range = "?page=1&size=10";
var pageSize = 10;
var createThePagination = true;
var order = "&order=name_string:desc";
var SavedSearchRange = "?page=1&size=10";
var SavedSearchOrder = "&order=name:desc";
var SearchSavedSearchCase = "&case=sensitive"   // sensitive        insensitive
