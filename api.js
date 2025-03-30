var cookie = {
    set: function(name, value, daysToLive) {
        var cookie = name + "=" + encodeURIComponent(value);

        if (typeof daysToLive === "number") {
            cookie += "; max-age=" + (daysToLive * 24 * 60 * 60);
        }

        document.cookie = cookie;
    },

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

    delete: function(name) {
        document.cookie = name + "=; max-age=0";
    },

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

var cache = {
    set: function(key, value) {
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error("Error setting cache item:", e);
        }
    },

    get: function(key) {
        try {
            var item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error("Error getting cache item:", e);
            return null;
        }
    },

    delete: function(key) {
        try {
            sessionStorage.removeItem(key);
        } catch (e) {
            console.error("Error deleting cache item:", e);
        }
    },

    clear: function() {
        try {
            sessionStorage.clear();
        } catch (e) {
            console.error("Error clearing cache:", e);
        }
    }
};
