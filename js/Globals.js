//var baseURL = "http://152.144.161.210:8080";
//var baseURL = "http://uksearchdev:8080";
//var baseURL = "http://g1cg1d:8080";
var baseURL = "http://localhost:8080";
var viewpointAssetBasePath = "/viewpoint-services/v1/assets";
var viewpointSSBasePath = "/viewpoint-services/v1/savedsearches";
var viewpointSearchURL = baseURL + viewpointAssetBasePath;
var viewpointSaveSearchURL = baseURL + viewpointSSBasePath;
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
