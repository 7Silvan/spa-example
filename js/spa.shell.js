/**
 * Created by silvan on 4/16/14.
 * spa.shell.js
 * Root namespace module
 */

/*jslint    browser : true, continue:true, devel: true, indent : 2
 maxerr:50, newcap: true, nomen : true, plusplus: true, regexp:true,
 sloppy:true, vars: false, white: true
 */
/* global $, spa */

spa.shell = (function () {
    // begin module scope variables
    var
        configMap = {
            main_html: String()
                +'<div class="spa-shell-head">'
                + '<div class="spa-shell-head-logo"></div>'
                + '<div class="spa-shell-head-acct"></div>'
                + '<div class="spa-shell-head-search"></div>'
                + '</div>'
                + '<div class="spa-shell-main">'
                + '<div class="spa-shell-main-nav"></div>'
                + '<div class="spa-shell-main-content"></div>'
                + '</div>'
                + '<div class="spa-shell-foot"></div>'
                + '<div class="spa-shell-chat"></div>'
                + '<div class="spa-shell-modal"></div>'
        },
        stateMap = {$container : null},
        jqueryMap = {},
        setJqueryMap, initModule;
    // end module scope variables
    // begin utility methods
    // end utility methods
    // begin dom methods
    // Begin DOM method /setJqueryMap/
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = { $container : $container };
    };
    // End DOM method /setJqueryMap/
    // end dom methods

    // begin event handlers
    // end event handlers

    // begin public methods
    // begin public method /initModule/
    initModule = function ($container) {
        stateMap.$container = $container;
        $container.html(configMap.main_html);
        setJqueryMap();
    };
    // end public method /initModule/

    return {initModule: initModule};
}());