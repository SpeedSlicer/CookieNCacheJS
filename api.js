// Cookie management functions
var cookie = {
    // Function to set a cookie
    set: function(name, value, daysToLive) {
        var cookie = name + "=" + encodeURIComponent(value);

        if (typeof daysToLive === "number") {
            cookie += "; max-age=" + (daysToLive * 24 * 60 * 60);
        }

        document.cookie = cookie;
    },

    // Function to get a cookie value
    get: function(name) {
        var cookies = document.cookie.split(";").map(function(cookie) {
            return cookie.trim();
        });

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var separatorIndex = cookie.indexOf("=");
            var cookieName = cookie.slice(0, separatorIndex);

            if (cookieName === name) {
                return decodeURIComponent(cookie.slice(separatorIndex + 1));
            }
        }

        return null;
    },

    // Function to delete a cookie
    delete: function(name) {
        document.cookie = name + "=; max-age=0";
    },

    // Function to check if a cookie exists
    exists: function(name) {
        var cookies = document.cookie.split(";").map(function(cookie) {
            return cookie.trim();
        });

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var separatorIndex = cookie.indexOf("=");
            var cookieName = cookie.slice(0, separatorIndex).trim();

            if (cookieName === name) {
                return true;
            }
        }

        return false;
    }
};

// Session storage (cache) functions
var cache = {
    // Function to set an item in session storage
    set: function(key, value) {
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error("Error setting cache item:", e);
        }
    },

    // Function to get an item from session storage
    get: function(key) {
        try {
            var item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error("Error getting cache item:", e);
            return null;
        }
    },

    // Function to delete an item from session storage
    delete: function(key) {
        try {
            sessionStorage.removeItem(key);
        } catch (e) {
            console.error("Error deleting cache item:", e);
        }
    },

    // Function to clear all items from session storage
    clear: function() {
        try {
            sessionStorage.clear();
        } catch (e) {
            console.error("Error clearing cache:", e);
        }
    }
};
