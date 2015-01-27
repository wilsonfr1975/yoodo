storageEngine = function() {
  var initialized = false;
  var initializedObjectStores = {};

  return {
    init : function(successCallback, errorCallback) {
      if (window.localStorage) {
        initialized = true;
        successCallback(null);
      } else {
        errorCallback('storage_api_not_supported', 'The web storage api is not supported');
      }
    },

    initObjectStore : function(type, successCallback, errorCallback) {
      if (!initialized) {
        errorCallback('storage_api_not_initialized', 'The storage engine has not been initialized');
      } else if (!localStorage.getItem(type)) {
        localStorage.setItem(type, JSON.stringify({}));
      }

      initializedObjectStores[type] = true;
      successCallback(null);
    },

    save : function(type, obj, successCallback, errorCallback) {
    },

    findAll : function(type, successCallback, errorCallback) {
    },

    delete : function(type, id, successCallback, errorCallback) {
    },

    findByProperty : function(type, propertyName, propertyValue, successCallback, errorCallback) {
    },

    findById : function(type, id, successCallback, errorCallback) {
    }
  }
}();
