const _ = require('lodash');

let UtilsChecking = {
    IsEmpty: function(variable){
        
        if(_.isUndefined(variable))
            return true;
            
        if(_.isNull(variable))
            return true;
            
        if(_.isString(variable) && _.isEmpty(variable))
            return true;
        
        if(variable.length == 0)
            return true;
            
        return false;
        
    }
}

module["exports"] = UtilsChecking;