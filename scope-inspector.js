var scopeInspectorGetScope = function scopeInspectorGetScopeFunction() {
	var scope,
      isolatedScope,
      element,
		  copy = { __proto__: null },
  		hasAngular = 'undefined' !== typeof window.angular ? true : false;  		

  function makeCopy(scope, full){
      var copy = { __proto__: null },
          properties, i;

      properties = Object.getOwnPropertyNames(scope);  
      for (i = 0; i < properties.length; ++i){
        if(full || (properties[i] !== 'this' && properties[i][0] !== '$')){
          copy[properties[i]] = scope[properties[i]];
        }        
      }
      return copy;
  }

	if(hasAngular){
    element = angular.element($0);
		scope = element.scope();
    isolatedScope = element.isolateScope();	
    if(scope){
       copy.isIsolatedScope = isolatedScope ? true : false,
       copy.isInherited = element.hasClass('ng-scope') ? false : true,
       copy.customProperties = makeCopy(scope, false);
       copy.fullScope = makeCopy(scope, true);
       copy.controller = element.controller()['__proto__'];
    }	
		
	}

  return copy;
}

chrome.devtools.panels.elements.createSidebarPane(
    "Scope Inspector",
    function scopeInspectorCreateSidebar(sidebar) {
  function updateElementProperties() {
    sidebar.setExpression("(" + scopeInspectorGetScope.toString() + ")()");
  }
  updateElementProperties();
  chrome.devtools.panels.elements.onSelectionChanged.addListener(
      updateElementProperties);
});
