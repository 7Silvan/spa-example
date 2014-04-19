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
            main_html           : String()
                + '<div class="spa-shell-head">'
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
                + '<div class="spa-shell-modal"></div>',
            chat_extend_time    : 250,
            chat_retract_time   : 300,
            chat_extend_height  : 450,
            chat_retract_height : 15,
            chat_extend_title   : 'Click to retract',
            chat_retracted_title: 'Click to extend'
        },
        stateMap = {
            $container      : null,
            is_chat_retracted: true
        },
        jqueryMap = {},
        setJqueryMap, toggleChat, onClickChat, initModule;
    // end module scope variables
    // begin utility methods
    // end utility methods
    // begin dom methods
    // Begin DOM method /setJqueryMap/
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container: $container,
            $chat     : $container.find('.spa-shell-chat')
        };
    };
    // End DOM method /setJqueryMap/
    // end dom methods

    // begin dom method /toggleChat/
    // Purpose : Extends or retracts chat slider
    // Arguments :
    // * do_extend - if true, extends slider; if false retracts
    // * callback - optional function to execute at end of animation
    // Settings :
    // * chat_extend_time, chat_retract_time
    // * chat_extend_height, chat_retract_height
    // State : sets stateMap.is_chat_retracted
    // * true - slider is retracted
    // * false - slider is extended
    // Returns : boolean
    // * true - slider animation activated
    // * false - slider animation not activated
    toggleChat = function (do_extend, callback) {
        console.log('toggled chat with "do_extend" = ' + do_extend);
        var
            px_chat_ht = jqueryMap.$chat.height(),
            is_open = px_chat_ht === configMap.chat_extend_height,
            is_closed = px_chat_ht === configMap.chat_retract_height,
            is_sliding = !is_open && !is_closed;

        //avoid race condition
        if (is_sliding) {
            return false;
        }

        // Begin extend chat slider
        if (do_extend) {
            jqueryMap.$chat.animate(
                {
                    height: configMap.chat_extend_height
                },
                configMap.chat_extend_time,
                function () {
                    jqueryMap.$chat.attr(
                        'title', configMap.chat_extend_title
                    );
                    stateMap.is_chat_retracted = false;
                    if (callback) {
                        callback(jqueryMap.$chat);
                    }
                }
            )
            return true;
        }
        // end extend chat slider

        // begin retract chat slider
        jqueryMap.$chat.animate(
            {
                height: configMap.chat_retract_height
            },
            configMap.chat_retract_time,
            function () {
                jqueryMap.$chat.attr(
                    'title', configMap.chat_retracted_title
                );
                stateMap.is_chat_retracted = true;
                if (callback) {
                    callback(jqueryMap.$chat);
                }
            }
        );
        return true;
        // end retract chat slider
    };
    // end dom method /toggleChat/

    // begin event handlers
    onClickChat = function (event) {

        if (toggleChat (stateMap.is_chat_retracted)) {
            $.uriAnchor.setAnchor({
                chat: (stateMap.is_chat_retracted ? 'open' : 'closed')
            });
        }

        return false;
    };
    // end event handlers

    // begin public methods
    // begin public method /initModule/
    initModule = function ($container) {
        // load HTML and map jQuery collections
        stateMap.$container = $container;
        $container.html(configMap.main_html);
        setJqueryMap();

        // initialize chat slider and bind click handler
        stateMap.is_chat_retracted = true;
        jqueryMap.$chat
            .attr('title', configMap.chat_retracted_title)
            .click(onClickChat);
    };
    // end public method /initModule/

    return {initModule: initModule};
}());